import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [showAllCollections, setShowAllCollections] = useState(false);

  useEffect(() => {
    // Hero section staggered animations - exact copy from original animations.js
    const heroAnimatedElements = document.querySelectorAll('.hero .animate-in');
    heroAnimatedElements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      }, 300 * (index + 1));
    });

    // Scroll-triggered animations
    const animateElements = document.querySelectorAll('.animate-in, .product-card, .feature-card, .testimonial-card');
    
    const animateOnScroll = () => {
      animateElements.forEach((element) => {
        if (isElementInViewport(element)) {
          setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          }, 100);
        }
      });
    };

    const isElementInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
        rect.bottom >= 0
      );
    };

    // Initial check
    animateOnScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', animateOnScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  const toggleCollections = () => {
    setShowAllCollections(!showAllCollections);
    if (!showAllCollections) {
      setTimeout(() => {
        document.getElementById('collections').scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const mainCollections = [
    {
      title: "Polos",
      badge: "TRENDING",
      imageUrl: "/assets/images/homepage/polo.avif",
      altText: "Statement Collection",
      link: "/collections/polos"
    },
    {
      title: "Shirts",
      imageUrl: "/assets/images/homepage/shirt.avif",
      altText: "Shirts",
      link: "/collections/shirts"
    },
    {
      title: "Oversized T-Shirts",
      badge: "LIMITED",
      imageUrl: "/assets/images/homepage/oversize.webp",
      altText: "Oversized T-Shirts",
      link: "/collections/oversized"
    }
  ];

  const additionalCollections = [
    {
      title: "Shorts",
      badge: "LIMITED",
      imageUrl: "/assets/images/homepage/shorts.avif",
      altText: "Shorts",
      link: "/collections/shirts"
    },
    {
      title: "Sneakers",
      badge: "NEW",
      imageUrl: "/assets/images/homepage/sneakers.avif",
      altText: "Sneakers",
      link: "/collections/polos"
    },
    {
      title: "All Bottoms",
      badge: "NEW",
      imageUrl: "/assets/images/homepage/allbottom.avif",
      altText: "All Bottoms",
      link: "/collections/shirts"
    }
  ];

  return (
    <div className="home">
      {/* Hero Section - Exact copy from original HTML */}
      <section id="hero" className="hero">
        <div className="container">
          <div className="hero-wrapper">
            <div className="hero-content">
              <h1 className="hero-title animate-in">
                Define Your Style. <br />
                <span>Express Your Vibe.</span>
              </h1>
              <p class="hero-description animate-in">
              Discover cutting-edge fashion designed for the new generation.
              Bold, authentic, and unmistakably you.
            </p>
              <div className="hero-buttons animate-in">
                <a href="#collections" className="btn btn-primary">
                  Shop Collection
                </a>
                <a href="#about" className="btn btn-outline">
                  Learn More
                </a>
              </div>
            </div>
            <div className="hero-image animate-in">
              <img
                src="/assets/images/homepage/hero_image1.png"
                alt="Fashionable Gen Z model wearing OmniCart clothing"
              />
              <div className="hero-badge">
                <div className="hero-badge-dot"></div>
                <p>NEW ARRIVALS WEEKLY</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section - Exact copy from original HTML */}
      <section id="collections" className="collections">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Latest Collections</h2>
            <p className="section-description">
              Explore our newest drops and signature styles, carefully crafted for
              the bold and the authentic.
            </p>
          </div>

          <div className="collections-grid">
            {mainCollections.map((collection, index) => (
              <div key={index} className="product-card">
                <div className="product-image">
                  <img
                    src={collection.imageUrl}
                    alt={collection.altText}
                  />
                  {collection.badge && (
                    <div className="product-badge">{collection.badge}</div>
                  )}
                </div>
                <div className="product-details">
                  <h3 className="product-title">{collection.title}</h3>
                  <div className="product-footer">
                    <Link to={collection.link} className="product-link">
                      Shop Now
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {showAllCollections && additionalCollections.map((collection, index) => (
              <div key={`additional-${index}`} className="product-card addedproduct">
                <div className="product-image">
                  <img
                    src={collection.imageUrl}
                    alt={collection.altText}
                  />
                  {collection.badge && (
                    <div className="product-badge">{collection.badge}</div>
                  )}
                </div>
                <div className="product-details">
                  <h3 className="product-title">{collection.title}</h3>
                  <div className="product-footer">
                    <Link to={collection.link} className="product-link">
                      Shop Now
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="section-footer">
            <button 
              onClick={toggleCollections} 
              className="btn btn-outline-dark"
            >
              {showAllCollections ? 'View Less' : 'View All Collections'}
            </button>
          </div>
        </div>
      </section>

      {/* About Section - Exact copy from original HTML */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-wrapper">
            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                alt="About OmniCart Brand"
              />
            </div>
            <div className="about-content">
              <h2 className="about-title">About OmniCart</h2>
              <p className="about-description">
                Born from a desire to create clothing that resonates with the
                voice of a new generation. We're not just making clothes; we're
                crafting experiences, statements, and identities.
              </p>
              <p className="about-description">
                Our designs blend contemporary street style with sustainable
                practices, ensuring that looking good never comes at the expense
                of our planet. Each piece is crafted with intention, quality, and
                an understanding of what today's generation values.
              </p>
              <p className="about-description">
                Join us in redefining fashion norms and creating a community where
                individual expression is celebrated.
              </p>
              <div className="about-buttons">
                <Link to="/about" className="btn btn-primary">Our Story</Link>
                <a href="#sustainability" className="btn btn-outline">Sustainability</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Exact copy from original HTML */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose OmniCart</h2>
            <p className="section-description">
              Experience fashion that goes beyond trends, focusing on quality,
              sustainability, and personal expression.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="41" height="40" viewBox="0 0 41 40" fill="none">
                  <g clipPath="url(#clip0_4_277)">
                    <path
                      d="M28.6946 28.9479H16.0498"
                      stroke="black"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                    <path
                      d="M36.3939 28.9479H39.0782V20.7976L32.3557 13.8516H26.855V13.8615V28.874"
                      stroke="black"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                    <path
                      d="M39.0782 20.7976H26.8545"
                      stroke="black"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                    <path
                      d="M9.65799 26.1134C11.0906 24.6807 13.4133 24.6807 14.846 26.1134C16.2785 27.5461 16.2785 29.869 14.846 31.3016C13.4133 32.7343 11.0906 32.7343 9.65799 31.3016C8.22533 29.869 8.22533 27.5461 9.65799 26.1134Z"
                      stroke="black"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                    <path
                      d="M30.1057 26.1134C31.5383 24.6807 33.861 24.6807 35.2937 26.1134C36.7263 27.5461 36.7263 29.869 35.2937 31.3016C33.861 32.7343 31.5383 32.7343 30.1057 31.3016C28.6731 29.869 28.6731 27.5461 30.1057 26.1134Z"
                      stroke="black"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                    <path
                      d="M5.12183 7.62381V28.9351H8.4319"
                      stroke="black"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                    <path
                      d="M26.8878 13.8615V7.62378H5.12183"
                      stroke="black"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                    <path
                      d="M13.2528 7.62378H5.12183"
                      stroke="black"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                    <path
                      d="M13.2527 12.3124H3.06274"
                      stroke="black"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                    <path
                      d="M12.3932 17.0009H1.42188"
                      stroke="black"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4_277">
                      <rect
                        width="40"
                        height="40"
                        fill="white"
                        transform="translate(0.25)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h3 className="feature-title">Fast Delivery</h3>
              <p className="feature-description">
                Get your orders delivered quickly and reliably, right to your
                doorstep.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="41" height="40" viewBox="0 0 41 40" fill="none">
                  <g clipPath="url(#clip0_4_290)">
                    <path
                      d="M30.9531 20.75C26.0977 19.3627 22.75 14.9247 22.75 9.87484V4.34375L30.9531 2L39.1562 4.34375V9.87484C39.1562 14.9247 35.8087 19.3627 30.9531 20.75Z"
                      stroke="black"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                    <path
                      d="M27.4375 11.375L29.7812 13.7188L34.4688 9.03125"
                      stroke="black"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                    <path
                      d="M7.75 30H9.75"
                      stroke="black"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                    <path
                      d="M14.75 30H16.75"
                      stroke="black"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                    <path
                      d="M4.75 17H24.75"
                      stroke="black"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                    <path
                      d="M18.25 11H2.75V34H37.75V22.5"
                      stroke="black"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4_290">
                      <rect
                        width="40"
                        height="40"
                        fill="white"
                        transform="translate(0.75)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h3 className="feature-title">Quality Guarantee</h3>
              <p className="feature-description">
                Premium materials and expert craftsmanship ensure exceptional
                durability.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="41" height="41" viewBox="0 0 41 41" fill="none">
                  <g clipPath="url(#clip0_4_302)">
                    <path
                      d="M14.9097 2.74423C16.5097 2.29993 18.1958 2.06251 19.9374 2.06251C30.2928 2.06251 38.6874 10.4572 38.6874 20.8125C38.6874 27.6077 35.0726 33.5587 29.6611 36.8474"
                      stroke="black"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M24.0277 38.6179C22.9047 38.8277 21.7464 38.9375 20.5625 38.9375C10.2071 38.9375 1.8125 30.5428 1.8125 20.1875C1.8125 14.0655 4.74649 8.62867 9.28508 5.20672"
                      stroke="black"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M2.65601 4.16712H9.28515V10.7963"
                      stroke="black"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                    <path
                      d="M36.2815 36.8329H29.6523V30.2037"
                      stroke="black"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                    <path
                      d="M26.5 26.75H14V14.25H26.5V26.75Z"
                      stroke="black"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M20.25 14.25V18.9375"
                      stroke="black"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4_302">
                      <rect
                        width="40"
                        height="40"
                        fill="white"
                        transform="translate(0.25 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h3 className="feature-title">Sustainable Practices</h3>
              <p className="feature-description">
                Eco-friendly materials and ethical manufacturing for a better
                planet.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="41" height="40" viewBox="0 0 41 40" fill="none">
                  <g clipPath="url(#clip0_4_311)">
                    <path
                      d="M11.6875 29.0625C11.6875 30.7884 10.2884 32.1875 8.5625 32.1875C5.1107 32.1875 2.3125 29.3893 2.3125 25.9375V22.8125C2.3125 19.3607 5.1107 16.5625 8.5625 16.5625C10.2884 16.5625 11.6875 17.9616 11.6875 19.6875V29.0625Z"
                      stroke="black"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8.5625 16.5626V10.9375C8.5625 5.75984 12.7598 1.5625 17.9375 1.5625H24.1875C29.3652 1.5625 33.5625 5.75984 33.5625 10.9375"
                      stroke="black"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                    />
                    <path
                      d="M36.0625 16.5625C37.7812 16.5625 39.1875 17.9688 39.1875 19.6875V25.9375C39.1875 27.6562 37.7812 29.0625 36.0625 29.0625H28.607C25.7773 29.0625 23.0634 30.1866 21.0625 32.1875V19.6875C21.0625 17.9688 22.4688 16.5625 24.1875 16.5625H36.0625Z"
                      stroke="black"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                    />
                    <path
                      d="M21.0625 38.4375H13.25C10.6612 38.4375 8.5625 36.3388 8.5625 33.75V32.1875"
                      stroke="black"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                    />
                    <path
                      d="M27.3125 22.8125H32.9375"
                      stroke="black"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4_311">
                      <rect
                        width="40"
                        height="40"
                        fill="white"
                        transform="translate(0.75)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h3 className="feature-title">24/7 Support</h3>
              <p className="feature-description">
                Our dedicated team is always ready to assist you with any
                questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Exact copy from original HTML */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Community Says</h2>
            <p className="section-description">
              Real reviews from real customers who have experienced the OmniCart
              difference.
            </p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-header">
                <img
                  src="https://media.assettype.com/nationalherald%2F2023-06%2F3ad7d478-f749-4461-81c2-65d9158d4f09%2F1246522685.?rect=0%2C0%2C3863%2C2173&auto=format%2Ccompress&fmt=webp&w=576&dpr=1.3"
                  alt="Customer Review"
                  className="testimonial-avatar"
                />
                <div className="testimonial-info">
                  <h4 className="testimonial-author">MODI JI</h4>
                  <div className="testimonial-stars">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="star"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="testimonial-text">
                "Obsessed with my new OmniCart pieces! The quality is amazing and
                they fit perfectly. Will definitely be ordering more soon!"
              </p>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-header">
                <img
                  src="https://bsmedia.business-standard.com/_media/bs/img/article/2024-12/20/full/1734669259-5415.jpg?im=FitAndFill=(826,465)"
                  alt="Customer Review"
                  className="testimonial-avatar"
                />
                <div className="testimonial-info">
                  <h4 className="testimonial-author">R Gandhi</h4>
                  <div className="testimonial-stars">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="star"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="testimonial-text">
                "The Statement Collection is a game-changer. I get compliments
                every time I wear their pieces. Fast shipping too!"
              </p>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-header">
                <img
                  src="https://www.babushahi.com/upload/image/sukhbir-badal-new-ed.jpg"
                  alt="Customer Review"
                  className="testimonial-avatar"
                />
                <div className="testimonial-info">
                  <h4 className="testimonial-author">SHEEROOMANI</h4>
                  <div className="testimonial-stars">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="star"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="testimonial-text">
                "Love that OmniCart prioritizes sustainability. The clothes are
                stylish but I also feel good about my purchase knowing they're
                eco-friendly."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed Section - Exact copy from original HTML */}
      <section className="instagram">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Follow Our Style</h2>
            <p className="section-description">
              Join us on Instagram @OmniCart_style for daily inspiration and first
              looks.
            </p>
          </div>

          <div className="instagram-grid">
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
              alt="Instagram post"
              className="instagram-image"
            />
            <img
              src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=772&q=80"
              alt="Instagram post"
              className="instagram-image"
            />
            <img
              src="https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80"
              alt="Instagram post"
              className="instagram-image"
            />
            <img
              src="https://images.unsplash.com/photo-1485125639709-a60c3a500bf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
              alt="Instagram post"
              className="instagram-image"
            />
            <img
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80"
              alt="Instagram post"
              className="instagram-image"
            />
            <img
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
              alt="Instagram post"
              className="instagram-image"
            />
          </div>

          <div className="instagram-footer">
            <a
              href="https://www.instagram.com/OmniCart/"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-link"
            >
              View Instagram
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Banner Section - Exact copy from original HTML */}
      <section className="cta-banner">
        <div className="container">
          <h2 className="cta-title">Join the OmniCart Community</h2>
          <p className="cta-description">
            Subscribe to our newsletter and be the first to know about new
            collections, exclusive offers, and community events.
          </p>
          <div className="newsletter-container">
            <form className="newsletter-form" onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing to our newsletter!');
              e.target.reset();
            }}>
              <input
                type="email"
                placeholder="Your email address"
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-button">Subscribe</button>
            </form>
            <p className="newsletter-disclaimer">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates from our company.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;