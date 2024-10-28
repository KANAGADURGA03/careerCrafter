import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Register from './Component/Register';
import StatusComponent from './Component/StatusComponent';
import Login from './Component/Login';
import NavbarComponent from './Component/NavBar';
import RequireAuth from './Component/RequireAuth';
import EmployerHome from './Component/EmployerHome';
import PostJob from './Component/PostJob';
import JobSeekerHome from './Component/JobSeekerHome';
import ApplicationForm from './Component/ApplicationForm';
import AboutUs from './Component/AboutUs';
import ContactUs from './Component/ContactUs';
import EmployerApplications from './Component/EmployerApplication';
import Footer from './Component/Footer'; // Import Footer component
import SavedJobs from './Component/SavedJobs';
import Breadcrumbs from './Component/Breadcrumbs';
import JobSeekerSaved from './Component/JobSeekerSaved';


const App = () => {
  const location = useLocation();
  const role = localStorage.getItem('role');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {location.pathname !== '/' && location.pathname !== '/register' && <NavbarComponent role={role} />}
      
      <div style={{ flex: '1' }}>
      <Breadcrumbs />
        <Routes>
        
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<RequireAuth />}>
            <Route path="/employer-home/:employerId" element={<EmployerHome />} />
            <Route path="/post-job/:employerId" element={<PostJob />} />
            <Route path="/jobseeker-home/:seekerId" element={<JobSeekerHome />} />

            {/* <Route path="/job-seeker-home/:seekerId" element={<JobSeekerHome />} /> */}

            <Route path="/apply-for-job/:seekerId/:jobId" element={<ApplicationForm />} />
            <Route path="/job-seeker/:seekerId/status" element={<StatusComponent />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/application-from-jobseeker/:employerId" element={<EmployerApplications />} />
            <Route path={`/jobseeker-home/:seekerId/savedJobs`} element={<SavedJobs />} />
            <Route path="/saved-jobs/:seekerId" element={<JobSeekerSaved />} />
            


          </Route>
        </Routes>
      </div>
      
      {location.pathname !== '/' && location.pathname !== '/register' && <Footer />} {/* Conditionally render Footer */}
    </div>
  );
};

export default App;
