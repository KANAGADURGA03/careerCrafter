// src/components/PostJob.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './PostJob.css'; // Import CSS file
import EmployerService from '../services/EmployerService';


const PostJob = () => {
    const { employerId } = useParams(); // Retrieve employerId from the URL parameters
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [qualification, setQualification] = useState('');
    const [salary, setSalary] = useState('');
    const [tenthPercentage, setTenthPercentage] = useState('');
    const [twelfthPercentage, setTwelfthPercentage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const job = { title, description, qualification }; // Include necessary fields
        try {
            await EmployerService.createJobForEmployer(employerId, job); // Call the correct method
            alert('Job added successfully.');
            navigate(`/employer-home/${employerId}`); // Corrected navigation to employer home
        } catch (error) {
            console.error('Error adding job:', error);
            alert('Failed to Add.');
        }
    };
    

    const handleCancel = () => {
        navigate('/employer-home'); // Navigate back to employer home
    };

    return (
        <div className="post-job-container">
            <div className="post-job-card">
                <h2>Post a Job</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            required 
                        />
                    </label>
                    <label>
                        Description:
                        <textarea 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            required 
                        />
                    </label>
                    <label>
                        Qualification:
                        <input 
                            type="text" 
                            value={qualification} 
                            onChange={(e) => setQualification(e.target.value)} 
                            required 
                        />
                    </label>
                    <label>
                        Salary:
                        <input 
                            type="number" 
                            value={salary} 
                            onChange={(e) => setSalary(e.target.value)} 
                            required 
                        />
                    </label>
                    <label>
                        10th Percentage:
                        <input 
                            type="number" 
                            value={tenthPercentage} 
                            onChange={(e) => setTenthPercentage(e.target.value)} 
                            required 
                        />
                    </label>
                    <label>
                        12th Percentage:
                        <input 
                            type="number" 
                            value={twelfthPercentage} 
                            onChange={(e) => setTwelfthPercentage(e.target.value)} 
                            required 
                        />
                    </label>
                    <div className="button-container">
                        <button type="submit" className="add-button">Add</button>
                        <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostJob;
