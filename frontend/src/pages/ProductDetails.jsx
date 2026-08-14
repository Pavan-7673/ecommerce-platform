import { useState, useEffect } from "react";
import { ShoppingCart, Zap, Star, Truck, ShieldCheck } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Product not found");
        }

        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setError("Unable to load product.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="product-not-found">
        <h2>Loading product...</h2>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>

        <button onClick={() => navigate("/")}>
          Back to Shop
        </button>
      </div>
    );
  }

  const increaseQuantity = () => {
    setQuantity((q) => q + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((q) => Math.max(1, q - 1));
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
  };

  return (
    <div className="product-details-page">

      <div className="breadcrumb">
        Home / {product.category} / {product.name}
      </div>

      <div className="product-details-container">

        {/* IMAGE */}

        <div className="product-details-image">
          <img
            src={product.imageUrl}
            alt={product.name}
          />
        </div>

        {/* INFORMATION */}

        <div className="product-details-info">

          <span className="details-category">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <div className="details-rating">

            <span className="rating-box">
              {product.rating || 4.5}

              <Star
                size={14}
                fill="currentColor"
              />
            </span>

            <span>
              {product.reviews || 0} ratings
            </span>

          </div>

          <hr />

          <div className="details-price">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </div>

          {product.originalPrice && (
            <div className="details-original-price">
              M.R.P.{" "}
              <del>
                ₹{Number(product.originalPrice).toLocaleString("en-IN")}
              </del>
            </div>
          )}

          {product.discount && (
            <div className="details-offer">
              {product.discount}
            </div>
          )}

          <p className="details-description">
            {product.description ||
              "Experience excellent quality, reliable performance and great value with this product. Designed for everyday use and backed by ShopEase quality standards."}
          </p>

          <div className="details-features">

            <div>
              <Truck size={25} />

              <span>
                <strong>Free Delivery</strong>
                Fast delivery available
              </span>
            </div>

            <div>
              <ShieldCheck size={25} />

              <span>
                <strong>Secure Payment</strong>
                100% secure checkout
              </span>
            </div>

          </div>

          {/* QUANTITY */}

          <div className="quantity-section">

            <strong>Quantity:</strong>

            <div className="quantity-selector">

              <button onClick={decreaseQuantity}>
                −
              </button>

              <span>{quantity}</span>

              <button onClick={increaseQuantity}>
                +
              </button>

            </div>

          </div>

          {/* ACTIONS */}

          <div className="product-actions">

            <button
              className="details-add-cart"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={19} />
              Add to Cart
            </button>

            <button
              className="buy-now"
              onClick={handleAddToCart}
            >
              <Zap size={19} />
              Buy Now
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;