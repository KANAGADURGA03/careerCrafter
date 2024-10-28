import axios from 'axios';

const API_URL = 'http://localhost:8080/api/job-seekers';

class JobSeekerService {
    constructor() {
        // Axios interceptor to set Authorization header for all requests
        axios.interceptors.request.use(config => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        });
    }

    // Fetch all job listings
    getJobListings() {
        return axios.get(`${API_URL}/jobs`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching job listings:', error);
                throw error;
            });
    }

    // Fetch job details by job ID
    getJobDetails(jobId) {
        return axios.get(`${API_URL}/jobs/${jobId}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching job details:', error);
                throw error;
            });
    }

    // Apply for a job
    applyForJob(jobSeekerId, jobId, applicationData) {
        return axios.post(`${API_URL}/${jobSeekerId}/apply/${jobId}`, applicationData)
            .then(response => response.data)
            .catch(error => {
                console.error('Error applying for job:', error);
                throw error;
            });
    }

    // Fetch all applications for a specific job seeker
    getApplicationsForJobSeeker(jobSeekerId) {
        return axios.get(`${API_URL}/${jobSeekerId}/applications`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching applications:', error);
                throw error;
            });
    }

    // Create a new job seeker
    createJobSeeker(jobSeekerData) {
        return axios.post(API_URL, jobSeekerData)
            .then(response => response.data)
            .catch(error => {
                console.error('Error creating job seeker:', error);
                throw error;
            });
    }

    // Update an existing job seeker
    updateJobSeeker(jobSeekerId, jobSeekerData) {
        return axios.put(`${API_URL}/${jobSeekerId}`, jobSeekerData)
            .then(response => response.data)
            .catch(error => {
                console.error('Error updating job seeker:', error);
                throw error;
            });
    }

    // Delete an existing job seeker
    deleteJobSeeker(jobSeekerId) {
        return axios.delete(`${API_URL}/${jobSeekerId}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error deleting job seeker:', error);
                throw error;
            });
    }

    // Add these methods in your JobSeekerService class

// Save a job for a specific job seeker
saveJob(jobSeekerId, jobId) {
    return axios.post(`${API_URL}/${jobSeekerId}/savedJobs`, { jobId })
        .then(response => response.data)
        .catch(error => {
            console.error('Error saving job:', error);
            throw error;
        });
}

// Fetch saved jobs for a specific job seeker
getSavedJobs(jobSeekerId) {
    return axios.get(`${API_URL}/${jobSeekerId}/savedJobs`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching saved jobs:', error);
            throw error;
        });
}
//end

    // Fetch job seeker by ID
    getJobSeekerById(jobSeekerId) {
        return axios.get(`${API_URL}/${jobSeekerId}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching job seeker:', error);
                throw error;
            });
    }

    // In JobSeekerService.js
updateJobSeeker(seekerId, updatedProfile) {
    return axios.put(`/api/job-seekers/${seekerId}`, updatedProfile)
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
}

}

export default new JobSeekerService();
