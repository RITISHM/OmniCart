// Product Grid JavaScript - Urban Collection
let collection;
let data = {};
document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  collection = urlParams.get("collection");
}); // "shirts" or "polo"
class CollectionGrid {
  constructor() {
    this.allProducts = [];
    this.displayedCount = 0;
    this.productsPerPage = 3;
    this.currentSort = "featured";

    this.productsGrid = document.getElementById("products-grid");
    this.loadMoreBtn = document.getElementById("load-more-btn");
    this.loading = document.getElementById("loading");
    this.noProducts = document.getElementById("no-products");
    this.resultsCount = document.getElementById("results-count");
    this.sortSelect = document.getElementById("sort-select");

    this.init();
  }

  async init() {
    try {
      const res = await fetch("./assets/json/products.json");
      data = await res.json();
      this.sethead();
      await this.loadProductData();
      this.bindEvents();
      this.sortProducts();
      this.displayProducts();
    } catch (error) {
      console.error("Failed to initialize product grid:", error);
      this.showError("Failed to load products. Please try again later.");
    }
  }

  async loadProductData() {
    if (!data.products[collection] || !data.products[collection]) {
      document.querySelector(
        ".product-section"
      ).innerHTML = `<p>⚠️ Product not found. Please go back to collections.</p>`;
      return;
    }

    this.allProducts = data.products[collection];
  }
  sethead() {
    const navLink = document.querySelectorAll("#breadcrumb-nav a");
    navLink[2].href = `product-grid.html?collection=${collection}`;
    navLink[2].innerHTML =
      collection.charAt(0).toUpperCase() + collection.slice(1) + " Collection";
    const heroHeader = document.querySelector(".hero-header h1");
    heroHeader.innerHTML =
      collection.charAt(0).toUpperCase() + collection.slice(1) + " Collection";
    const heroDesc = document.querySelector(".hero-header p");
    heroDesc.innerHTML = data.collection_description[collection];
  }

