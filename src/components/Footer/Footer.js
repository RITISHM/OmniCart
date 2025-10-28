import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-section">
              <h3 className="footer-title">OmniCart</h3>
              <p className="footer-description">
                Defining style for the new generation. Bold, authentic, and unmistakably you.
              </p>
            </div>
            
            <div className="footer-section">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/collections/shirts">Collections</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4 className="footer-heading">Collections</h4>
              <ul className="footer-links">
                <li><Link to="/collections/shirts">Shirts</Link></li>
                <li><Link to="/collections/polos">Polos</Link></li>
                <li><Link to="/collections/oversized">Oversized</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4 className="footer-heading">Support</h4>
              <ul className="footer-links">
                <li><a href="#help">Help Center</a></li>
                <li><a href="#shipping">Shipping Info</a></li>
                <li><a href="#returns">Returns</a></li>
                <li><a href="#size-guide">Size Guide</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-legal">
              <p>&copy; 2024 OmniCart. All rights reserved.</p>
              <div className="footer-legal-links">
                <a href="#privacy">Privacy Policy</a>
                <a href="#terms">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;