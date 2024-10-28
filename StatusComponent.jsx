import React, { useEffect, useState } from 'react';
//import JobSeekerService from '../Services/JobSeekerService'; // Service to fetch job seeker data
import { useParams } from 'react-router-dom';
import profileImage from './images/profile.png'; // Profile image
import JobSeekerService from '../services/JobSeekerService';

const Status = () => {
    const { seekerId } = useParams(); // Get seekerId from route params
    const [jobSeeker, setJobSeeker] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);  // New state for error

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);  // Reset error state before fetching

            try {
                const seekerResponse = await JobSeekerService.getJobSeekerById(seekerId);
                setJobSeeker(seekerResponse);

                const applicationsResponse = await JobSeekerService.getApplicationsForJobSeeker(seekerId);
                setApplications(applicationsResponse);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (seekerId) {
            fetchData();
        }
    }, [seekerId]);

    // Function to determine the status message and color
    const getStatusMessage = (status) => {
        switch (status) {
            case 'ACCEPTED':
                return { message: 'Congratulations! You are one step closer in our recruitment process.', color: 'green' };
            case 'REJECTED':
                return { message: 'Your skills do not match the job criteria. Better luck next time!', color: 'red' };
            case 'PENDING':
            default:
                return { message: 'Be patient. Your application is waiting for approval.', color: 'grey' };
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '50px' }}>
            {/* Job Seeker Profile Card */}
            <div style={{ 
                padding: '20px', 
                border: '2px solid black', 
                width: '300px',     
                textAlign: 'center',
                marginLeft: '20px',
                marginTop: '100px'
            }}>
                {loading ? (
                    <p>Loading job seeker profile...</p>
                ) : jobSeeker ? (
                    <>
                        <img 
                            src={profileImage} 
                            alt="Job Seeker Profile" 
                            style={{ 
                                width: '90px', 
                                height: '70px', 
                                borderRadius: '40%',  
                                marginBottom: '20px'
                            }} 
                        />
                        <h2>{jobSeeker.name}</h2>
                        <p>Job Seeker ID: {jobSeeker.seekerId}</p>
                        <p>Qualification: {jobSeeker.qualification}</p>
                    </>
                ) : (
                    <p>Job seeker not found.</p>
                )}
            </div>

            {/* Applications Status Section */}
            <div style={{ flex: '1', paddingLeft: '30px', marginTop: '100px' }}>
                <h3>Application Status</h3>
                {loading ? (
                    <p>Loading applications...</p>
                ) : applications.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                        {applications.map((application) => {
                            const { message, color } = getStatusMessage(application.status);
                            return (
                                <div 
                                    key={application.applicationId} 
                                    style={{ 
                                        border: `2px solid ${color}`, 
                                        borderRadius: '10px', 
                                        backgroundColor: '#f9f9f9',
                                        padding: '20px',
                                        color: color, 
                                        width: '90%',  // Expand card width
                                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
                                    }}
                                >
                                    <h4>Application ID: {application.applicationId}</h4>
                                    <p><strong>Job ID:</strong> {application.jobId}</p>
                                    <p><strong>Status:</strong> {application.status}</p>
                                    <p>{message}</p>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p>No applications found.</p>
                )}
            </div>
        </div>
    );
};

export default Status;
