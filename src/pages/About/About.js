import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-hero">
          <h1>About OmniCart</h1>
          <p>Defining style for the new generation</p>
        </div>
        
        <div className="about-content">
          <div className="about-section">
            <h2>Our Story</h2>
            <p>
              Born from a desire to create clothing that resonates with the voice of a new generation. 
              We're not just making clothes; we're crafting experiences, statements, and identities.
            </p>
            <p>
              Our designs blend contemporary street style with sustainable practices, ensuring that 
              looking good never comes at the expense of our planet. Each piece is crafted with 
              intention, quality, and an understanding of what today's generation values.
            </p>
          </div>
          
          <div className="about-section">
            <h2>Our Mission</h2>
            <p>
              Join us in redefining fashion norms and creating a community where individual 
              expression is celebrated. We believe that fashion should be bold, authentic, 
              and unmistakably you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;