  bindEvents() {
    // Sort dropdown event
    if (this.sortSelect) {
      this.sortSelect.addEventListener("change", (e) => {
        this.currentSort = e.target.value;
        this.sortProducts();
        this.resetDisplayAndShow();
      });
    }

    // Load more button event
    if (this.loadMoreBtn) {
      this.loadMoreBtn.addEventListener("click", () => {
        this.loadMoreProducts();
      });
    }

    // View toggle buttons
    const viewButtons = document.querySelectorAll(".view-btn");
    const productsGrid = document.querySelector(".products-grid");

    viewButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        // Remove active class from all buttons
        viewButtons.forEach((b) => b.classList.remove("active"));
        // Add active class to clicked button
        e.target.closest(".view-btn").classList.add("active");

        // Toggle grid/list view
        const selectedView = btn.getAttribute("data-view");
        if (selectedView === "list") {
          productsGrid.classList.add("list-view");
        } else {
          productsGrid.classList.remove("list-view");
        }
      });
    });
  }

  sortProducts() {
    switch (this.currentSort) {
      case "price-low":
        this.allProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        this.allProducts.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        this.allProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "rating":
        this.allProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        this.allProducts.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
        break;
    }
  }

  resetDisplayAndShow() {
    this.displayedCount = 0;
    this.productsGrid.innerHTML = "";
    this.displayProducts();
  }

  displayProducts() {
    this.showLoading(true);

    setTimeout(() => {
      const startIndex = this.displayedCount;
      const endIndex = Math.min(
        startIndex + this.productsPerPage,
        this.allProducts.length
      );
      const productsToShow = this.allProducts.slice(startIndex, endIndex);

      if (productsToShow.length === 0 && startIndex === 0) {
        this.showNoProducts();
        return;
      }

      productsToShow.forEach((product, index) => {
        setTimeout(() => {
          const productElement = this.createProductElement(product);
          this.productsGrid.appendChild(productElement);
        }, index * 100);
      });

      this.displayedCount = endIndex;
      this.updateLoadMoreButton();
      this.updateResultsCount();
      this.showLoading(false);
      this.hideNoProducts();
    }, 300);
  }

  createProductElement(product) {
    const productDiv = document.createElement("div");
    productDiv.className = "product-item";

    const badgeHtml = product.badge
      ? `<div class="product-item-badge ${product.badge.toLowerCase()}">${
          product.badge
        }</div>`
      : "";
    const originalPriceHtml = product.originalPrice
      ? `<span class="original-price">₹${product.originalPrice.toLocaleString()}</span>`
      : "";

    // Create feature tags
    const tagsHtml = product.tags
      .map((tag) => `<span class="feature-tag">${tag}</span>`)
      .join("");

    // Create star rating
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - hasHalfStar;

    const stars =
      "★".repeat(fullStars) + "⯪".repeat(hasHalfStar) + "☆".repeat(emptyStars);

    productDiv.innerHTML = `
      <div class="product-item-image">
        <img src="${product.image_main}" alt="${product.name}" />
        ${badgeHtml}
        
      </div>
      <div class="product-item-details">
        <h3 class="product-item-title">${product.name}</h3>
        <p class="product-item-description">${product.small_description}</p>
        <div class="product-item-price">
          ${originalPriceHtml}
          ₹${product.price.toLocaleString()}
        </div>
        <div class="product-item-rating">
          <span class="product-item-stars">${stars}</span>
          <span class="product-item-rating-count">(${product.reviews})</span>
        </div>
        <div class="product-features">
          ${tagsHtml}
        </div>
        <button class="product-item-btn" onclick="window.location.href='products.html?collection=${collection}&id=${
      product.id - 1
    }';">
          View
        </button>
      </div>
    `;

    return productDiv;
  }

  loadMoreProducts() {
    if (this.displayedCount >= this.allProducts.length) {
      return;
    }
    this.displayProducts();
  }

  updateLoadMoreButton() {
    if (this.displayedCount >= this.allProducts.length) {
      this.loadMoreBtn.style.display = "none";
    } else {
      this.loadMoreBtn.style.display = "inline-block";
      const remaining = this.allProducts.length - this.displayedCount;
      this.loadMoreBtn.textContent = `Load More Products `;
    }
  }

  updateResultsCount() {
    const total = this.allProducts.length;
    const showing = Math.min(this.displayedCount, total);
    this.resultsCount.textContent = `Showing ${showing} of ${total} products`;
  }

  showLoading(show) {
    if (show) {
      this.loading.style.display = "block";
      if (this.loadMoreBtn) this.loadMoreBtn.disabled = true;
    } else {
      this.loading.style.display = "none";
      if (this.loadMoreBtn) this.loadMoreBtn.disabled = false;
    }
  }

  showNoProducts() {
    this.noProducts.style.display = "block";
    this.loadMoreBtn.style.display = "none";
    this.resultsCount.textContent = "No products found";
  }

  hideNoProducts() {
    this.noProducts.style.display = "none";
  }

  showError(message) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.style.cssText = `
      text-align: center;
      padding: 2rem;
      background-color: #f8f8f8;
      border-radius: 8px;
      margin: 2rem 0;
    `;
    errorDiv.innerHTML = `
      <h3 style="color: #e74c3c; margin-bottom: 1rem;">Error</h3>
      <p>${message}</p>
    `;
    this.productsGrid.appendChild(errorDiv);
  }
}

// Global functions for product interactions

function addToWishlist(productId) {
  // Show a simple notification
  showNotification(`Product added to wishlist!`);
  // Here you would implement actual wishlist functionality
}

function showNotification(message) {
  // Create a simple notification
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #2c3e50;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    z-index: 10000;
    font-family: var(--font-montserrat);
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Initialize the product grid when the page loads
document.addEventListener("DOMContentLoaded", function () {
  new CollectionGrid();
});
