import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    // Active link handling - exact copy from original main.js
    const setActiveNavLink = () => {
      const sections = document.querySelectorAll('section[id]');
      let scrollY = window.pageYOffset;

      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelectorAll('.nav-link').forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
              link.classList.add('active');
            }
          });

          document.querySelectorAll('.mobile-nav-link').forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
              link.classList.add('active');
            }
          });
        }
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', setActiveNavLink);
    
    // Initial call
    setActiveNavLink();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', setActiveNavLink);
    };
  }, []);

  return (
    <header className="header">
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
            <a href="#hero" className="nav-link">Home</a>
            <a href="#collections" className="nav-link">Collections</a>
            <a href="#about" className="nav-link">Overview</a>
            <a href="#features" className="nav-link">Features</a>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/about" className="nav-link">About us</Link>
            <Link to="/login" className="nav-link">Login / Sign Up</Link>
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
          <a href="#hero" className="mobile-nav-link" onClick={closeMobileMenu}>
            Home
          </a>
          <a href="#collections" className="mobile-nav-link" onClick={closeMobileMenu}>
            Collections
          </a>
          <a href="#about" className="mobile-nav-link" onClick={closeMobileMenu}>
            About
          </a>
          <a href="#features" className="mobile-nav-link" onClick={closeMobileMenu}>
            Features
          </a>
          <Link to="/contact" className="mobile-nav-link" onClick={closeMobileMenu}>
            Contact
          </Link>
          <Link to="/about" className="mobile-nav-link" onClick={closeMobileMenu}>
            About Us
          </Link>
          <Link to="/login" className="mobile-nav-link" onClick={closeMobileMenu}>
            Login / Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;