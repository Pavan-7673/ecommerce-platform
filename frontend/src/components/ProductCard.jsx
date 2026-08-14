import { ShoppingCart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product, onAddToCart }) {
    const navigate = useNavigate();
  return (
    <div className="product-card">
        onClick={() => navigate(`/product/${product.id}`)}

      <div className="product-image">
        <img
          src={product.imageUrl}
          alt={product.name}
        />
      </div>

      <div className="product-info">

        <span className="product-category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <div className="rating">
          <Star
            size={15}
            fill="currentColor"
          />

          {product.rating}

          <span>
            ({product.reviews})
          </span>
        </div>

        <div className="price-row">

          <strong>
            ₹{product.price.toLocaleString("en-IN")}
          </strong>

        {product.originalPrice && ( 
          <del>
            ₹{product.originalPrice.toLocaleString("en-IN")}
          </del>
        )}

        </div>

        <span className="discount">
          {product.discount}
        </span>

        <button
          className="add-cart"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
        }}
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>

      </div>

    </div>
  );
}

export default ProductCard;