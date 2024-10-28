import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JobSeekerService from '../services/JobSeekerService';
import './JobSeekerSaved.css'; // Optional CSS for styling

const JobSeekerSaved = () => {
    const { seekerId } = useParams();
    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSavedJobs = async () => {
            setLoading(true);
            try {
                const savedJobsData = await JobSeekerService.getSavedJobs(seekerId);
                setSavedJobs(savedJobsData);
                setError(null);
            } catch (error) {
                console.error('Error fetching saved jobs:', error);
                setError('Failed to load saved jobs. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (seekerId) {
            fetchSavedJobs();
        }
    }, [seekerId]);

    return (
        <div className="saved-jobs-container">
            <h2>Saved Jobs</h2>
            {loading ? (
                <p>Loading saved jobs...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : savedJobs.length > 0 ? (
                savedJobs.map(job => (
                    <div key={job.jobId} className="job-card">
                        <h4>{job.title}</h4>
                        <p><strong>Description:</strong> {job.description}</p>
                        <p><strong>Qualification:</strong> {job.qualification}</p>
                    </div>
                ))
            ) : (
                <p>No saved jobs found.</p>
            )}
        </div>
    );
};

export default JobSeekerSaved;
