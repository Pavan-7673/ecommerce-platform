import { useState } from "react";
import {
  MapPin,
  CreditCard,
  Wallet,
  Banknote,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import "./Checkout.css";

function Checkout({ cartItems = [] }) {
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const delivery = subtotal >= 499 || subtotal === 0 ? 0 : 49;

  const total = subtotal + delivery;

  const placeOrder = (e) => {
    e.preventDefault();

    if (
      !address.name ||
      !address.mobile ||
      !address.address ||
      !address.city ||
      !address.state ||
      !address.pincode
    ) {
      alert("Please complete your delivery address.");
      return;
    }

    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="order-success">
        <div className="success-icon">
          <CheckCircle size={65} />
        </div>

        <h1>Order Placed Successfully!</h1>

        <p>
          Thank you for shopping with ShopEase.
          Your order has been received.
        </p>

        <div className="order-number">
          Order ID: <strong>SE{Date.now().toString().slice(-8)}</strong>
        </div>

        <button onClick={() => (window.location.href = "/")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">

      <div className="checkout-header">
        <div>
          <h1>Checkout</h1>
          <p>Complete your order securely</p>
        </div>

        <div className="secure-checkout">
          <ShieldCheck size={20} />
          Secure Checkout
        </div>
      </div>

      <form onSubmit={placeOrder}>

        <div className="checkout-layout">

          {/* LEFT SIDE */}

          <div className="checkout-left">

            {/* DELIVERY ADDRESS */}

            <section className="checkout-card">

              <div className="checkout-card-title">
                <MapPin size={22} />
                <div>
                  <h2>Delivery Address</h2>
                  <p>Where should we deliver your order?</p>
                </div>
              </div>

              <div className="form-grid">

                <div className="form-group">
                  <label>Full Name</label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={address.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Mobile Number</label>

                  <input
                    type="tel"
                    name="mobile"
                    placeholder="10-digit mobile number"
                    value={address.mobile}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group full-width">
                  <label>Address</label>

                  <textarea
                    name="address"
                    placeholder="House number, street, area"
                    value={address.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>City</label>

                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={address.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>State</label>

                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={address.state}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>PIN Code</label>

                  <input
                    type="text"
                    name="pincode"
                    placeholder="6-digit PIN code"
                    value={address.pincode}
                    onChange={handleChange}
                  />
                </div>

              </div>

            </section>

            {/* PAYMENT */}

            <section className="checkout-card">

              <div className="checkout-card-title">
                <CreditCard size={22} />

                <div>
                  <h2>Payment Method</h2>
                  <p>Choose your preferred payment option</p>
                </div>
              </div>

              <div className="payment-options">

                <label
                  className={
                    paymentMethod === "UPI"
                      ? "payment-option active"
                      : "payment-option"
                  }
                >
                  <input
                    type="radio"
                    name="payment"
                    value="UPI"
                    checked={paymentMethod === "UPI"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <Wallet size={22} />

                  <div>
                    <strong>UPI</strong>
                    <small>Google Pay, PhonePe, Paytm</small>
                  </div>
                </label>

                <label
                  className={
                    paymentMethod === "CARD"
                      ? "payment-option active"
                      : "payment-option"
                  }
                >
                  <input
                    type="radio"
                    name="payment"
                    value="CARD"
                    checked={paymentMethod === "CARD"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <CreditCard size={22} />

                  <div>
                    <strong>Credit / Debit Card</strong>
                    <small>Visa, Mastercard, RuPay</small>
                  </div>
                </label>

                <label
                  className={
                    paymentMethod === "COD"
                      ? "payment-option active"
                      : "payment-option"
                  }
                >
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <Banknote size={22} />

                  <div>
                    <strong>Cash on Delivery</strong>
                    <small>Pay when your order arrives</small>
                  </div>
                </label>

              </div>

            </section>

          </div>

          {/* RIGHT SIDE */}

          <aside className="order-summary">

            <h2>Order Summary</h2>

            <div className="summary-products">

              {cartItems.length === 0 ? (
                <p className="empty-checkout">
                  Your cart is empty.
                </p>
              ) : (
                cartItems.map((item) => (
                  <div
                    className="summary-product"
                    key={item.id}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div>
                      <strong>{item.name}</strong>

                      <span>
                        Qty: {item.quantity}
                      </span>

                      <b>
                        ₹{item.price * item.quantity}
                      </b>
                    </div>
                  </div>
                ))
              )}

            </div>

            <div className="summary-divider" />

            <div className="summary-line">
              <span>Subtotal</span>
              <strong>₹{subtotal}</strong>
            </div>

            <div className="summary-line">
              <span>Delivery</span>

              <strong>
                {delivery === 0 ? "FREE" : `₹${delivery}`}
              </strong>
            </div>

            <div className="summary-divider" />

            <div className="summary-total">
              <span>Total</span>
              <strong>₹{total}</strong>
            </div>

            <button
              type="submit"
              className="place-order-button"
              disabled={cartItems.length === 0}
            >
              Place Order
            </button>

            <div className="secure-payment">

              <ShieldCheck size={18} />

              <span>
                Your payment information is encrypted
                and securely processed.
              </span>

            </div>

          </aside>

        </div>

      </form>

    </div>
  );
}

export default Checkout;