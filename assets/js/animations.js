document.addEventListener('DOMContentLoaded', function() {
    // Fade in animations on scroll
    // Scroll-triggered fade-in animations
    const animateElements = document.querySelectorAll('.animate-in, .product-card, .feature-card, .testimonial-card');
    // Initialize with initial viewport check
    animateOnScroll();
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    function animateOnScroll() {
      animateElements.forEach(element => {
        if (isElementInViewport(element)) {
          setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          }, 100);
        }
      });
    }
    
   function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
        rect.bottom >= 0
      );
    }
    // Hero section staggered animations
    const heroAnimatedElements = document.querySelectorAll('.hero .animate-in');
    heroAnimatedElements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      }, 300 * (index + 1));
    });
    // hover effects on product card 
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
      });

        
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      });
    });
    
    // Feature card hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      });
    });
    
    // Highlight form inputs on focus
    // Form input focus/blur styles
    const formInputs = document.querySelectorAll('.form-input, .form-textarea, .newsletter-input');
    formInputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.style.outline = 'none';
        input.style.boxShadow = '0 0 0 2px rgba(0, 0, 0, 0.2)';
        input.style.borderColor = 'transparent';
      });
      
   
        input.addEventListener('blur', () => {
        input.style.boxShadow = 'none';
        input.style.borderColor = '#e0e0e0';
      });
    });

    // Button hover animations
    const formButtons = document.querySelectorAll('.form-submit, .newsletter-button');
    formButtons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
      });
    });

    // Instagram image hover effects
    const instagramImages = document.querySelectorAll('.instagram-image');
    instagramImages.forEach(image => {
      image.addEventListener('mouseenter', () => {
        image.style.opacity = '0.8';
        image.style.transform = 'scale(1.03)';
        image.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      });
      
      image.addEventListener('mouseleave', () => {
        image.style.opacity = '1';
        image.style.transform = 'scale(1)';
      });
    });
  });
