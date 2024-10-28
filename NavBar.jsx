import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './NavBar.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faUser } from '@fortawesome/free-solid-svg-icons'; 
import { useAuth } from '../Context/AuthProvider';
import logo from './images/log.png'; 

const NavbarComponent = ({ role }) => {
    const { logout } = useAuth(); 
    const navigate = useNavigate(); 
    const employerId = localStorage.getItem('employerId');
    const seekerId = localStorage.getItem('seekerId');

    // Handle logout
    const handleLogout = () => {
        logout(); 
        setTimeout(() => {
            navigate('/');
        }, 100);
    };

    return (
        <>
            <header className="header">
                <h2 className="brand">
                    <img src={logo} alt="CareerCrafter Logo" className="logo" /> 
                    CareerCrafter
                </h2>

                <nav className="navbar">
                    {/* Conditional Home Link based on Role */}
                    {role === 'jobSeeker' ? (
                        <Link to={`/jobseeker-home/${seekerId}`}>Home</Link>
                    ) : (
                        <Link to={`/employer-home/${employerId}`}>Home</Link>
                    )}

                    {/* Conditional Links based on Role */}
                    {role === 'jobSeeker' ? (
                        <>
                            {/* <Link to={`/jobseeker-home/${seekerId}`}>Saved</Link> */}
                            <Link to={`/job-seeker/${seekerId}/status`}>Status</Link>
                        </>
                    ) : (
                        <>
                            <Link to={`/post-job/${employerId}`}>Post Jobs</Link>
                            <Link to={`/application-from-jobseeker/${employerId}`}>Applications</Link>
                        </>
                    )}

                    {/* Dropdown Menu */}
                    <div className="dropdown">
                        <button className="dropbtn">
                            <FontAwesomeIcon icon={faUser} className="profile-icon" /> 
                            Profile
                        </button>
                        <div className="dropdown-content">
                            <Link to="/about">About</Link>
                            <Link to="/contact">Contact Us</Link>
                            <Link to="#" onClick={handleLogout}>Logout</Link>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; {new Date().getFullYear()} CareerCrafter. All rights reserved.</p>
                    <div className="footer-links">
                        <Link to="/privacy-policy">Privacy Policy</Link>
                        <Link to="/terms-of-service">Terms of Service</Link>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default NavbarComponent;
