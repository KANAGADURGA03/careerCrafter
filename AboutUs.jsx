import React from 'react';

const AboutUs = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', padding: '40px' }}>
      <div style={{ maxWidth: '800px', margin: '40px auto', background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', color: '#333' }}>About Us</h1>
        <p style={{ lineHeight: '1.6', color: '#555' }}>
          Welcome to CareerCrafter, your one-stop solution for finding the perfect job. We understand the challenges faced by job seekers in today's competitive market, and our mission is to connect talented individuals with opportunities that match their skills and aspirations.
        </p>
        <h2 style={{ color: '#333' }}>Our Mission</h2>
        <p style={{ lineHeight: '1.6', color: '#555' }}>
          Our mission is to empower job seekers by providing a user-friendly platform where they can easily find and apply for jobs that suit their qualifications and interests. We believe that everyone deserves a chance to succeed, and we are committed to making the job search process as seamless as possible.
        </p>
        <h2 style={{ color: '#333' }}>Our Team</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '250px', margin: '10px', textAlign: 'center', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#fff' }}>
            <h3 style={{ color: '#5cb85c' }}>John Doe</h3>
            <p style={{ color: '#555' }}>Founder & CEO</p>
            <p style={{ color: '#777' }}>Passionate about helping job seekers connect with their dream jobs.</p>
          </div>
          <div style={{ maxWidth: '250px', margin: '10px', textAlign: 'center', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#fff' }}>
            <h3 style={{ color: '#5cb85c' }}>Jane Smith</h3>
            <p style={{ color: '#555' }}>Chief Operations Officer</p>
            <p style={{ color: '#777' }}>Ensuring a smooth and efficient operation of the portal.</p>
          </div>
          <div style={{ maxWidth: '250px', margin: '10px', textAlign: 'center', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#fff' }}>
            <h3 style={{ color: '#5cb85c' }}>Mike Johnson</h3>
            <p style={{ color: '#555' }}>Head of Technology</p>
            <p style={{ color: '#777' }}>Leading the tech team to enhance the user experience on our platform.</p>
          </div>
        </div>
        <h2 style={{ color: '#333' }}>Join Us</h2>
        <p style={{ lineHeight: '1.6', color: '#555' }}>
          Join us on this exciting journey! Whether you're looking for your first job or seeking a career change, CareerCrafter is here to support you every step of the way.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
