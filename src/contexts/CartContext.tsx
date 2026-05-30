import { createContext, useCallback, useEffect, useMemo, useReducer, type ReactNode } from "react";
import type { CartItem, Product, ProductVariant } from "../types/product.types";
import api from "../services/api";

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
  | { type: "CLEAR_CART" };

interface CartContextValue extends CartState {
  addItem: (product: Product, variant?: ProductVariant) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;
  setDonation: (amount: number) => void;
  setDonationMessage: (message: string) => void;
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

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  // Persist cart to backend after state changes
  useEffect(() => {
    const persistCart = async () => {
      try {
        // Transform items to backend format (just slug, variantId, quantity)
        const backendItems = state.items.map((item) => ({
          productSlug: item.product.slug,
          variantId: item.selectedVariant?.id,
          quantity: item.quantity,
          priceAtAdd: Math.round(item.product.price * 100), // Convert to cents
        }));

        await api.put("/cart", {
          items: backendItems,
          donationAmount: Math.round(state.donationAmount * 100), // Convert to cents
          donationMessage: state.donationMessage,
        });
      } catch (err) {
        // Silently fail - local state is still valid
        console.debug("Cart sync failed:", err);
      }
    };

    persistCart();
  }, [state.items, state.donationAmount, state.donationMessage]);

  const addItem = useCallback((product: Product, variant?: ProductVariant) => {
    dispatch({ type: "ADD_ITEM", product, variant });
  }, []);

  const removeItem = useCallback((productId: string, variantId?: string) => {
    dispatch({ type: "REMOVE_ITEM", productId, variantId });
  }, []);

  const updateQuantity = useCallback(
    (productId: string, variantId: string | undefined, quantity: number) => {
      dispatch({ type: "UPDATE_QUANTITY", productId, variantId, quantity });
    },
    []
  );

  const setDonation = useCallback((amount: number) => {
    dispatch({ type: "SET_DONATION", amount });
  }, []);

  const setDonationMessage = useCallback((message: string) => {
    dispatch({ type: "SET_DONATION_MESSAGE", message });
  }, []);

  const applyCoupon = useCallback((code: string, discount: number) => {
    dispatch({ type: "APPLY_COUPON", code, discount });
  }, []);

  const removeCoupon = useCallback(() => {
    dispatch({ type: "REMOVE_COUPON" });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const subtotal = useMemo(
    () => state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [state.items]
  );

  const total = useMemo(
    () => subtotal + state.donationAmount - state.couponDiscount,
    [subtotal, state.donationAmount, state.couponDiscount]
  );

  const totalItems = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );

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
    [state, addItem, removeItem, updateQuantity, setDonation, setDonationMessage, applyCoupon, removeCoupon, clearCart, subtotal, total, totalItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
