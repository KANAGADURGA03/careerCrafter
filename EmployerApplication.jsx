import { useEffect, useState } from "react";
import EmployerService from "../services/EmployerService";
import { useParams } from 'react-router-dom';
import './EmployerApplications.css'; // Ensure you have this CSS file

const EmployerApplications = () => {
    const { employerId } = useParams();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await EmployerService.getApplicationsForEmployer(employerId);
                setApplications(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching applications:', error);
                setError('Failed to load applications. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [employerId]);

    const handleUpdate = async (applicationId, status) => {
        // Confirm status change
        if (!window.confirm(`Are you sure you want to mark this application as ${status}?`)) return;

        try {
            console.log(`Updating applicationId: ${applicationId} to status: ${status}`);
            await EmployerService.updateApplicationStatus(applicationId, status);
            console.log('Status updated successfully');

            // Update local state to reflect the new status
            setApplications(prevApplications => 
                prevApplications.map(app => 
                    app.applicationId === applicationId ? { ...app, status } : app
                )
            );
        } catch (error) {
            console.error('Error updating application status:', error);
            alert('Failed to update status. Please try again.');
        }
    };

    const handleDownloadResume = async (applicationId) => {
        try {
            const response = await EmployerService.getResume(applicationId);
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `resume_${applicationId}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error('Error downloading resume:', error);
            alert('Failed to download resume. Please try again later.');
        }
    };

    if (loading) return <p style={{ paddingTop: "20px", fontSize: "18px" }}>Loading applications...</p>;
    if (error) return <p style={{ color: "red", paddingTop: "20px", fontSize: "18px" }}>{error}</p>;

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", marginTop: "30px" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Employer Applications</h2>
            {applications.length > 0 ? (
                applications.map(application => (
                    <div 
                        key={application.applicationId} 
                        style={{
                            border: "1px solid #ccc",
                            padding: "20px",
                            borderRadius: "8px",
                            marginBottom: "20px",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
                        }}
                    >
                        <h3 style={{ marginBottom: "10px", color: "#333" }}>Job Seeker ID: {application.jobSeekerId}</h3>
                        <p style={{ marginBottom: "8px", color: "#555" }}>Application ID: {application.applicationId}</p>
                        <p style={{ marginBottom: "10px", fontWeight: "bold" }}>Qualification: {application.qualification}</p>
                        <p style={{ marginBottom: "10px", fontWeight: "bold" }}>Status: {application.status}</p>
                        
                        <div className="button-group">
                            <button 
                                onClick={() => handleDownloadResume(application.applicationId)}
                                className="btn"
                            >
                                Download Resume
                            </button>
                            
                            <button 
                                onClick={() => handleUpdate(application.applicationId, 'ACCEPTED')} 
                                disabled={application.status === 'ACCEPTED'}
                                className="btn"
                            >
                                Accept
                            </button>
                            <button 
                                onClick={() => handleUpdate(application.applicationId, 'REJECTED')} 
                                disabled={application.status === 'REJECTED'}
                                className="btn"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p style={{ textAlign: "center", color: "#888", fontSize: "18px" }}>No applications found for this employer.</p>
            )}
        </div>
    );
};

export default EmployerApplications;
