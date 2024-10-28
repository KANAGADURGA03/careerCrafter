import React, { useEffect, useState } from 'react';
import JobSeekerService from '../services/JobSeekerService';
import { useParams } from 'react-router-dom';

const SavedJobs = () => {
    const { seekerId } = useParams();
    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSavedJobs = async () => {
            setLoading(true);
            try {
                const response = await JobSeekerService.getSavedJobs(seekerId); // Make sure this API is implemented
                setSavedJobs(response);
            } catch (error) {
                console.error('Error fetching saved jobs:', error);
            } finally {
                setLoading(false);
            }
        };

        if (seekerId) {
            fetchSavedJobs();
        }
    }, [seekerId]);

    return (
        <div>
            <h2>Saved Jobs</h2>
            {loading ? (
                <p>Loading saved jobs...</p>
            ) : savedJobs.length > 0 ? (
                <ul>
                    {savedJobs.map((job) => (
                        <li key={job.jobId}>
                            <h4>{job.title}</h4>
                            <p>{job.description}</p>
                            <p><strong>Qualification:</strong> {job.qualification}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No saved jobs found.</p>
            )}
        </div>
    );
};

export default SavedJobs;
