import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import profileImage from './images/profile.png'; // Import the profile image
import EmployerService from '../services/EmployerService';
import './EmployerHome.css'; // Ensure to import your CSS file

const EmployerHome = () => {
    const { employerId } = useParams();
    const navigate = useNavigate(); // Use navigate for redirecting
    const [employer, setEmployer] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false); // State to toggle editing mode
    const [updatedEmployer, setUpdatedEmployer] = useState({
        name: '',
        companyName: '',
        email: '',
    });
    const [selectedJob, setSelectedJob] = useState(null); // State for the job to be edited
    const [updatedJob, setUpdatedJob] = useState({
        title: '',
        description: '',
        qualification: '',
    });

    useEffect(() => {
        const fetchEmployerData = async () => {
            setLoading(true);
            try {
                const employerResponse = await EmployerService.getEmployerById(employerId);
                setEmployer(employerResponse);
                setUpdatedEmployer({
                    name: employerResponse.name,
                    companyName: employerResponse.companyName,
                    email: employerResponse.email,
                });

                // Fetch the jobs for this employer
                const applicationsResponse = await EmployerService.getJobsForEmployer(employerId);
                setApplications(applicationsResponse.data);
            } catch (error) {
                console.error('Error fetching employer data or jobs:', error);
            } finally {
                setLoading(false);
            }
        };

        if (employerId) {
            fetchEmployerData();
        }
    }, [employerId]);

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdatedEmployer({ ...updatedEmployer, [name]: value });
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            await EmployerService.updateEmployer(employerId, updatedEmployer);
            alert('Employer updated successfully!');
            setEmployer(updatedEmployer); // Update local state
            setIsEditing(false); // Exit editing mode
        } catch (error) {
            console.error('Error updating employer:', error);
            alert('Failed to update employer.');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this employer profile?')) {
            try {
                await EmployerService.deleteEmployer(employerId);
                alert('Employer deleted successfully!');
                navigate('/'); // Redirect to a different page (e.g., home)
            } catch (error) {
                console.error('Error deleting employer:', error);
                alert('Failed to delete employer.');
            }
        }
    };

    const handleJobUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdatedJob({ ...updatedJob, [name]: value });
    };

    const handleJobUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedJobData = {
                title: updatedJob.title,
                description: updatedJob.description,
                qualification: updatedJob.qualification,
            };
            const updatedJobResponse = await EmployerService.updateJob(selectedJob.jobId, updatedJobData);
            alert('Job updated successfully!');
            // Update the local applications state with the updated job
            setApplications(applications.map(job => (job.jobId === selectedJob.jobId ? updatedJobResponse : job)));
            setSelectedJob(null); // Exit editing mode
        } catch (error) {
            console.error('Error updating job:', error);
            alert('Failed to update job.');
        }
    };

    const handleJobDelete = async (jobId) => {
        if (window.confirm('Are you sure you want to delete this job posting?')) {
            try {
                await EmployerService.deleteJob(jobId);
                alert('Job deleted successfully!');
                setApplications(applications.filter(job => job.jobId !== jobId)); // Update local state to remove deleted job
            } catch (error) {
                console.error('Error deleting job:', error);
                alert('Failed to delete job.');
            }
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '200px' }}>
            {/* Employer Profile Card */}
            <div className="profile-card">
                {loading ? (
                    <p>Loading employer profile...</p>
                ) : employer ? (
                    <>
                        <img
                            src={profileImage}
                            alt="Employer Profile"
                            style={{
                                width: '90px',
                                height: '80px',
                                borderRadius: '40%',
                                marginBottom: '20px'
                            }}
                        />
                        <h2>{employer.name}</h2>
                        <p>Employer ID: {employer.id}</p>
                        <p>Company: {employer.companyName}</p>
                        <p>Email: {employer.email}</p>
                    </>
                ) : (
                    <p>Employer not found.</p>
                )}
            </div>

            {/* Jobs Section */}
            <div style={{ flex: '1', paddingLeft: '30px' }}>
                <h3>Jobs</h3>
                {loading ? (
                    <p>Loading jobs...</p>
                ) : applications.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                        {applications.map((job) => (
                            <div key={job.jobId} style={{
                                border: '1px solid gray',
                                borderRadius: '10px',
                                backgroundColor: '#f9f9f9',
                                padding: '20px',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                width: '90%'
                            }}>
                                {selectedJob?.jobId === job.jobId ? (
                                    <form onSubmit={handleJobUpdateSubmit}>
                                        <input
                                            type="text"
                                            name="title"
                                            value={updatedJob.title}
                                            onChange={handleJobUpdateChange}
                                            placeholder="Job Title"
                                            required
                                        />
                                        <textarea
                                            name="description"
                                            value={updatedJob.description}
                                            onChange={handleJobUpdateChange}
                                            placeholder="Job Description"
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="qualification"
                                            value={updatedJob.qualification}
                                            onChange={handleJobUpdateChange}
                                            placeholder="Qualification"
                                            required
                                        />
                                        <div className="button-group">
                                            <button className="btn" type="submit">Update Job</button>
                                            <button className="btn" type="button" onClick={() => setSelectedJob(null)}>Cancel</button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <h4>Job ID: {job.jobId}</h4>
                                        <p><strong>Title:</strong> {job.title}</p>
                                        <p><strong>Description:</strong> {job.description}</p>
                                        <p><strong>Qualification:</strong> {job.qualification}</p>
                                        <div className="button-group">
                                            <button className="btn" onClick={() => {
                                                setSelectedJob(job);
                                                setUpdatedJob({ title: job.title, description: job.description, qualification: job.qualification });
                                            }}>Edit</button>
                                            <button className="btn" onClick={() => handleJobDelete(job.jobId)}>Delete</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No jobs found.</p>
                )}
            </div>
        </div>
    );
};

export default EmployerHome;
