import { Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";

import { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  User,
  MapPin,
  Menu,
  ChevronDown,
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
  Tag,
  X,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";

import ProductCard from "./components/ProductCard";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Unable to load products from backend.");
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <Routes>
       <Route
      path="/"
      element={ 
    <div className="app">

      {/* HEADER */}
      <header className="header">

        <div className="logo">
          <ShoppingCart size={30} />

          <div>
            <h1>
              Shop<span>Ease</span>
            </h1>
            <small>Explore. Choose. Enjoy.</small>
          </div>
        </div>

        <div className="location">
          <MapPin size={20} />

          <div>
            <small>Deliver to</small>
            <strong>Hyderabad 500001</strong>
          </div>
        </div>

        <div className="search-box">

          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(e.target.value)
            }
          >
            <option value="All">All</option>
            <option value="Mobiles">Mobiles</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
          </select>

          <input
            type="text"
            placeholder="Search for products, brands and more..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button>
            <Search size={21} />
          </button>

        </div>

        <div className="account">
          <User size={20} />

          <div>
            <small>Hello, Sign in</small>
            <strong>Account & Lists</strong>
          </div>
        </div>

        <div className="orders">
          <small>Returns</small>
          <strong>& Orders</strong>
        </div>

        {/* CART BUTTON */}
        <button
          className="cart"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingCart size={30} />
          <span>{cartCount}</span>
          <strong>Cart</strong>
        </button>

      </header>

      {/* NAVIGATION */}
      <nav className="navbar">

        <div className="all-categories">
          <Menu size={20} />
          All Categories
        </div>

        <a href="#">Today's Deals</a>
        <a href="#">Best Sellers</a>
        <a href="#">Mobiles</a>
        <a href="#">Electronics</a>
        <a href="#">Fashion</a>
        <a href="#">Home & Kitchen</a>
        <a href="#">Beauty</a>

        <a href="#" className="more">
          More
          <ChevronDown size={15} />
        </a>

      </nav>

      {/* HERO */}
      <section className="hero">

        <div className="hero-content">

          <span className="hero-label">
            LIMITED TIME OFFER
          </span>

          <h2>
            Big Savings.
            <br />
            Bigger Smiles.
          </h2>

          <p>
            Discover amazing deals across mobiles,
            electronics, fashion and more.
          </p>

          <button className="shop-button">
            Shop Now →
          </button>

        </div>

        <div className="hero-visual">

          <div className="hero-circle">
            🛍️
          </div>

          <div className="floating-item item-one">
            🎧
          </div>

          <div className="floating-item item-two">
            👟
          </div>

          <div className="floating-item item-three">
            📱
          </div>

        </div>

      </section>

      {/* CATEGORIES */}
      <section className="categories-section">

        <div className="section-heading">

          <div>
            <h2>Shop by Category</h2>
            <p>Find what you're looking for</p>
          </div>

          <button
            className="clear-filter"
            onClick={() => setSelectedCategory("All")}
          >
            View All →
          </button>

        </div>

        <div className="categories">

          {[
            ["📱", "Mobiles"],
            ["🎧", "Electronics"],
            ["👕", "Fashion"],
            ["🛋️", "Home"],
            ["💄", "Beauty"],
            ["🧺", "Appliances"],
            ["⚽", "Sports"],
            ["🧸", "Toys"],
          ].map(([icon, name]) => (

            <div
              className={`category ${
                selectedCategory === name ? "active" : ""
              }`}
              key={name}
              onClick={() => setSelectedCategory(name)}
            >

              <div className="category-icon">
                {icon}
              </div>

              <span>{name}</span>

            </div>

          ))}

        </div>

      </section>

      {/* BENEFITS */}
      <section className="benefits">

        <div className="benefit">
          <Truck size={28} />
          <div>
            <strong>Free Delivery</strong>
            <small>On orders above ₹499</small>
          </div>
        </div>

        <div className="benefit">
          <RotateCcw size={28} />
          <div>
            <strong>Easy Returns</strong>
            <small>7-day return policy</small>
          </div>
        </div>

        <div className="benefit">
          <ShieldCheck size={28} />
          <div>
            <strong>Secure Payments</strong>
            <small>100% protected</small>
          </div>
        </div>

        <div className="benefit">
          <Headphones size={28} />
          <div>
            <strong>24/7 Support</strong>
            <small>We're here to help</small>
          </div>
        </div>

        <div className="benefit">
          <Tag size={28} />
          <div>
            <strong>Best Prices</strong>
            <small>Great deals everyday</small>
          </div>
        </div>

      </section>

      {/* PRODUCTS */}
      <section className="deals-section">

        <div className="section-heading">

          <div>
            <h2>🔥 Best Deals of the Day</h2>
            <p>{filteredProducts.length} products found</p>
          </div>

          <div className="deal-timer">
            Ends in <strong>08:45:12</strong>
          </div>

        </div>

        <div className="product-grid">

          {filteredProducts.length > 0 ? (

            filteredProducts.map((product) => (

              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />

            ))

          ) : (

            <div className="no-products">

              <div>🔍</div>

              <h3>No products found</h3>

              <p>
                Try another search or category.
              </p>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
              >
                Clear Filters
              </button>

            </div>

          )}

        </div>

      </section>

      {/* CART DRAWER */}
      {isCartOpen && (

        <div
          className="cart-overlay"
          onClick={() => setIsCartOpen(false)}
        >

          <aside
            className="cart-drawer"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="cart-header">

              <h2>
                Shopping Cart
              </h2>

              <button
                onClick={() => setIsCartOpen(false)}
              >
                <X size={24} />
              </button>

            </div>

            {cart.length === 0 ? (

              <div className="empty-cart">

                <ShoppingCart size={60} />

                <h3>Your cart is empty</h3>

                <p>
                  Add some products to get started.
                </p>

                <button
                  onClick={() => setIsCartOpen(false)}
                >
                  Continue Shopping
                </button>

              </div>

            ) : (

              <>

                <div className="cart-items">

                  {cart.map((item) => (

                    <div
                      className="cart-item"
                      key={item.id}
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div className="cart-item-info">

                        <h4>{item.name}</h4>

                        <strong>
                          ₹{item.price.toLocaleString("en-IN")}
                        </strong>

                        <div className="quantity-controls">

                          <button
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                          >
                            <Minus size={15} />
                          </button>

                          <span>
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                          >
                            <Plus size={15} />
                          </button>

                        </div>

                        <button
                          className="remove-item"
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                        >
                          <Trash2 size={15} />
                          Remove
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

                <div className="cart-summary">

                  <div className="summary-row">
                    <span>Subtotal</span>

                    <strong>
                      ₹{cartTotal.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <p>
                    Taxes and delivery charges calculated
                    at checkout.
                  </p>

                  <button className="checkout-button">
                    Proceed to Checkout →
                  </button>

                </div>

              </>

            )}

          </aside>

        </div>

      )}

      {/* FOOTER */}
      <footer>

        <div className="footer-logo">
          🛒 ShopEase
        </div>

        <p>
          Your everyday destination for great products
          at great prices.
        </p>

        <div className="footer-links">

          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Help</a>

        </div>

        <small>
          © 2026 ShopEase. Built as an original DevOps project.
        </small>

      </footer>

    </div>
      }
  />



 <Route
      path="/product/:id"
      element={
        <ProductDetails onAddToCart={addToCart} />
      }
    />
  </Routes>
  );
}


export default App;