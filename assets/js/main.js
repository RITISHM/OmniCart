const collections = [
  {
    title: "Shorts",
    badge: "LIMITED",
    imageUrl: "assets/images/homepage/shorts.avif",
    altText: "Shorts"
  },{
    title: "Sneakers",
    badge: "NEW",
    imageUrl: "./assets/images/homepage/sneakers.avif",
    altText: "Sneakers"
  },
  {
    title: "All Bottoms",
    badge: "NEW",
    imageUrl: "./assets/images/homepage/allbottom.avif",
    altText: "All Bottoms"
  }
  
  // Add more products as needed
];


document.addEventListener('DOMContentLoaded', function() {
    // Toggle mobile menu visibility on button click
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', function() {
        if (mobileMenu.style.display === 'flex') {
          mobileMenu.style.display = 'none';
        } else {
          mobileMenu.style.display = 'flex';
        }
      });
    }


    // Close mobile menu while clicking on any menu's item
    const mobileMenuItems = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
    mobileMenuItems.forEach(item => {
      item.addEventListener('click', function() {
        mobileMenu.style.display = 'none';
      });
    });

    
    // Implement smooth scrolling for navigation links

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });


    // Handle contact form and newsletter form submissions with success messages too 
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
      });
    }


    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
      });
    }
    
    // Adjust mobile menu visibility on window resize
    function handleResize() {
      const windowWidth = window.innerWidth;
      
      // Reset mobile menu display on window resize
      if (windowWidth >= 768 && mobileMenu) {
        mobileMenu.style.display = 'none';
      }
    }

    
    // Initial call
    handleResize();
    // Listen for window resize
    window.addEventListener('resize', handleResize);
    
    // Add active class to current nav link
    // Highlight the current active navigation link as user scrolls
    function setActiveNavLink() {
      const sections = document.querySelectorAll('section[id]');
      let scrollY = window.pageYOffset;
      
      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
              link.classList.add('active');
            }
          });
            
          // // Loop through all mobile navigation links
          document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
              link.classList.add('active');  // Add 'active' class to the link corresponding to the current section
            }
          });
        }
      });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
  });


  
//collection button
  const button = document.getElementById('Collectionbtn');
  let isVisible = false; // Tracks whether products are currently shown

button.addEventListener('click', () => {
  const collectionGrid = document.querySelector('.collections-grid');

  

  if (isVisible) {
    const children = collectionGrid.children;

    const nodesToRemove = Array.from(children).slice(3);
    nodesToRemove.forEach(node => node.remove());
    document.getElementById("collections").scrollIntoView({ behavior: 'smooth' });
    button.innerHTML = 'View All Categories';
    console.log('Product cards removed.');
  } 
  
  else {
    // 🟢 Inject product cards
    collections.forEach(collection => {
      const productCard = `
        <div class="product-card addedproduct">
          <div class="product-image">
            <img src="${collection.imageUrl}" alt="${collection.altText}" />
            <div class="product-badge">${collection.badge}</div>
          </div>
          <div class="product-details">
            <h3 class="product-title">${collection.title}</h3>
            <div class="product-footer">
             <a href="product-grid.html" class="product-link">
                Shop Now
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      `;
      collectionGrid.insertAdjacentHTML('beforeend', productCard);
    });
    button.innerHTML = 'View Less';

    console.log('Product cards injected.');
  }

  // 🔁 Flip the toggle state
  isVisible = !isVisible;
});
  
  