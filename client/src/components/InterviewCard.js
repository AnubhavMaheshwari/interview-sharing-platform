import React from 'react';
import { Link } from 'react-router-dom';
import './InterviewCard.css';

const InterviewCard = ({ interview }) => {
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
    <div className="interview-card">
      <div className="card-header">
        <div className="user-info">
          <img src={interview.user.avatar} alt={interview.user.name} className="card-avatar" />
          <div>
            <h3>{interview.company}</h3>
            <p className="position">{interview.position}</p>
          </div>
        </div>
        <div className="badges">
          <span className="badge difficulty" style={{ background: getDifficultyColor(interview.difficulty) }}>
            {interview.difficulty}
          </span>
          <span className="badge outcome" style={{ background: getOutcomeColor(interview.outcome) }}>
            {interview.outcome}
          </span>
        </div>
      </div>
      
      <div className="card-body">
        <p className="experience">{interview.experience}</p>
        {interview.questions && interview.questions.length > 0 && (
          <p className="questions-count">📋 {interview.questions.length} Questions</p>
        )}
      </div>
      
      <div className="card-footer">
        <span className="date">
          {new Date(interview.createdAt).toLocaleDateString()}
        </span>
        <Link to={`/interview/${interview._id}`} className="btn-view">
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default InterviewCard;