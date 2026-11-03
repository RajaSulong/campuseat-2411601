import { useNavigate } from "react-router";
import { useCart } from "../hooks/useCart.js";
import CartItem from "../components/CartItem.jsx";
import CheckoutForm from "../components/CheckoutForm.jsx";

function CartPage() {
  // Get everything we need directly from the cart context
  const { cart, total, changeQty, removeFromCart, placeOrder } = useCart();
  const navigate = useNavigate();

  function handlePlaceOrder(details) {
    // Save the order to the context (this also empties the cart)
    placeOrder(details);

    // Navigate the user to the Orders page
    navigate("/orders");
  }

  // If the cart is empty, show a friendly message
  if (cart.length === 0) {
    return (
      <section>
        <h2 className="section-title">Your cart</h2>
        <p className="muted">Your cart is empty. Pick something from a menu.</p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="section-title">Your cart</h2>
      <div className="cart-layout">
        <div className="card">
          <ul className="cart-list">
            {cart.map((line) => (
              <CartItem
                key={line.item.id}
                line={line}
                onChangeQty={changeQty}
                onRemove={removeFromCart}
              />
            ))}
          </ul>
          <p className="cart-total">Total: RM{total.toFixed(2)}</p>
        </div>

        {/* Pass our local handler to the form */}
        <CheckoutForm onPlaceOrder={handlePlaceOrder} />
      </div>
    </section>
  );
}

export default CartPage;
