import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-hero">
          <h1>Contact Us</h1>
          <p>Get in touch with our team</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            
            <div className="contact-details">
              <div className="contact-item">
                <strong>Email:</strong> hello@omnicart.com
              </div>
              <div className="contact-item">
                <strong>Phone:</strong> +1 (555) 123-4567
              </div>
              <div className="contact-item">
                <strong>Address:</strong> 123 Fashion Street, Style City, SC 12345
              </div>
            </div>
          </div>
          
          <div className="contact-form">
            <h2>Send Message</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;