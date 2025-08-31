// Global variables
let quantity = 1;
let selectedSize = 'm';
let selectedColor = 'beige';
let cartItems = [];
let wishlistItems = [];

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    updateCartBadge();
    updateWishlistBadge();
});

// Navigation functions
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (mobileNav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
}

function toggleSearch() {
    showNotification('Search functionality coming soon!', 'info');
    // In a real app, this would open a search modal or redirect to search page
}

function openWishlist() {
    if (wishlistItems.length === 0) {
        showNotification('Your wishlist is empty', 'info');
    } else {
        showNotification(`You have ${wishlistItems.length} items in your wishlist`, 'info');
        console.log('Wishlist items:', wishlistItems);
    }
}

function openCart() {
    if (cartItems.length === 0) {
        showNotification('Your cart is empty', 'info');
    } else {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        showNotification(`You have ${totalItems} items in your cart`, 'info');
        console.log('Cart items:', cartItems);
    }
}

function openAccount() {
    showNotification('Account page coming soon!', 'info');
    // In a real app, this would redirect to login/account page
}

// Update cart badge
function updateCartBadge() {
    const cartBadge = document.getElementById('cart-count');
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalItems > 0) {
        cartBadge.textContent = totalItems;
        cartBadge.style.display = 'flex';
    } else {
        cartBadge.style.display = 'none';
    }
}

// Update wishlist badge
function updateWishlistBadge() {
    const wishlistBadge = document.getElementById('wishlist-count');
    
    if (wishlistItems.length > 0) {
        wishlistBadge.textContent = wishlistItems.length;
        wishlistBadge.style.display = 'flex';
    } else {
        wishlistBadge.style.display = 'none';
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileNav = document.getElementById('mobileNav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileNav.classList.contains('active') && 
        !mobileNav.contains(event.target) && 
        !mobileMenuBtn.contains(event.target)) {
        closeMobileMenu();
    }
});

// Initialize page elements
function initializePage() {
    // Set initial color gradient for main image
    const mainImage = document.getElementById('mainImage');
    mainImage.style.background = getColorGradient('beige');
    
    // Initialize quantity display
    document.getElementById('quantity').textContent = quantity;
}

// Setup all event listeners
function setupEventListeners() {
    // Size selection event listeners
    document.querySelectorAll('.size-option').forEach(option => {
        option.addEventListener('click', handleSizeSelection);
    });

    // Color selection event listeners
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', handleColorSelection);
    });

    // Thumbnail selection event listeners
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.addEventListener('click', handleThumbnailSelection);
    });

    // Related item hover effects
    document.querySelectorAll('.related-item').forEach(item => {
        item.addEventListener('mouseenter', handleRelatedItemHover);
        item.addEventListener('mouseleave', handleRelatedItemLeave);
    });
}

// Quantity management functions
function updateQuantity(change) {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
        quantity = newQuantity;
        document.getElementById('quantity').textContent = quantity;
        
        // Add visual feedback
        const quantityElement = document.getElementById('quantity');
        quantityElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            quantityElement.style.transform = 'scale(1)';
        }, 150);
    }
}

// Size selection handler
function handleSizeSelection(event) {
    // Remove selected class from all size options
    document.querySelectorAll('.size-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    event.target.classList.add('selected');
    selectedSize = event.target.dataset.size;
    
    // Visual feedback
    event.target.style.transform = 'scale(0.95)';
    setTimeout(() => {
        event.target.style.transform = 'scale(1)';
    }, 100);
    
    console.log(`Size selected: ${selectedSize.toUpperCase()}`);
}

// Color selection handler
function handleColorSelection(event) {
    // Remove selected class from all color options
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    event.target.classList.add('selected');
    selectedColor = event.target.dataset.color;
    
    // Update main image background based on color selection
    const mainImage = document.getElementById('mainImage');
    mainImage.style.background = getColorGradient(selectedColor);
    
    // Add transition effect
    mainImage.style.transition = 'background 0.5s ease';
    
    console.log(`Color selected: ${selectedColor}`);
}

// Thumbnail selection handler
function handleThumbnailSelection(event) {
    // Remove active class from all thumbnails
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    
    // Add active class to clicked thumbnail
    event.target.classList.add('active');
    
    // You could add logic here to change the main image based on thumbnail
    const imageType = event.target.dataset.image;
    console.log(`Thumbnail selected: ${imageType}`);
}

// Get color gradient based on selected color
function getColorGradient(color) {
    const gradients = {
        beige: 'linear-gradient(45deg, #d4b89a, #e8d5c4)',
        navy: 'linear-gradient(45deg, #2c3e50, #34495e)',
        black: 'linear-gradient(45deg, #000, #333)',
        grey: 'linear-gradient(45deg, #95a5a6, #bdc3c7)'
    };
    return gradients[color] || gradients.beige;
}

// Add to cart functionality
function addToCart() {
    const button = document.querySelector('.btn-primary');
    const originalText = button.textContent;
    
    // Visual feedback
    button.textContent = 'Adding...';
    button.style.background = '#666';
    button.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        button.textContent = 'Added to Cart ✓';
        button.style.background = '#27ae60';
        
        // Create cart data object
        const cartItem = {
            id: Date.now(), // Simple ID generation
            name: 'Urban Minimalist Blazer',
            size: selectedSize.toUpperCase(),
            color: selectedColor,
            quantity: quantity,
            price: getProductPrice(),
            timestamp: new Date().toISOString()
        };
        
        // Check if item already exists in cart (same product, size, color)
        const existingItemIndex = cartItems.findIndex(item => 
            item.name === cartItem.name && 
            item.size === cartItem.size && 
            item.color === cartItem.color
        );
        
        if (existingItemIndex > -1) {
            // Update quantity if item exists
            cartItems[existingItemIndex].quantity += cartItem.quantity;
        } else {
            // Add new item to cart
            cartItems.push(cartItem);
        }
        
        // Update cart badge
        updateCartBadge();
        
        // Store in memory (you could also send to server here)
        console.log('Cart updated:', cartItems);
        
        // Show success message
        showNotification('Product added to cart successfully!', 'success');
        
        // Track analytics
        trackAddToCart();
        
        // Reset button after delay
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '#000';
            button.disabled = false;
        }, 2000);
        
    }, 1000);
}

