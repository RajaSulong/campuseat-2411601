import { CartContext } from "./cart-context.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

// Owns the cart and the orders, and shares them with every component inside it.
export function CartProvider({ children }) {
  // Use useLocalStorage instead of useState so the cart survives a refresh
  const [cart, setCart] = useLocalStorage("campuseats-cart", []); // { item, qty }
  const [orders, setOrders] = useLocalStorage("campuseats-orders", []);

  function addToCart(item) {
    setCart((prev) => {
      const existing = prev.find((line) => line.item.id === item.id);
      if (existing) {
        return prev.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line,
        );
      }
      return [...prev, { item, qty: 1 }];
    });
  }

  function changeQty(itemId, delta) {
    setCart(
      (prev) =>
        prev
          .map((line) =>
            line.item.id === itemId ? { ...line, qty: line.qty + delta } : line,
          )
          .filter((line) => line.qty > 0), // qty 0 means the line disappears
    );
  }

  function removeFromCart(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId));
  }

  // details = { name, mahallah, pickupTime } from CheckoutForm
  function placeOrder(details) {
    const order = {
      id: `ord-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...details,
      lines: cart,
      total: cart.reduce((sum, line) => sum + line.item.price * line.qty, 0),
    };

    // Add the new order to the front of the orders array (newest first)
    setOrders((prev) => [order, ...prev]);

    // Empty the cart after placing the order
    setCart([]);

    return order;
  }

  // Derived values
  const count = cart.reduce((sum, line) => sum + line.qty, 0);
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0);

  const value = {
    cart,
    orders,
    count,
    total,
    addToCart,
    changeQty,
    removeFromCart,
    placeOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
