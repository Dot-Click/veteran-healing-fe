import { createContext, useCallback, useEffect, useMemo, useReducer, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { CartItem, Product, ProductVariant } from "../types/product.types";
import api from "../services/api";
import { useAuth } from "./AuthContext";

interface CartState {
  items: CartItem[];
  donationAmount: number;
  donationMessage: string;
  couponCode: string;
  couponDiscount: number;
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product; variant?: ProductVariant }
  | { type: "REMOVE_ITEM"; productId: string; variantId?: string }
  | { type: "UPDATE_QUANTITY"; productId: string; variantId: string | undefined; quantity: number }
  | { type: "SET_DONATION"; amount: number }
  | { type: "SET_DONATION_MESSAGE"; message: string }
  | { type: "APPLY_COUPON"; code: string; discount: number }
  | { type: "REMOVE_COUPON" }
  | { type: "CLEAR_CART" }
  | { type: "RESTORE"; state: CartState };

interface CartContextValue extends CartState {
  addItem: (product: Product, variant?: ProductVariant) => boolean;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;
  setDonation: (amount: number) => boolean;
  setDonationMessage: (message: string) => boolean;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  clearCart: () => void;
  subtotal: number;
  total: number;
  totalItems: number;
}

export const CartContext = createContext<CartContextValue | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const key = (p: CartItem) =>
        p.product.id === action.product.id &&
        p.selectedVariant?.id === action.variant?.id;
      const existing = state.items.find(key);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            key(item) ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          { product: action.product, quantity: 1, selectedVariant: action.variant },
        ],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (i) =>
            !(i.product.id === action.productId && i.selectedVariant?.id === action.variantId)
        ),
      };
    case "UPDATE_QUANTITY":
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (i) =>
              !(i.product.id === action.productId && i.selectedVariant?.id === action.variantId)
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.productId && item.selectedVariant?.id === action.variantId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    case "SET_DONATION":
      return { ...state, donationAmount: action.amount };
    case "SET_DONATION_MESSAGE":
      return { ...state, donationMessage: action.message };
    case "APPLY_COUPON":
      return { ...state, couponCode: action.code, couponDiscount: action.discount };
    case "REMOVE_COUPON":
      return { ...state, couponCode: "", couponDiscount: 0 };
    case "CLEAR_CART":
      return { items: [], donationAmount: 0, donationMessage: "", couponCode: "", couponDiscount: 0 };
    case "RESTORE":
      return action.state;
    default:
      return state;
  }
}

const INITIAL_STATE: CartState = {
  items: [],
  donationAmount: 0,
  donationMessage: "",
  couponCode: "",
  couponDiscount: 0,
};

const LEGACY_STORAGE_KEY = "veteran-healing-cart";

function getCartStorageKey(userId: string) {
  return `veteran-healing-cart-${userId}`;
}

function readCartFromStorage(key: string): CartState | null {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    if (!parsed.items || !Array.isArray(parsed.items)) return null;
    return {
      items: parsed.items || [],
      donationAmount: parsed.donationAmount || 0,
      donationMessage: parsed.donationMessage || "",
      couponCode: parsed.couponCode || "",
      couponDiscount: parsed.couponDiscount || 0,
    };
  } catch {
    return null;
  }
}