// Add to wishlist functionality
function addToWishlist() {
    const button = document.querySelector('.btn-secondary');
    const originalText = button.textContent;
    
    // Visual feedback
    button.textContent = 'Adding to Wishlist...';
    button.style.background = '#666';
    button.style.color = 'white';
    button.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        button.textContent = 'Added to Wishlist ♥';
        button.style.background = '#e74c3c';
        button.style.color = 'white';
        
        // Create wishlist data object
        const wishlistItem = {
            id: Date.now(),
            name: 'Urban Minimalist Blazer',
            size: selectedSize.toUpperCase(),
            color: selectedColor,
            price: getProductPrice(),
            timestamp: new Date().toISOString()
        };
        
        // Check if item already exists in wishlist
        const existingItem = wishlistItems.find(item => 
            item.name === wishlistItem.name && 
            item.size === wishlistItem.size && 
            item.color === wishlistItem.color
        );
        
        if (!existingItem) {
            wishlistItems.push(wishlistItem);
            updateWishlistBadge();
            showNotification('Product added to wishlist!', 'success');
        } else {
            showNotification('Product already in wishlist!', 'info');
        }
        
        // Store in memory (you could also send to server here)
        console.log('Wishlist updated:', wishlistItems);
        
        // Reset button after delay
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = 'white';
            button.style.color = '#000';
            button.disabled = false;
        }, 2000);
        
    }, 800);
}

// Get product price based on size (example logic)
function getProductPrice() {
    const basePrices = {
        xs: 2850,
        s: 2850,
        m: 2950,
        l: 3050,
        xl: 3150,
        xxl: 3200
    };
    return basePrices[selectedSize] || 2950;
}

// Show notification function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#27ae60' : '#3498db',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '4px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        zIndex: '1000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Related item hover handlers
function handleRelatedItemHover(event) {
    const item = event.currentTarget;
    item.style.transform = 'translateY(-8px)';
    item.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
}

function handleRelatedItemLeave(event) {
    const item = event.currentTarget;
    item.style.transform = 'translateY(-5px)';
    item.style.boxShadow = 'none';
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Image loading simulation (if you had real images)
function loadProductImages() {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // Simulate image loading
    setTimeout(() => {
        mainImage.style.opacity = '0.8';
        thumbnails.forEach((thumb, index) => {
            setTimeout(() => {
                thumb.style.opacity = '1';
            }, index * 100);
        });
    }, 500);
}

// Keyboard navigation support
document.addEventListener('keydown', function(event) {
    // Handle quantity changes with + and - keys
    if (event.key === '+' || event.key === '=') {
        event.preventDefault();
        updateQuantity(1);
    } else if (event.key === '-') {
        event.preventDefault();
        updateQuantity(-1);
    }
    
    // Handle size selection with number keys
    const sizeMap = {
        '1': 'xs',
        '2': 's',
        '3': 'm',
        '4': 'l',
        '5': 'xl',
        '6': 'xxl'
    };
    
    if (sizeMap[event.key]) {
        const sizeElement = document.querySelector(`[data-size="${sizeMap[event.key]}"]`);
        if (sizeElement) {
            sizeElement.click();
        }
    }
});

// Product image zoom functionality
function initializeImageZoom() {
    const mainImage = document.getElementById('mainImage');
    
    mainImage.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;
        
        this.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    });
    
    mainImage.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.cursor = 'zoom-in';
    });
    
    mainImage.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.cursor = 'default';
    });
}

