import React from 'react';

const ContactUs = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', padding: '40px' }}>
      <div style={{ maxWidth: '800px', margin: '40px auto', background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', color: '#333' }}>Contact Us</h1>
        <p style={{ lineHeight: '1.6', color: '#555', textAlign: 'center' }}>
          We’d love to hear from you! Whether you have a question about our job portal, feedback, or just want to connect, feel free to reach out.
        </p>
        
        <h2 style={{ color: '#333', marginTop: '20px' }}>Get in Touch</h2>
        
        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="text"
            placeholder="Your Name"
            required
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
          />
          <textarea
            placeholder="Your Message"
            required
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px', minHeight: '100px' }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#5cb85c',
              color: 'white',
              padding: '10px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Send Message
          </button>
        </form>
        
        <h2 style={{ color: '#333', marginTop: '30px' }}>Our Location</h2>
        <p style={{ lineHeight: '1.6', color: '#555', textAlign: 'center' }}>
          123 CareerCrafter Lane, Suite 100<br />
          Job City, ST 12345<br />
          Phone: (123) 456-7890<br />
          Email: contact@careercrafter.com
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <iframe
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.012441929905!2d-122.41941568468126!3d37.77492927975915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809e06e2f6b1%3A0x7c3c3b8b2f1b2f21!2sCareerCrafter!5e0!3m2!1sen!2sus!4v1697651341802!5m2!1sen!2sus"
            style={{ width: '100%', height: '300px', border: '0', borderRadius: '8px' }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
