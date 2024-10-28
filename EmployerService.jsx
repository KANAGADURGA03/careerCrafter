import axios from 'axios';

const API_URL = 'http://localhost:8080/api/employers';

class EmployerService {
    constructor() {
        axios.interceptors.request.use(config => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        });
    }

    getEmployerById(employerId) {
        return axios.get(`${API_URL}/${employerId}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching employer:', error);
                if (error.response) {
                    console.error('Error response:', error.response.data);
                    console.error('Error status:', error.response.status);
                } else {
                    console.error('Error message:', error.message);
                }
                throw error;
            });
    }

    async getJobsForEmployer(employerId) {
        try {
            const response = await axios.get(`${API_URL}/${employerId}/jobs`);
            return response;
        } catch (error) {
            console.error('Error fetching jobs:', error);
            throw error;
        }
    }

    createJobForEmployer = async (employerId, jobData) => {
        try {
            const response = await axios.post(`${API_URL}/${employerId}/jobs`, jobData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log("Job created successfully");
            return response.data;
        } catch (error) {
            console.error('Error creating job:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
                console.error('Error status:', error.response.status);
            } else {
                console.error('Error message:', error.message);
            }
            throw error;
        }
    };

    // updateApplicationStatus(applicationId, status) {
    //     return axios.patch(`${API_URL}/applications/${applicationId}/status?status=${status}`)
    //         .then(response => response.data)
    //         .catch(error => {
    //             console.error('Error updating application status:', error);
    //             throw error;
    //         });
    // }

    updateApplicationStatus = async (applicationId, status) => {
        try {
            const response = await axios.patch(`${API_URL}/applications/${applicationId}/status?status=${status}`);
            console.log(response)
            return response.data; // Return the data directly
        } catch (error) {
            console.error('Error updating application status:', error);
            throw error; // Rethrow the error for handling in the calling function
        }
    };

    // New method to update a job
    updateJob = async (jobId, jobData) => {
        try {
            const response = await axios.put(`${API_URL}/jobs/${jobId}`, jobData);
            console.log("Job updated successfully");
            return response.data; // Return the updated job data
        } catch (error) {
            console.error('Error updating job:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
                console.error('Error status:', error.response.status);
            } else {
                console.error('Error message:', error.message);
            }
            throw error;
        }
    };

    // New method to delete a job
deleteJob = async (jobId) => {
    try {
        const response = await axios.delete(`${API_URL}/jobs/${jobId}`);
        console.log("Job deleted successfully");
        return response.data; // You might not have a response body, but you can handle it if needed
    } catch (error) {
        console.error('Error deleting job:', error);
        if (error.response) {
            console.error('Error response:', error.response.data);
            console.error('Error status:', error.response.status);
        } else {
            console.error('Error message:', error.message);
        }
        throw error;
    }
};
// Example getResume method
async getResume(applicationId) {
    try {
        const response = await axios.get(`${API_URL}/applications/${applicationId}/resume`, {
            responseType: 'blob' // Important for downloading files
        });
        return response.data; // Return the blob data
    } catch (error) {
        console.error('Error downloading resume:', error);
        throw error; // Rethrow for handling in the calling function
    }
}

    
    async getApplicationsForEmployer(employerId) {
        try {
            const response = await axios.get(`${API_URL}/${employerId}/applications`);
            return response;
        } catch (error) {
            console.error('Error fetching applications:', error);
            throw error;
        }
    }
}

export default new EmployerService();
