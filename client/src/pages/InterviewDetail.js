import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../utils/api';
import './InterviewDetail.css';

const InterviewDetail = () => {
  const { id } = useParams();
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterview();
  }, [id]);

  const fetchInterview = async () => {
    try {
      const res = await API.get(`/api/interviews/${id}`);
      setInterview(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching interview:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading interview details...</p>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="error-container">
        <h2>Interview not found</h2>
        <Link to="/">Go back to home</Link>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return '#10b981';
      case 'Medium': return '#f59e0b';
      case 'Hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getOutcomeColor = (outcome) => {
    switch(outcome) {
      case 'Selected': return '#10b981';
      case 'Rejected': return '#ef4444';
      case 'Pending': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <div className="interview-detail-container">
      <Link to="/" className="back-link">← Back to all interviews</Link>
      
      <div className="interview-detail-card">
        <div className="detail-header">
          <div className="company-info">
            <h1>{interview.company}</h1>
            <h2>{interview.position}</h2>
          </div>
          <div className="detail-badges">
            <span className="badge" style={{ background: getDifficultyColor(interview.difficulty) }}>
              {interview.difficulty}
            </span>
            <span className="badge" style={{ background: getOutcomeColor(interview.outcome) }}>
              {interview.outcome}
            </span>
          </div>
        </div>

        <div className="interviewer-info">
          <img src={interview.user.avatar} alt={interview.user.name} />
          <div>
            <p className="interviewer-name">{interview.user.name}</p>
            <p className="interview-date">
              {new Date(interview.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        <div className="detail-section">
          <h3>📝 Interview Experience</h3>
          <p>{interview.experience}</p>
        </div>

        {interview.questions && interview.questions.length > 0 && (
          <div className="detail-section">
            <h3>❓ Questions Asked</h3>
            <ul className="questions-list">
              {interview.questions.map((question, index) => (
                <li key={index}>{question}</li>
              ))}
            </ul>
          </div>
        )}

        {interview.tips && (
          <div className="detail-section tips-section">
            <h3>💡 Tips for Future Candidates</h3>
            <p>{interview.tips}</p>
          </div>
        )}

        {interview.interviewDate && (
          <div className="detail-meta">
            <span>📅 Interview Date: {new Date(interview.interviewDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewDetail;