import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../utils/api';
import InterviewCard from '../components/InterviewCard';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [myInterviews, setMyInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    selected: 0,
    rejected: 0,
    pending: 0
  });

  useEffect(() => {
    if (user) {
      fetchMyInterviews();
    }
  }, [user]);

  const fetchMyInterviews = async () => {
    try {
      const res = await API.get(`/api/interviews/user/${user._id}`);
      setMyInterviews(res.data);
      
      // Calculate stats
      const stats = {
        total: res.data.length,
        selected: res.data.filter(i => i.outcome === 'Selected').length,
        rejected: res.data.filter(i => i.outcome === 'Rejected').length,
        pending: res.data.filter(i => i.outcome === 'Pending').length
      };
      setStats(stats);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching interviews:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this interview?')) {
      try {
        await API.delete(`/api/interviews/${id}`);
        setMyInterviews(myInterviews.filter(i => i._id !== id));
        alert('Interview deleted successfully!');
      } catch (error) {
        console.error('Error deleting interview:', error);
        alert('Failed to delete interview');
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your interviews...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="user-welcome">
          <img src={user.avatar} alt={user.name} className="dashboard-avatar" />
          <div>
            <h1>Welcome back, {user.name}! 👋</h1>
            <p>Manage your interview experiences</p>
          </div>
        </div>
        <Link to="/create-interview" className="btn-create">
          + Share New Interview
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-info">
            <h3>{stats.total}</h3>
            <p>Total Interviews</p>
          </div>
        </div>
        
        <div className="stat-card success">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{stats.selected}</h3>
            <p>Selected</p>
          </div>
        </div>
        
        <div className="stat-card danger">
          <div className="stat-icon">❌</div>
          <div className="stat-info">
            <h3>{stats.rejected}</h3>
            <p>Rejected</p>
          </div>
        </div>
        
        <div className="stat-card warning">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>{stats.pending}</h3>
            <p>Pending</p>
          </div>
        </div>
      </div>

      <div className="my-interviews-section">
        <h2>Your Interview Experiences</h2>
        
        {myInterviews.length === 0 ? (
          <div className="no-interviews">
            <p>You haven't shared any interviews yet.</p>
            <Link to="/create-interview" className="btn-primary">
              Share Your First Interview
            </Link>
          </div>
        ) : (
          <div className="interviews-grid">
            {myInterviews.map(interview => (
              <div key={interview._id} className="interview-card-wrapper">
                <InterviewCard interview={interview} />
                <button 
                  onClick={() => handleDelete(interview._id)} 
                  className="btn-delete"
                >
                  🗑️ Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;