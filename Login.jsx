import React, { useState, useContext } from "react";

import { useNavigate, useLocation, Link } from "react-router-dom";
import './Login.css';
import { AuthContext } from "../Context/AuthProvider";
import AuthService from "../services/AuthService";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("JOB_SEEKER");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Loading state
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    // Moved handleSubmit inside the component function
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
      
        const loginData = { email, password, userType };
    
        try {
            const response = await AuthService.loginUser(loginData);
            const { accessToken, employerId, seekerId } = response;
    
            // Store token and IDs in localStorage
            localStorage.setItem("accessToken", accessToken);
            if (employerId) {
                localStorage.setItem("employerId", employerId);
                localStorage.setItem("role", "employer"); // Store role
            }
            if (seekerId) {
                localStorage.setItem("seekerId", seekerId);
                localStorage.setItem("role", "jobSeeker"); // Store role
            }
    
            // Set auth context
            setAuth({
                email,
                accessToken,
                userType,
            });
    
            // Redirect based on userType
            if (userType === "EMPLOYER" && employerId) {
                navigate(`/employer-home/${employerId}`);
            } else if (userType === "JOB_SEEKER" && seekerId) {
                navigate(`/jobseeker-home/${seekerId}`);
            } else {
                navigate(from, { replace: true });
            }
    
            // Clear the input fields (optional)
            setEmail("");
            setPassword("");
        } catch (err) {
            setError("Login failed. Please check your credentials.");
        } finally {
            setLoading(false); // Reset loading state
        }
    };
    
    
    
    return (
        <div id="login-background">
            <h2 style={{ position: "absolute", top: "20px", left: "20px", color: "grey" }}>
                CareerCrafter - Find the job that suits you!
            </h2>
            <section className="login-section">
                <h2>Login</h2>
                {error && <div className="errmsg">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <label>Username (Email)</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <label>Role</label>
                    <select
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                    >
                        <option value="JOB_SEEKER">Job Seeker</option>
                        <option value="EMPLOYER">Employer</option>
                    </select>

                    <button type="submit">Login</button>
                </form>
                <div style={{ marginTop: "10px", textAlign: "center" }}>
                    <p>New user? <Link to="/register">Register</Link></p>
                </div>
            </section>
        </div>
    );
};

export default Login;
