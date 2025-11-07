import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import InterviewForm from '../components/InterviewForm';
import API from '../utils/api';
import './CreateInterview.css';

const CreateInterview = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await API.post('/api/interviews', formData);
      alert('Interview experience shared successfully! 🎉');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating interview:', error);
      alert('Failed to share interview. Please try again.');
    }
  };

  return (
    <div className="create-interview-container">
      <div className="create-interview-header">
        <h1>Share Your Interview Experience</h1>
        <p>Help others by sharing your interview journey</p>
      </div>
      
      <InterviewForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateInterview;