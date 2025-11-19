import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status
    const loggedIn = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(!!loggedIn);
    
    // Update cart count
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.length);
    };
    
    updateCartCount();
    
    // Listen for storage changes
    window.addEventListener('storage', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSectionClick = (sectionId) => {
    closeMobileMenu();
    
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      // Already on home page, just scroll
      scrollToSection(sectionId);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    // Scroll effect for header
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Active link handling only on home page
      if (location.pathname === '/') {
        const sections = document.querySelectorAll('section[id]');
        let scrollY = window.pageYOffset;

        sections.forEach((current) => {
          const sectionHeight = current.offsetHeight;
          const sectionTop = current.offsetTop - 100;
          const sectionId = current.getAttribute('id');

          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach((link) => {
              link.classList.remove('active');
              if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
              }
            });

            document.querySelectorAll('.mobile-nav-link').forEach((link) => {
              link.classList.remove('active');
              if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
              }
            });
          }
        });
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  // Handle scroll on navigation with state
  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        scrollToSection(location.state.scrollTo);
      }, 100);
    }
  }, [location]);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-wrapper">
          <Link to="/" className="logo">
            <span>OmniCart</span>
            <img
              src="/assets/images/homepage/google-gemini-icon.png"
              alt="logo"
              className="logo-icon"
            />
          </Link>

          <nav className="desktop-nav">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              onClick={() => {
                if (location.pathname === '/') {
                  scrollToSection('#hero');
                }
              }}
            >
              Home
            </Link>
            <Link 
              to="/" 
              className="nav-link"
              data-section="collections"
              onClick={(e) => {
                e.preventDefault();
                handleSectionClick('#collections');
              }}
            >
              Collections
            </Link>
            <Link 
              to="/" 
              className="nav-link"
              data-section="about"
              onClick={(e) => {
                e.preventDefault();
                handleSectionClick('#about');
              }}
            >
              Overview
            </Link>
            <Link 
              to="/" 
              className="nav-link"
              data-section="features"
              onClick={(e) => {
                e.preventDefault();
                handleSectionClick('#features');
              }}
            >
              Features
            </Link>
            <Link 
              to="/contact" 
              className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
            >
              Contact
            </Link>
            <Link 
              to="/about" 
              className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
            >
              About
            </Link>
            <div className="nav-divider"></div>
            <Link 
              to="/cart" 
              className={`nav-link cart-link ${location.pathname === '/cart' ? 'active' : ''}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
            {isLoggedIn ? (
              <Link 
                to="/profile" 
                className={`nav-link nav-link-signup ${location.pathname === '/profile' ? 'active' : ''}`}
              >
                Profile
              </Link>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`nav-link nav-link-auth ${location.pathname === '/login' ? 'active' : ''}`}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className={`nav-link nav-link-signup ${location.pathname === '/signup' ? 'active' : ''}`}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          <button
            id="mobile-menu-button"
            type="button"
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <div 
          id="mobile-menu"
          className="mobile-menu" 
          style={{ display: isMobileMenuOpen ? 'flex' : 'none' }}
        >
          <Link 
            to="/" 
            className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={() => {
              if (location.pathname === '/') {
                scrollToSection('#hero');
              }
              closeMobileMenu();
            }}
          >
            Home
          </Link>
          <Link 
            to="/" 
            className="mobile-nav-link"
            data-section="collections"
            onClick={(e) => {
              e.preventDefault();
              handleSectionClick('#collections');
            }}
          >
            Collections
          </Link>
          <Link 
            to="/" 
            className="mobile-nav-link"
            data-section="about"
            onClick={(e) => {
              e.preventDefault();
              handleSectionClick('#about');
            }}
          >
            Overview
          </Link>
          <Link 
            to="/" 
            className="mobile-nav-link"
            data-section="features"
            onClick={(e) => {
              e.preventDefault();
              handleSectionClick('#features');
            }}
          >
            Features
          </Link>
          <Link 
            to="/contact" 
            className={`mobile-nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Contact
          </Link>
          <Link 
            to="/about" 
            className={`mobile-nav-link ${location.pathname === '/about' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            About
          </Link>
          <Link 
            to="/cart" 
            className={`mobile-nav-link ${location.pathname === '/cart' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Cart {cartCount > 0 && `(${cartCount})`}
          </Link>
          {isLoggedIn ? (
            <Link 
              to="/profile" 
              className={`mobile-nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Profile
            </Link>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`mobile-nav-link ${location.pathname === '/login' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className={`mobile-nav-link ${location.pathname === '/signup' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;