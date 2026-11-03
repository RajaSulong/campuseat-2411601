import { useContext } from "react";
import { CartContext } from "../context/cart-context.js";

// Every component reads the cart through this one hook.
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    // Throw a clear error if this hook is used outside of the CartProvider
    throw new Error("useCart must be used inside <CartProvider>");
  }

  return context;
}
