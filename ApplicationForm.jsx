import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './ApplicationForm.css';
import JobSeekerService from '../services/JobSeekerService';

const ApplicationForm = () => {
    const { seekerId, jobId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    console.log('Location State:', location.state);

    const employerId = location.state?.employerId || ''; // Default to an empty string if undefined
    console.log('Received employerId:', employerId);

    const [jobDetails, setJobDetails] = useState(null);
    const [formData, setFormData] = useState({
        resume: null,
        qualification: '',
        twelfthPercentage: '',
        employerId: employerId,
    });
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null); // State to store preview URL

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await JobSeekerService.getJobDetails(jobId);
                setJobDetails(response.data);
            } catch (error) {
                console.error('Error fetching job details:', error);
            }
        };
        fetchJobDetails();
    }, [jobId]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            const file = files[0];
            setFormData({ ...formData, resume: file });
            
            // Generate preview URL for the uploaded PDF file using Blob
            const fileUrl = URL.createObjectURL(file);
            setPreviewUrl(fileUrl);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('resume', formData.resume);
        data.append('qualification', formData.qualification);
        data.append('twelfthPercentage', formData.twelfthPercentage);
        data.append('employerId', employerId);

        try {
            await JobSeekerService.applyForJob(seekerId, jobId, data);
            alert('Application submitted successfully!');
            navigate(`/job-seeker/${seekerId}`);
        } catch (error) {
            console.error('Error applying for job:', error);
            alert('Failed to submit application.');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        navigate(-1); // Navigates back to the previous page
    };

    return (
        <div className="application-form-container">
            <div className="application-form-card">
                <h2>Apply for Job</h2>
                {jobDetails ? (
                    <div className="job-details">
                        <h3>{jobDetails.title}</h3>
                        <p>{jobDetails.description}</p>
                        <p><strong>Qualification: </strong>{jobDetails.qualification}</p>
                        <p><strong>Salary: </strong>{jobDetails.salary}</p>
                    </div>
                ) : (
                    <p>Loading job details...</p>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="resume">Upload Resume (PDF):</label>
                        <input
                            type="file"
                            name="resume"
                            id="resume"
                            accept="application/pdf"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Display PDF Preview if available */}
                    {previewUrl && (
                        <div className="resume-preview">
                            <h4>Resume Preview:</h4>
                            <object
                                data={previewUrl}
                                type="application/pdf"
                                width="100%"
                                height="500px"
                                aria-label="PDF Preview"
                            >
                                <p>Your browser does not support PDF previewing. <a href={previewUrl} target="_blank" rel="noopener noreferrer">Click here to view the PDF.</a></p>
                            </object>
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="qualification">Qualification:</label>
                        <input
                            type="text"
                            name="qualification"
                            id="qualification"
                            value={formData.qualification}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="twelfthPercentage">Twelfth Percentage:</label>
                        <input
                            type="number"
                            name="twelfthPercentage"
                            id="twelfthPercentage"
                            value={formData.twelfthPercentage}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="button-group">
                        <button type="submit" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                        <button type="button" className="close-button" onClick={handleClose}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplicationForm;
