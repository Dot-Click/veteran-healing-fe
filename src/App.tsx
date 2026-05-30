import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import { queryClient } from "./lib/queryClient";
import { NotificationListener } from "./components/NotificationListener";
import AppRoutes from "./routes";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <NotificationListener />
      <BrowserRouter>
        <CartProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                border: "1px solid #769183",
                background: "#fff",
                color: "#112516",
                fontWeight: 600,
              },
              success: {
                iconTheme: {
                  primary: "#0F402F",
                  secondary: "#fff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#B91C1C",
                  secondary: "#fff",
                },
              },
            }}
          />
          <AppRoutes />
        </CartProvider>
      </BrowserRouter>
    </AuthProvider>
    </QueryClientProvider>
  );
}
