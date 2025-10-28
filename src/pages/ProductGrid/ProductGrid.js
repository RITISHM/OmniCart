import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productsData } from '../../data/products';
import './ProductGrid.css';

const ProductGrid = () => {
  const { collection } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [displayedCount, setDisplayedCount] = useState(0);
  const [currentSort, setCurrentSort] = useState('featured');
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const productsPerPage = 3;

  // Load products for the collection
  const loadProducts = useCallback(() => {
    if (!productsData.products[collection] && collection !== 'oversized') {
      navigate('/');
      return;
    }

    let collectionProducts = [];
    
    if (collection === 'oversized') {
      // Handle oversized collection - get oversized items from polos
      collectionProducts = productsData.products.polos.filter(item => 
        item.fit && item.fit.toLowerCase().includes('oversize')
      );
    } else {
      collectionProducts = productsData.products[collection] || [];
    }

    setProducts(collectionProducts);
  }, [collection, navigate]);

  // Sort and display products
  useEffect(() => {
    if (products.length === 0) return;

    let sortedProducts = [...products];

    switch (currentSort) {
      case 'price-low':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'rating':
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        sortedProducts.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
        break;
    }

    // Display initial products
    const endIndex = Math.min(productsPerPage, sortedProducts.length);
    const initialProducts = sortedProducts.slice(0, endIndex);
    setDisplayedProducts(initialProducts);
    setDisplayedCount(endIndex);
    
    // Update products state with sorted products
    setProducts(sortedProducts);
  }, [products.length, currentSort, productsPerPage]);

  // Load products when collection changes
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const displayProducts = (startIndex = displayedCount, productsToUse = products) => {
    setIsLoading(true);

    setTimeout(() => {
      const endIndex = Math.min(startIndex + productsPerPage, productsToUse.length);
      const newProducts = productsToUse.slice(startIndex, endIndex);
      
      if (startIndex === 0) {
        setDisplayedProducts(newProducts);
      } else {
        setDisplayedProducts(prev => [...prev, ...newProducts]);
      }
      
      setDisplayedCount(endIndex);
      setIsLoading(false);
    }, 300);
  };

  const loadMoreProducts = () => {
    if (displayedCount >= products.length) return;
    displayProducts();
  };

  const handleSortChange = (e) => {
    setCurrentSort(e.target.value);
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

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

  const getCollectionTitle = () => {
    return collection.charAt(0).toUpperCase() + collection.slice(1) + ' Collection';
  };

  const getCollectionDescription = () => {
    if (collection === 'oversized') {
      return 'Bold statements in oversized fits. Premium heavy gauge fabrics meet street-ready designs for maximum comfort and impact.';
    }
    return productsData.collection_description[collection] || 'Discover our amazing collection of products.';
  };

  if (!productsData.products[collection] && collection !== 'oversized') {
    return (
      <div className="container">
        <p>Collection not found. Please go back to collections.</p>
      </div>
    );
  }

  return (
    <div className="product-grid-page">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link> /
          <Link to="/#collections">Collections</Link> /
          <span>{getCollectionTitle()}</span>
        </nav>

        {/* Hero Header */}
        <div className="hero-header">
          <div className="hero-background">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Collection Background"
            />
            <div className="hero-overlay"></div>
          </div>
          <div className="hero-content">
            <h1 className="hero-title">{getCollectionTitle()}</h1>
            <p className="hero-description">{getCollectionDescription()}</p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="toolbar-section">
          <div className="toolbar-left">
            <span className="results-count">
              Showing {Math.min(displayedCount, products.length)} of {products.length} products
            </span>
          </div>
          <div className="toolbar-right">
            <label htmlFor="sort-select" className="sort-label">Sort by:</label>
            <select 
              className="sort-select" 
              id="sort-select"
              value={currentSort}
              onChange={handleSortChange}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
              <option value="rating">Best Rating</option>
            </select>
            <div className="view-toggle">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => handleViewChange('grid')}
                title="Grid view"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => handleViewChange('list')}
                title="List view"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="6" width="18" height="2" />
                  <rect x="3" y="12" width="18" height="2" />
                  <rect x="3" y="18" width="18" height="2" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
          {displayedProducts.map((product) => (
            <div key={product.id} className="product-item">
              <div className="product-item-image">
                <img src={product.image_main} alt={product.name} />
                {product.badge && (
                  <div className={`product-item-badge ${product.badge.toLowerCase()}`}>
                    {product.badge}
                  </div>
                )}
              </div>
              <div className="product-item-details">
                <h3 className="product-item-title">{product.name}</h3>
                <p className="product-item-description">{product.small_description}</p>
                <div className="product-item-price">
                  ₹{product.price.toLocaleString()}
                </div>
                <div className="product-item-rating">
                  <span className="product-item-stars">
                    {createStarRating(product.rating)}
                  </span>
                  <span className="product-item-rating-count">({product.reviews})</span>
                </div>
                <div className="product-features">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="feature-tag">{tag}</span>
                  ))}
                </div>
                <Link 
                  to={`/product/${collection}/${product.id}`}
                  className="product-item-btn"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {displayedCount < products.length && (
          <div className="load-more-section">
            <button 
              onClick={loadMoreProducts}
              className="btn btn-outline-dark"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Load More Products'}
            </button>
          </div>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading products...</p>
          </div>
        )}

        {/* No Products Message */}
        {displayedProducts.length === 0 && !isLoading && products.length === 0 && (
          <div className="no-products">
            <h3>No products found</h3>
            <p>Try adjusting your filters to see more results.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;