import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import profileImage from './images/profile.png';
import JobSeekerService from '../services/JobSeekerService';
import './JobSeekerHome.css'; // Import the CSS file

const JobSeekerHome = () => {
    const { seekerId } = useParams();
    const [jobSeeker, setJobSeeker] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobSeekerData = async () => {
            setLoading(true);
            try {
                const seekerResponse = await JobSeekerService.getJobSeekerById(seekerId);
                console.log('Job Seeker Response:', seekerResponse);
                setJobSeeker(seekerResponse);

                const jobsResponse = await JobSeekerService.getJobListings();
                console.log('Jobs Response:', jobsResponse); 
                setJobs(jobsResponse);
                setFilteredJobs(jobsResponse);
            } catch (error) {
                console.error('Error fetching job seeker or jobs data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (seekerId) {
            fetchJobSeekerData();
        }
    }, [seekerId]);

    const handleApply = (jobId, employerId) => {
        navigate(`/apply-for-job/${seekerId}/${jobId}`, { state: { employerId } });
    };

    const handleSave = async (jobId) => {
        try {
            const job = jobs.find(j => j.jobId === jobId);
            if (!job.employerId) {
                alert('Employer ID is missing. Unable to save this job.');
                return;
            }
            await JobSeekerService.saveJob(seekerId, jobId);
            alert('Job saved successfully!');
            
            // Navigate back to JobSeeker home page
            navigate(`/jobseeker-home/${seekerId}`);
        } catch (error) {
            console.error('Error saving job:', error);
            alert('Failed to save job.');
        }
    };
    

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        const searchQuery = event.target.value.toLowerCase();
        const filtered = jobs.filter(
            (job) => 
                job.title.toLowerCase().includes(searchQuery) ||
                job.description.toLowerCase().includes(searchQuery) ||
                job.qualification.toLowerCase().includes(searchQuery)
        );
        setFilteredJobs(filtered);
    };

    // const handleSave = async (jobId) => {
    //     try {
    //         const job = jobs.find(j => j.jobId === jobId);
    //         if (!job.employerId) {
    //             alert('Employer ID is missing. Unable to save this job.');
    //             return;
    //         }
    //         await JobSeekerService.saveJob(seekerId, jobId);
    //         alert('Job saved successfully!');
    //     } catch (error) {
    //         console.error('Error saving job:', error);
    //         alert('Failed to save job.');
    //     }
    // };
    

    return (
        <div className="job-seeker-home-container">
            <div className="profile-card">
                {loading ? (
                    <p>Loading job seeker profile...</p>
                ) : jobSeeker ? (
                    <>
                        <img 
                            src={profileImage} 
                            alt="Job Seeker Profile" 
                            className="job-seeker-profile-img"
                        />
                        <h2>{jobSeeker.name}</h2>
                        <p>Job Seeker ID: {jobSeeker.seekerId}</p>
                        <p>Qualification: {jobSeeker.qualification}</p>
                    </>
                ) : (
                    <p>Job seeker not found.</p>
                )}
            </div>

            <div className="job-listings-section">
                {/* Search Bar */}
                <div className="search-bar-container">
                    <input 
                        type="text" 
                        placeholder="Search for jobs..." 
                        value={searchTerm} 
                        onChange={handleSearchChange} 
                        className="search-bar-input"
                    />
                    <span className="search-icon">🔍</span>
                </div>

                {/* Job Listings Section */}
                <h3>Job Listings</h3>
                {loading ? (
                    <p>Loading jobs...</p>
                ) : filteredJobs.length > 0 ? (
                    <div>
                        {filteredJobs.map((job) => (
                            <div key={job.jobId} className="job-card">
                                <h4>{job.title}</h4>
                                <p><strong>Description:</strong> {job.description}</p>
                                <p><strong>Qualification:</strong> {job.qualification}</p>
                                <button 
                                    onClick={() => {
                                        if (job.employerId) {
                                            handleApply(job.jobId, job.employerId);
                                        } else {
                                            console.warn('employerId is missing in job object:', job);
                                        }
                                    }}
                                    className="apply-button"
                                >
                                    Apply
                                </button>
                                {/* <button 
                                    onClick={() => handleSave(job.jobId)}
                                    className="save-button"
                                >
                                    Save
                                </button> */}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No jobs available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default JobSeekerHome;
