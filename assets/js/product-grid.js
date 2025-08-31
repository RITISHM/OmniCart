// Simplified Product Grid JavaScript

// Global State
const AppState = {
    
  cart: [],
  wishlist: [],
  currentView: 'grid',
  currentSort: 'featured',
  currentPage: 1,
  totalProducts: 6,
  productsPerPage: 6
};

// DOM Elements
const DOMElements = {};
function initializeDOMElements() {
  DOMElements.mobileNav = document.getElementById('mobileNav');
  DOMElements.productsGrid = document.getElementById('productsGrid');
  DOMElements.sortDropdown = document.getElementById('sortDropdown');
  DOMElements.cartCount = document.getElementById('cart-count');
  DOMElements.wishlistCount = document.getElementById('wishlist-count');
  DOMElements.cartNotification = document.getElementById('cartNotification');
  DOMElements.cartMessage = document.getElementById('cartMessage');
  DOMElements.quickViewModal = document.getElementById('quickViewModal');
  DOMElements.quickViewContent = document.getElementById('quickViewContent');
  DOMElements.resultsCount = document.getElementById('resultsCount');
}

// Utils
const Utils = {
  formatPrice: (price) => `₹${parseInt(price).toLocaleString()}`,
  debounce: (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }
};

// Mobile Navigation
const MobileNav = {
  toggle() {
    if (!DOMElements.mobileNav) return;
    DOMElements.mobileNav.classList.toggle('active');
    document.body.style.overflow = DOMElements.mobileNav.classList.contains('active') ? 'hidden' : '';
  },
  close() {
    if (DOMElements.mobileNav) {
      DOMElements.mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
};

// Navigation (Wishlist & Cart)
const Navigation = {
  openWishlist() {
    if (AppState.wishlist.length === 0) {
      NotificationManager.show('Your wishlist is empty', 'info');
    } else {
      NotificationManager.show(`Wishlist has ${AppState.wishlist.length} items`, 'info');
    }
  },
  openCart() {
    if (AppState.cart.length === 0) {
      NotificationManager.show('Your cart is empty', 'info');
    } else {
      NotificationManager.show(`Cart has ${AppState.cart.length} items`, 'info');
    }
  }
};

// Product Grid
const ProductGrid = {
  init() {
    this.bindViewToggle();
    this.bindSortDropdown();
    this.bindProductActions();
    this.bindPagination();
    this.updateResultsCount();
  },
  bindViewToggle() {
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.switchView(e.target.closest('.view-btn').dataset.view);
      });
    });
  },
  switchView(view) {
    if (!DOMElements.productsGrid) return;
    AppState.currentView = view;
    document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-view="${view}"]`)?.classList.add('active');
    DOMElements.productsGrid.classList.toggle('list-view', view === 'list');
  },
  bindSortDropdown() {
    DOMElements.sortDropdown?.addEventListener('change', (e) => this.sortProducts(e.target.value));
  },
  sortProducts(sortBy) {
    if (!DOMElements.productsGrid) return;
    AppState.currentSort = sortBy;
    const cards = Array.from(DOMElements.productsGrid.children);
    cards.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return this.getProductPrice(a) - this.getProductPrice(b);
        case 'price-high': return this.getProductPrice(b) - this.getProductPrice(a);
        case 'rating': return this.getProductRating(b) - this.getProductRating(a);
        case 'newest': return new Date(b.dataset.date) - new Date(a.dataset.date);
        default: return 0;
      }
    });
    DOMElements.productsGrid.innerHTML = '';
    cards.forEach(card => DOMElements.productsGrid.appendChild(card));
  },
  getProductPrice: (el) => parseInt(el.dataset.price) || 0,
  getProductRating: (el) => parseFloat(el.dataset.rating) || 0,
  bindProductActions() {
    document.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productData = this.getProductData(e.target);
        CartManager.addToCart(productData, e.target);
      });
    });
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        WishlistManager.toggleWishlist(this.getProductData(e.target), e.target);
      });
    });
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        QuickView.show(this.getProductData(e.target));
      });
    });
  },
  getProductData(el) {
    const card = el.closest('.product-card');
    if (!card) return null;
    return {
      id: el.dataset.product || Date.now().toString(),
      name: card.querySelector('.product-name')?.textContent || 'Unknown Product',
      price: el.dataset.price || '0',
      rating: card.dataset.rating || '0',
      image: card.querySelector('.product-image')?.style.background || '',
      description: card.querySelector('.product-description')?.textContent || ''
    };
  },
  bindPagination() {
    document.querySelectorAll('.page-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.id;
        if (id === 'prevPage') this.goToPage(AppState.currentPage - 1);
        else if (id === 'nextPage') this.goToPage(AppState.currentPage + 1);
        else this.goToPage(parseInt(btn.dataset.page));
      });
    });
  },
  goToPage(pageNum) {
    const maxPages = Math.ceil(AppState.totalProducts / AppState.productsPerPage);
    if (pageNum < 1 || pageNum > maxPages) return;
    AppState.currentPage = pageNum;
    document.querySelectorAll('.page-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.page === pageNum.toString());
    });
    document.getElementById('prevPage').disabled = pageNum === 1;
    document.getElementById('nextPage').disabled = pageNum === maxPages;
  },
  updateResultsCount() {
    if (DOMElements.resultsCount) {
      const start = (AppState.currentPage - 1) * AppState.productsPerPage + 1;
      const end = Math.min(AppState.currentPage * AppState.productsPerPage, AppState.totalProducts);
      DOMElements.resultsCount.textContent = `Showing ${start}-${end} of ${AppState.totalProducts} products`;
    }
  }
};

// Cart Manager
const CartManager = {
  addToCart(product, btn) {
    if (!product || !btn) return;
    btn.classList.add('loading');
    btn.textContent = 'Adding...';
    btn.disabled = true;
    setTimeout(() => {
      const existing = AppState.cart.find(i => i.id === product.id);
      existing ? existing.quantity++ : AppState.cart.push({ ...product, quantity: 1 });
      this.updateCartCount();
      btn.classList.remove('loading');
      btn.classList.add('success');
      btn.textContent = 'Added to Cart';
      NotificationManager.show(`${product.name} added to cart!`, 'success');
      setTimeout(() => {
        btn.classList.remove('success');
        btn.textContent = 'Add to Cart';
        btn.disabled = false;
      }, 2000);
    }, 500);
  },
  updateCartCount() {
    if (!DOMElements.cartCount) return;
    const total = AppState.cart.reduce((s, i) => s + (i.quantity || 1), 0);
    DOMElements.cartCount.textContent = total;
    DOMElements.cartCount.style.display = total > 0 ? 'flex' : 'none';
  }
};

// Wishlist Manager
const WishlistManager = {
  toggleWishlist(product, btn) {
    if (!product || !btn) return;
    const idx = AppState.wishlist.findIndex(i => i.id === product.id);
    const icon = btn.querySelector('.icon-text');
    if (idx > -1) {
      AppState.wishlist.splice(idx, 1);
      btn.classList.remove('active');
      if (icon) icon.textContent = '♡';
      NotificationManager.show(`${product.name} removed from wishlist`, 'info');
    } else {
      AppState.wishlist.push(product);
      btn.classList.add('active');
      if (icon) icon.textContent = '❤';
      NotificationManager.show(`${product.name} added to wishlist!`, 'success');
    }
    this.updateWishlistCount();
  },
  updateWishlistCount() {
    if (!DOMElements.wishlistCount) return;
    DOMElements.wishlistCount.textContent = AppState.wishlist.length;
    DOMElements.wishlistCount.style.display = AppState.wishlist.length > 0 ? 'flex' : 'none';
  }
};

// Quick View
const QuickView = {
  show(product) {
    if (!DOMElements.quickViewModal || !product) return;
    DOMElements.quickViewContent.innerHTML = `
      <h2>${product.name}</h2>
      <p>${Utils.formatPrice(product.price)}</p>
      <p>${product.description}</p>
    `;
    DOMElements.quickViewModal.style.display = 'block';
  },
  hide() {
    DOMElements.quickViewModal.style.display = 'none';
  }
};

// Notifications
const NotificationManager = {
  show(message, type = 'info') {
    if (!DOMElements.cartNotification || !DOMElements.cartMessage) return;
    DOMElements.cartMessage.textContent = message;
    DOMElements.cartNotification.className = `cart-notification ${type} show`;
    setTimeout(() => DOMElements.cartNotification.classList.remove('show'), 3000);
  }
};

// App Init
const App = {
  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.start());
    } else this.start();
  },
  start() {
    initializeDOMElements();
    ProductGrid.init();
    this.setupEvents();
  },
  setupEvents() {
    document.querySelector('.close-modal')?.addEventListener('click', QuickView.hide);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { QuickView.hide(); MobileNav.close(); } });
    window.addEventListener('click', (e) => { if (e.target === DOMElements.quickViewModal) QuickView.hide(); });
    window.addEventListener('resize', Utils.debounce(() => { if (window.innerWidth > 768) MobileNav.close(); }, 250));
  }
};

// Global functions for HTML onclick
function toggleMobileMenu() { MobileNav.toggle(); }
function openWishlist() { Navigation.openWishlist(); }
function openCart() { Navigation.openCart(); }

// Init
App.init();
