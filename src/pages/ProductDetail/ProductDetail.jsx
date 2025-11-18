import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { productsData } from '../../data/products';
import './ProductDetail.css';

const ProductDetail = () => {
  const { collection, id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // Reset states when route changes
    setProduct(null);
    setSelectedImage('');
    setSelectedSize('');
    setQuantity(1);
    setActiveTab('description');
    setIsWishlisted(false);
    
    let collectionProducts = [];
    
    if (collection === 'oversized') {
      // Handle oversized collection - get oversized items from polos
      collectionProducts = productsData.products.polos.filter(item => 
        item.fit && item.fit.toLowerCase().includes('oversize')
      );
    } else if (productsData.products[collection]) {
      collectionProducts = productsData.products[collection];
    } else {
      navigate('/');
      return;
    }
    
    const productId = parseInt(id);
    const foundProduct = collectionProducts.find(product => product.id === productId);
    
    if (!foundProduct) {
      navigate(`/collections/${collection}`);
      return;
    }
    
    setProduct(foundProduct);
    setSelectedImage(foundProduct.image_main);
    setSelectedSize(foundProduct.sizes?.[0] || '');
    
    // Load related products
    const related = collectionProducts
      .filter(p => p.id !== foundProduct.id)
      .slice(0, 4);
    setRelatedProducts(related);
    
    // Scroll to top when product changes
    window.scrollTo(0, 0);
  }, [collection, id, navigate, location.pathname]);

  const createStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - hasHalfStar;

    return (
      <>
        {'★'.repeat(fullStars)}
        {'⯪'.repeat(hasHalfStar)}
        {'☆'.repeat(emptyStars)}
      </>
    );
  };

  const handleImageSelect = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      alert('Please select a size');
      return;
    }
    
    // Here you would typically add to cart logic
    alert(`Added ${quantity} x ${product.name} (${selectedSize}) to cart!`);
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    // Here you would typically save to wishlist
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  const productImages = [
    product.image_main,
    product['image-2'],
    product['image-3'],
    product['image-4']
  ].filter(Boolean);

  return (
    <div className="product-detail-page" key={`${collection}-${id}`}>
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to={`/collections/${collection}`}>
            {collection.charAt(0).toUpperCase() + collection.slice(1)}
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        <div className="product-detail">
          <div className="product-images-section">
            <div className="main-image">
              <img src={selectedImage} alt={product.name} />
              {product.badge && (
                <div className={`product-badge ${product.badge.toLowerCase()}`}>
                  {product.badge}
                </div>
              )}
            </div>
            
            {productImages.length > 1 && (
              <div className="image-thumbnails">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${selectedImage === image ? 'active' : ''}`}
                    onClick={() => handleImageSelect(image)}
                  >
                    <img src={image} alt={`${product.name} view ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="product-info">
            <div className="product-header">
              <h1 className="product-name">{product.name}</h1>
              <div className="product-rating">
                <span className="stars">{createStarRating(product.rating)}</span>
                <span className="rating-text">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="product-price">₹{product.price.toLocaleString()}</div>
            
            <p className="product-description">{product.description}</p>
            
            <div className="product-features">
              <h3>Key Features</h3>
              <div className="features-grid">
                <div className="feature-item">
                  <strong>Material:</strong> {product.material}
                </div>
                <div className="feature-item">
                  <strong>Fit:</strong> {product.fit}
                </div>
                <div className="feature-item">
                  <strong>Care:</strong> {product.care}
                </div>
                <div className="feature-item">
                  <strong>Key Feature:</strong> {product.key_feature}
                </div>
              </div>
            </div>

            <div className="product-tags">
              {product.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>

            {product.sizes && product.sizes.length > 0 && (
              <div className="size-selection">
                <h3>Size</h3>
                <div className="size-options">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="quantity-selection">
              <h3>Quantity</h3>
              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="quantity-display">{quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="product-actions">
              <button 
                className="btn btn-primary add-to-cart"
                onClick={handleAddToCart}
              >
                Add to Cart - ₹{(product.price * quantity).toLocaleString()}
              </button>
              <button 
                className={`btn btn-outline wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
                onClick={handleWishlistToggle}
              >
                {isWishlisted ? '❤️ Wishlisted' : '🤍 Add to Wishlist'}
              </button>
            </div>

            <div className="stock-info">
              <div className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
              </div>
              {product.inStock && (
                <p className="stock-text">Ready to ship in 1-2 business days</p>
              )}
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="product-tabs-section">
          <div className="tabs-header">
            <button 
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => handleTabChange('description')}
            >
              Description
            </button>
            <button 
              className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
              onClick={() => handleTabChange('specifications')}
            >
              Specifications
            </button>
            <button 
              className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
              onClick={() => handleTabChange('shipping')}
            >
              Shipping & Returns
            </button>
            <button 
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => handleTabChange('reviews')}
            >
              Reviews ({product.reviews})
            </button>
          </div>

          <div className="tabs-content">
            {activeTab === 'description' && (
              <div className="tab-panel">
                <h3>Product Description</h3>
                <p>{product.description}</p>
                <p>{product.small_description}</p>
                
                <h4>Features</h4>
                <ul className="feature-list">
                  {product.tags.map((tag, index) => (
                    <li key={index}>{tag} design and construction</li>
                  ))}
                  <li>{product.key_feature} for enhanced comfort</li>
                  <li>Premium {product.material} fabric</li>
                  <li>{product.fit} for optimal comfort</li>
                </ul>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="tab-panel">
                <h3>Product Specifications</h3>
                <div className="specs-grid">
                  <div className="spec-item">
                    <strong>Material:</strong>
                    <span>{product.material}</span>
                  </div>
                  <div className="spec-item">
                    <strong>Fit Type:</strong>
                    <span>{product.fit}</span>
                  </div>
                  <div className="spec-item">
                    <strong>Care Instructions:</strong>
                    <span>{product.care}</span>
                  </div>
                  <div className="spec-item">
                    <strong>Key Feature:</strong>
                    <span>{product.key_feature}</span>
                  </div>
                  <div className="spec-item">
                    <strong>Available Sizes:</strong>
                    <span>{product.sizes ? product.sizes.join(', ') : 'One Size'}</span>
                  </div>
                  <div className="spec-item">
                    <strong>Category:</strong>
                    <span>{product.category}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="tab-panel">
                <h3>Shipping Information</h3>
                <div className="shipping-details">
                  <div className="shipping-option">
                    <h4>🚚 Standard Delivery</h4>
                    <p>3-5 business days • Free on orders over ₹999</p>
                    <p>₹99 for orders under ₹999</p>
                  </div>
                  <div className="shipping-option">
                    <h4>⚡ Express Delivery</h4>
                    <p>1-2 business days • ₹199</p>
                    <p>Available in major cities</p>
                  </div>
                </div>

                <h3>Returns & Exchanges</h3>
                <ul className="return-policy">
                  <li>30-day return policy</li>
                  <li>Free returns and exchanges</li>
                  <li>Items must be in original condition</li>
                  <li>Easy return process through our website</li>
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-panel">
                <h3>Customer Reviews</h3>
                <div className="reviews-summary">
                  <div className="rating-overview">
                    <div className="rating-score">
                      <span className="score">{product.rating}</span>
                      <div className="stars-large">
                        {createStarRating(product.rating)}
                      </div>
                      <p>Based on {product.reviews} reviews</p>
                    </div>
                  </div>
                </div>

                <div className="sample-reviews">
                  <div className="review-item">
                    <div className="review-header">
                      <div className="reviewer-name">Rajesh K.</div>
                      <div className="review-rating">{createStarRating(5)}</div>
                    </div>
                    <p className="review-text">
                      "Excellent quality and perfect fit! The material feels premium and the color is exactly as shown. Highly recommended!"
                    </p>
                    <div className="review-date">2 weeks ago</div>
                  </div>

                  <div className="review-item">
                    <div className="review-header">
                      <div className="reviewer-name">Priya S.</div>
                      <div className="review-rating">{createStarRating(4)}</div>
                    </div>
                    <p className="review-text">
                      "Great product overall. The fit is comfortable and the design is stylish. Fast delivery too!"
                    </p>
                    <div className="review-date">1 month ago</div>
                  </div>

                  <div className="review-item">
                    <div className="review-header">
                      <div className="reviewer-name">Amit M.</div>
                      <div className="review-rating">{createStarRating(5)}</div>
                    </div>
                    <p className="review-text">
                      "Perfect for casual wear. The quality exceeded my expectations. Will definitely buy again!"
                    </p>
                    <div className="review-date">3 weeks ago</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h2>You Might Also Like</h2>
            <div className="related-products-grid">
              {relatedProducts.map((relatedProduct) => (
                <Link 
                  key={relatedProduct.id}
                  to={`/product/${collection}/${relatedProduct.id}`}
                  className="related-product-item"
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                >
                  <div className="related-product-image">
                    <img src={relatedProduct.image_main} alt={relatedProduct.name} />
                    {relatedProduct.badge && (
                      <div className={`product-badge ${relatedProduct.badge.toLowerCase()}`}>
                        {relatedProduct.badge}
                      </div>
                    )}
                  </div>
                  <div className="related-product-info">
                    <h4>{relatedProduct.name}</h4>
                    <div className="related-product-price">
                      ₹{relatedProduct.price.toLocaleString()}
                    </div>
                    <div className="related-product-rating">
                      <span className="stars">{createStarRating(relatedProduct.rating)}</span>
                      <span className="rating-count">({relatedProduct.reviews})</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;