// Initialize zoom functionality when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeImageZoom();
});

// Form validation for contact/newsletter signup
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Local storage helpers (for cart persistence if needed in future)
function saveToStorage(key, data) {
    try {
        // Note: localStorage is not available in Claude artifacts
        // This is just example code structure
        console.log(`Would save to ${key}:`, data);
    } catch (error) {
        console.error('Storage not available:', error);
    }
}

function getFromStorage(key) {
    try {
        // Note: localStorage is not available in Claude artifacts
        // This is just example code structure
        console.log(`Would retrieve from ${key}`);
        return null;
    } catch (error) {
        console.error('Storage not available:', error);
        return null;
    }
}

// Price calculation with taxes and shipping
function calculateTotalPrice() {
    const basePrice = getProductPrice();
    const tax = Math.round(basePrice * 0.18); // 18% GST for India
    const shipping = basePrice >= 2000 ? 0 : 150; // Free shipping above ₹2000
    const total = basePrice + tax + shipping;
    
    return {
        basePrice,
        tax,
        shipping,
        total
    };
}

// Update price display with detailed breakdown
function updatePriceDisplay() {
    const pricing = calculateTotalPrice();
    const priceElement = document.querySelector('.product-price');
    
    priceElement.innerHTML = `
        <div class="price-breakdown">
            <div class="base-price">₹${pricing.basePrice}</div>
            <div class="tax-info">+ ₹${pricing.tax} (GST)</div>
            ${pricing.shipping > 0 ? `<div class="shipping-info">+ ₹${pricing.shipping} (Shipping)</div>` : '<div class="free-shipping">Free Shipping!</div>'}
            <div class="total-price">Total: ₹${pricing.total}</div>
        </div>
    `;
}

// Analytics tracking functions (placeholder)
function trackEvent(eventName, eventData) {
    console.log('Analytics Event:', eventName, eventData);
    // In a real application, you would send this to your analytics service
    // Example: gtag('event', eventName, eventData);
}

// Track user interactions
function trackProductView() {
    trackEvent('product_view', {
        product_name: 'Urban Minimalist Blazer',
        product_category: 'Urban Collection',
        page_location: window.location.href
    });
}

function trackAddToCart() {
    trackEvent('add_to_cart', {
        product_name: 'Urban Minimalist Blazer',
        size: selectedSize,
        color: selectedColor,
        quantity: quantity,
        value: getProductPrice()
    });
}

// Enhanced mobile experience
function initializeMobileFeatures() {
    if (window.innerWidth <= 768) {
        // Add swipe functionality for product images on mobile
        let startX = 0;
        let currentX = 0;
        let currentImageIndex = 0;
        const images = document.querySelectorAll('.thumbnail');
        
        const mainImage = document.getElementById('mainImage');
        
        mainImage.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        });
        
        mainImage.addEventListener('touchmove', function(e) {
            currentX = e.touches[0].clientX;
        });
        
        mainImage.addEventListener('touchend', function() {
            const diffX = startX - currentX;
            
            if (Math.abs(diffX) > 50) { // Minimum swipe distance
                if (diffX > 0 && currentImageIndex < images.length - 1) {
                    // Swipe left - next image
                    currentImageIndex++;
                } else if (diffX < 0 && currentImageIndex > 0) {
                    // Swipe right - previous image
                    currentImageIndex--;
                }
                
                // Update active thumbnail
                images.forEach((img, index) => {
                    img.classList.toggle('active', index === currentImageIndex);
                });
            }
        });
    }
}

// Initialize mobile features
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileFeatures();
    trackProductView(); // Track that user viewed the product
});

// Error handling for network requests
function handleApiError(error) {
    console.error('API Error:', error);
    showNotification('Something went wrong. Please try again.', 'error');
}

// Accessibility improvements
function initializeAccessibility() {
    // Add ARIA labels and roles
    const quantityControls = document.querySelectorAll('.quantity-btn');
    quantityControls.forEach(btn => {
        btn.setAttribute('role', 'button');
        btn.setAttribute('aria-label', btn.textContent === '+' ? 'Increase quantity' : 'Decrease quantity');
    });
    
    // Add keyboard support for color and size options
    const interactiveElements = document.querySelectorAll('.size-option, .color-option');
    interactiveElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'button');
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', function() {
    initializeAccessibility();
});

// Performance optimization - lazy loading for related products
function initializeLazyLoading() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const relatedSection = entry.target;
                relatedSection.classList.add('loaded');
                observer.unobserve(relatedSection);
            }
        });
    });
    
    const relatedSection = document.querySelector('.related-section');
    if (relatedSection) {
        observer.observe(relatedSection);
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', function() {
    initializeLazyLoading();
});