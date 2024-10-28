import axios from "axios";

const BASE_URL = "http://localhost:8080/auth";

class AuthService {
    // Register a new user (Employer or Job Seeker)
    async registerUser(userObject) {
        try {
            const response = await axios.post(`${BASE_URL}/signup`, userObject, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data; // Return response data
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                console.error('Registration failed with response:', error.response);
            } else if (error.request) {
                // Request was made but no response received
                console.error('No response received for registration:', error.request);
            } else {
                // Something else happened while making the request
                console.error('Error during registration:', error.message);
            }
            throw error; // Rethrow or handle it as needed
        }
    }

    // Login a user (Employer or Job Seeker)
    async loginUser(loginData) {
        try {
            const response = await axios.post(`${BASE_URL}/login`, loginData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data; // Return response data (e.g., token, IDs)
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                console.error('Login failed with response:', error.response);
            } else if (error.request) {
                // Request was made but no response received
                console.error('No response received for login:', error.request);
            } else {
                // Something else happened while making the request
                console.error('Error during login:', error.message);
            }
            throw error; // Rethrow or handle it as needed
        }
    }
}

export default new AuthService();