function applyBackendCart(dispatch: React.Dispatch<CartAction>, backendCart: {
  items?: Array<{
    product?: Product;
    quantity?: number;
    selectedVariant?: ProductVariant;
  }>;
  donationAmount?: number;
  donationMessage?: string;
}) {
  const hasItems = (backendCart.items?.length ?? 0) > 0;
  const hasDonation = (backendCart.donationAmount ?? 0) > 0;

  if (!hasItems && !hasDonation) {
    dispatch({ type: "CLEAR_CART" });
    return;
  }

  const restoredItems = (backendCart.items || []).map((item) => ({
    product: item.product ?? ({ slug: "", name: "", price: 0, images: [] } as unknown as Product),
    quantity: item.quantity || 1,
    selectedVariant: item.selectedVariant,
  }));

  const nextState: CartState = {
    items: restoredItems,
    donationAmount: backendCart.donationAmount ? backendCart.donationAmount / 100 : 0,
    donationMessage: backendCart.donationMessage || "",
    couponCode: "",
    couponDiscount: 0,
  };

  dispatch({ type: "RESTORE", state: nextState });
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const [isCartReady, setIsCartReady] = useState(false);

  const requireAuth = useCallback(
    (message = "Please sign in to use your cart.") => {
      if (isAuthenticated && user?.id) return true;
      toast.error(message);
      navigate("/auth", {
        state: { from: `${location.pathname}${location.search}` },
      });
      return false;
    },
    [isAuthenticated, user?.id, navigate, location.pathname, location.search]
  );

  // Clear guest/shared cart state when signed out
  useEffect(() => {
    if (isAuthenticated && user?.id) return;

    dispatch({ type: "CLEAR_CART" });
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  }, [isAuthenticated, user?.id]);

  // Load the signed-in user's cart from the backend (per userId)
  useEffect(() => {
    if (!isAuthenticated || !user?.id) {
      setIsCartReady(false);
      return;
    }

    let cancelled = false;
    setIsCartReady(false);

    const loadCartForUser = async () => {
      try {
        const response = await api.get("/cart");
        if (cancelled) return;
        applyBackendCart(dispatch, response.data);
      } catch (err) {
        console.debug("Failed to load cart from backend:", err);
        if (cancelled) return;

        const cached = readCartFromStorage(getCartStorageKey(user.id));
        if (cached) {
          dispatch({ type: "RESTORE", state: cached });
        } else {
          dispatch({ type: "CLEAR_CART" });
        }
      } finally {
        if (!cancelled) setIsCartReady(true);
      }
    };

    loadCartForUser();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, user?.id]);

  // Persist cart for the current user only
  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;

    try {
      localStorage.setItem(getCartStorageKey(user.id), JSON.stringify(state));
    } catch (err) {
      console.debug("Failed to save cart to localStorage:", err);
    }
  }, [state, isAuthenticated, user?.id]);

  // Sync cart to backend for the current user only (after initial load)
  useEffect(() => {
    if (!isAuthenticated || !user?.id || !isCartReady) return;

    const persistCart = async () => {
      try {
        const backendItems = state.items.map((item: CartItem) => ({
          productSlug: item.product.slug,
          variantId: item.selectedVariant?.id,
          quantity: item.quantity,
          priceAtAdd: Math.round(item.product.price * 100),
        }));

        await api.put("/cart", {
          items: backendItems,
          donationAmount: Math.round(state.donationAmount * 100),
          donationMessage: state.donationMessage,
        });
      } catch (err) {
        console.debug("Cart sync failed:", err);
      }
    };

    persistCart();
  }, [state.items, state.donationAmount, state.donationMessage, isAuthenticated, user?.id, isCartReady]);

  const addItem = useCallback(
    (product: Product, variant?: ProductVariant) => {
      if (!requireAuth()) return false;
      dispatch({ type: "ADD_ITEM", product, variant });
      return true;
    },
    [requireAuth]
  );

  const removeItem = useCallback(
    (productId: string, variantId?: string) => {
      if (!isAuthenticated) return;
      dispatch({ type: "REMOVE_ITEM", productId, variantId });
    },
    [isAuthenticated]
  );

  const updateQuantity = useCallback(
    (productId: string, variantId: string | undefined, quantity: number) => {
      if (!isAuthenticated) return;
      dispatch({ type: "UPDATE_QUANTITY", productId, variantId, quantity });
    },
    [isAuthenticated]
  );

  const setDonation = useCallback(
    (amount: number) => {
      if (!requireAuth("Please sign in to add a donation to your cart.")) return false;
      dispatch({ type: "SET_DONATION", amount });
      return true;
    },
    [requireAuth]
  );

  const setDonationMessage = useCallback(
    (message: string) => {
      if (!requireAuth("Please sign in to add a donation to your cart.")) return false;
      dispatch({ type: "SET_DONATION_MESSAGE", message });
      return true;
    },
    [requireAuth]
  );

  const applyCoupon = useCallback(
    (code: string, discount: number) => {
      if (!isAuthenticated) return;
      dispatch({ type: "APPLY_COUPON", code, discount });
    },
    [isAuthenticated]
  );

  const removeCoupon = useCallback(() => {
    if (!isAuthenticated) return;
    dispatch({ type: "REMOVE_COUPON" });
  }, [isAuthenticated]);

  const clearCart = useCallback(() => {
    if (!isAuthenticated) return;
    dispatch({ type: "CLEAR_CART" });
  }, [isAuthenticated]);

  const subtotal = useMemo(
    () => state.items.reduce((sum: number, item: CartItem) => sum + item.product.price * item.quantity, 0),
    [state.items]
  );

  const total = useMemo(
    () => subtotal + state.donationAmount - state.couponDiscount,
    [subtotal, state.donationAmount, state.couponDiscount]
  );

  const totalItems = useMemo(() => {
    if (!isAuthenticated) return 0;

    const itemsCount = state.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
    const donationCount = state.donationAmount > 0 ? 1 : 0;
    return itemsCount + donationCount;
  }, [state.items, state.donationAmount, isAuthenticated]);

  const value = useMemo<CartContextValue>(
    () => ({
      ...state,
      addItem,
      removeItem,
      updateQuantity,
      setDonation,
      setDonationMessage,
      applyCoupon,
      removeCoupon,
      clearCart,
      subtotal,
      total,
      totalItems,
    }),
    [
      state,
      addItem,
      removeItem,
      updateQuantity,
      setDonation,
      setDonationMessage,
      applyCoupon,
      removeCoupon,
      clearCart,
      subtotal,
      total,
      totalItems,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
