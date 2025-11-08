import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import InterviewCard from '../components/InterviewCard';
import './Home.css';

const Home = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [filterOutcome, setFilterOutcome] = useState('All');

  useEffect(() => {
    fetchInterviews();
  }, []);

const fetchInterviews = async () => {
  try {
    const res = await API.get('/api/interviews');
    // Add this check to ensure it's always an array
    setInterviews(Array.isArray(res.data) ? res.data : []);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching interviews:', error);
    setInterviews([]); // Add this line - set empty array on error
    setLoading(false);
  }
};

// Add Array.isArray check before filter
const filteredInterviews = (Array.isArray(interviews) ? interviews : []).filter(interview => {
  
  const matchesSearch = 
    interview.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interview.position.toLowerCase().includes(searchTerm.toLowerCase());
  
  const matchesDifficulty = 
    filterDifficulty === 'All' || interview.difficulty === filterDifficulty;
  
  const matchesOutcome = 
    filterOutcome === 'All' || interview.outcome === filterOutcome;
  
  return matchesSearch && matchesDifficulty && matchesOutcome;
});

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading interviews...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <section className="hero">
        <h1>📝 Interview Experiences Hub</h1>
        <p>Learn from real interview experiences shared by the community</p>
        <Link to="/login" className="cta-button">Share Your Experience</Link>
      </section>

      <section className="filters-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Search by company or position..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <select value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)}>
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          
          <select value={filterOutcome} onChange={(e) => setFilterOutcome(e.target.value)}>
            <option value="All">All Outcomes</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </section>

      <section className="interviews-section">
        <h2>Recent Interview Experiences ({filteredInterviews.length})</h2>
        
        {filteredInterviews.length === 0 ? (
          <div className="no-interviews">
            <p>No interviews found. Be the first to share!</p>
          </div>
        ) : (
          <div className="interviews-grid">
            {filteredInterviews.map(interview => (
              <InterviewCard key={interview._id} interview={interview} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;