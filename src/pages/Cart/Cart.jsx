import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../../components/Toast/ToastContainer';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { showSuccess, showError, showInfo } = useToast();
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const updateQuantity = (itemId, change) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(1, Math.min(10, item.quantity + change));
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    updateCart(updatedCart);
  };

  const removeItem = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    updateCart(updatedCart);
  };

  const applyPromoCode = (e) => {
    e.preventDefault();
    const code = promoCode.toUpperCase();
    if (code === 'OMNI10') {
      setDiscount(10);
      showSuccess('Promo code applied! 10% discount');
    } else if (code === 'WELCOME20') {
      setDiscount(20);
      showSuccess('Promo code applied! 20% discount');
    } else {
      setDiscount(0);
      showError('Invalid promo code');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discount) / 100;
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal - discountAmount + shipping;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showError('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/collections/polos" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</p>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-item-category">{item.category}</p>
                  {item.size && <p className="cart-item-size">Size: {item.size}</p>}
                  <p className="cart-item-price">₹{item.price.toLocaleString()}</p>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      disabled={item.quantity >= 10}
                    >
                      +
                    </button>
                  </div>
                  
                  <p className="cart-item-total">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                  
                  <button 
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>

            {discount > 0 && (
              <div className="summary-row discount">
                <span>Discount ({discount}%)</span>
                <span>-₹{discountAmount.toLocaleString()}</span>
              </div>
            )}

            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
            </div>

            {shipping > 0 && (
              <p className="free-shipping-note">
                Add ₹{(1000 - subtotal).toLocaleString()} more for free shipping
              </p>
            )}

            <div className="summary-divider"></div>

            <div className="summary-row total">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>

            <form className="promo-form" onSubmit={applyPromoCode}>
              <input
                type="text"
                placeholder="Promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button type="submit" className="btn btn-outline-dark">
                Apply
              </button>
            </form>

            <button 
              className="btn btn-primary checkout-btn"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>

            <Link to="/collections/polos" className="continue-shopping">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
