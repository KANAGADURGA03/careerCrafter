import React, { useState, useEffect, useRef } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Registration.css'; // Import CSS
import { Link } from 'react-router-dom';

import { Navigate } from 'react-router-dom';
import AuthService from '../services/AuthService';


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Email regex

const Registration = () => {
    const userNameRef = useRef();
    const errorRef = useRef();
    
    // State variables for form inputs
    const [userType, setUserType] = useState('EMPLOYER');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [qualification, setQualification] = useState('');
    const [companyName, setCompanyName] = useState('');
    
    // Validation states
    const [validName, setValidName] = useState(false);
    const [validEmail, setValidEmail] = useState(false); // State for email validation
    const [validPassword, setValidPassword] = useState(false);
    const [validMatch, setValidMatch] = useState(false);
    const [userNameFocus, setUserNameFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false); // State for email focus
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userNameRef.current.focus();
    }, []);

    // Validate name
    useEffect(() => {
        setValidName(USER_REGEX.test(name));
    }, [name]);

    // Validate email
    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    // Validate password and check if confirm password matches
    useEffect(() => {
        const isPasswordValid = PWD_REGEX.test(password);
        setValidPassword(isPasswordValid);
        setValidMatch(password === confirmPassword);
    }, [password, confirmPassword]);

    const handleRegister = async (e) => {
        e.preventDefault();
        const userRegistrationObj = {
            name,
            email,
            password,
            phoneNumber,
            userType,
            ...(userType === 'JOB_SEEKER' ? { qualification } : { companyName })
        };
    
        try {
            const response = await AuthService.registerUser(userRegistrationObj);
            console.log("Registration Successful:", response.data);
            setSuccess(true);
        } catch (error) {
            console.error("Registration error:", error);
            setError("Registration failed: " + (error.response ? error.response.data.message : "Please try again."));
        }
    };
    
    // Redirect to login page if registration is successful
    if (success) {
        return <Navigate to="/" />;
    }

    return (
        <div id="background">
            <h2 style={{ position: "absolute", top: "20px", right: "20px", color: "white" }}>
                CareerCrafter - Find the job that suits you!
            </h2>
            <h2 style={{ color: "white" }}>CareerCrafter</h2>
            <section>
                <p ref={errorRef} className={error ? 'errmsg' : 'offscreen'}>{error}</p>
                
                <h1>Register</h1>
                <form onSubmit={handleRegister}>
                    
                    {/* NAME */}
                    <label htmlFor="name">Name
                        <FontAwesomeIcon icon={faCheck} className={validName ? 'valid' : 'hide'} />
                        <FontAwesomeIcon icon={faTimes} className={!validName && name ? 'invalid' : 'hide'} />
                    </label>
                    <input
                        type="text"
                        id="name"
                        ref={userNameRef}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby='uidnote'
                        onFocus={() => setUserNameFocus(true)}
                        onBlur={() => setUserNameFocus(false)}
                    />
                    <p id='uidnote' className={userNameFocus && name && !validName ? 'instructions' : 'offscreen'}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 chars<br />
                        Must begin with a letter<br />
                        Letters, numbers, underscores, hyphens allowed
                    </p>

                    {/* EMAIL */}
                    <label htmlFor="email">Email
                        <FontAwesomeIcon icon={faCheck} className={validEmail ? 'valid' : 'hide'} />
                        <FontAwesomeIcon icon={faTimes} className={!validEmail && email ? 'invalid' : 'hide'} />
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby='emailnote'
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                    <p id='emailnote' className={emailFocus && email && !validEmail ? 'instructions' : 'offscreen'}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Please enter a valid email (e.g., kabs@gmail.com).
                    </p>

                    {/* PASSWORD */}
                    <label htmlFor="password">Password
                        <FontAwesomeIcon icon={faCheck} className={validPassword ? 'valid' : 'hide'} />
                        <FontAwesomeIcon icon={faTimes} className={!validPassword && password ? 'invalid' : 'hide'} />
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        aria-invalid={validPassword ? "false" : "true"}
                        aria-describedby='pwdnote'
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                    />
                    <p id='pwdnote' className={passwordFocus && password && !validPassword ? 'instructions' : 'offscreen'}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number, and a special character.<br />
                        Allowed special characters: !@#$%
                    </p>

                    {/* CONFIRM PASSWORD */}
                    <label htmlFor="confirmPassword">Confirm Password
                        <FontAwesomeIcon icon={faCheck} className={validMatch && confirmPassword ? 'valid' : 'hide'} />
                        <FontAwesomeIcon icon={faTimes} className={!validMatch && confirmPassword ? 'invalid' : 'hide'} />
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby='confirmPwdnote'
                        onFocus={() => setConfirmPasswordFocus(true)}
                        onBlur={() => setConfirmPasswordFocus(false)}
                    />
                    <p id='confirmPwdnote' className={confirmPasswordFocus && confirmPassword && !validMatch ? 'instructions' : 'offscreen'}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Passwords must match.
                    </p>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />

                    {/* USER TYPE */}
                    <label htmlFor="userType">Role</label>
                    <select id="userType" value={userType} onChange={(e) => setUserType(e.target.value)}>
                        <option value="EMPLOYER">Employer</option>
                        <option value="JOB_SEEKER">Job Seeker</option>
                    </select>

                    {/* Conditional fields based on role */}
                    {userType === 'EMPLOYER' ? (
                        <>
                            <label htmlFor="companyName">Company Name</label>
                            <input
                                type="text"
                                id="companyName"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                required
                            />
                        </>
                    ) : (
                        <>
                            <label htmlFor="qualification">Qualification</label>
                            <input
                                type="text"
                                id="qualification"
                                value={qualification}
                                onChange={(e) => setQualification(e.target.value)}
                                required
                            />
                        </>
                    )}

                    <button type="submit" disabled={!validName || !validEmail || !validPassword || !validMatch}>
                        Register
                    </button>
                    {/* Add the hyperlink here */}
                    <p style={{ textAlign: 'center', marginTop: '10px' }}>
                        <Link to="/" style={{ color: 'purple', textDecoration: 'underline' }}>
                            I already have an account
                        </Link>
                    </p>
                </form>
            </section>
        </div>
    );
};

export default Registration;
