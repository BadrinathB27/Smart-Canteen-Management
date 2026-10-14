import React, { useState } from 'react';
import { useCanteen } from '../../context/CanteenContext';
import { Clock, Star, Plus, Minus, Check } from 'lucide-react';

const FALLBACK_FOOD_IMG = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80';

export const FoodCard = ({ item }) => {
  const { cart, addToCart, updateCartQuantity } = useCanteen();
  const [imgSrc, setImgSrc] = useState(item.image || FALLBACK_FOOD_IMG);

  // Check if item is already in cart
  const cartItem = cart.find((ci) => ci.id === item.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleImgError = () => {
    setImgSrc(FALLBACK_FOOD_IMG);
  };

  return (
    <article className="food-card">
      {/* Image container */}
      <div className="food-card-image-wrap">
        <img
          src={imgSrc}
          alt={item.name}
          className="food-card-img"
          onError={handleImgError}
          loading="lazy"
        />

        {/* Veg / Non-veg indicator tag */}
        <div className="food-card-tag-badge">
          <span className={`badge ${item.isVeg ? 'badge-veg' : 'badge-nonveg'}`}>
            {item.isVeg ? '🌱 Veg' : '🍗 Non-Veg'}
          </span>
        </div>

        {/* Prep Time */}
        <div className="food-card-prep-badge">
          <Clock size={12} />
          <span>{item.prepTime || 7} mins</span>
        </div>
      </div>

      {/* Body */}
      <div className="food-card-body">
        <div className="food-title-row">
          <h3 className="food-title">{item.name}</h3>
          <div
            className={`food-diet-dot ${item.isVeg ? 'veg' : 'nonveg'}`}
            title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
          />
        </div>

        <p className="food-desc">{item.description}</p>

        <div className="food-meta-row">
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#b45309', fontWeight: 600 }}>
            <Star size={13} fill="#f59e0b" color="#f59e0b" />
            {item.rating || 4.8}
          </span>
          <span>•</span>
          <span>{item.calories || 320} kcal</span>
          <span>•</span>
          <span style={{ color: '#475569', fontWeight: 500 }}>{item.category}</span>
        </div>

        {/* Footer with Price and CTA */}
        <div className="food-card-footer">
          <div className="food-price">
            <span>₹</span>{item.price}
          </div>

          {!item.isAvailable ? (
            <div className="out-of-stock-badge">
              Out of Stock
            </div>
          ) : quantityInCart > 0 ? (
            <div className="stepper-controls">
              <button
                className="stepper-btn"
                onClick={() => updateCartQuantity(item.id, -1)}
                aria-label={`Decrease ${item.name} quantity`}
              >
                <Minus size={14} />
              </button>
              <span className="stepper-qty">{quantityInCart}</span>
              <button
                className="stepper-btn"
                onClick={() => updateCartQuantity(item.id, 1)}
                aria-label={`Increase ${item.name} quantity`}
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button
              className="add-cart-btn"
              onClick={() => addToCart(item)}
              aria-label={`Add ${item.name} to cart`}
            >
              <Plus size={15} /> Add
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
