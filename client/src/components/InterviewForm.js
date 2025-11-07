import React, { useState } from 'react';
import './InterviewForm.css';

const InterviewForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    company: initialData.company || '',
    position: initialData.position || '',
    experience: initialData.experience || '',
    questions: initialData.questions || [''],
    tips: initialData.tips || '',
    difficulty: initialData.difficulty || 'Medium',
    outcome: initialData.outcome || 'Pending',
    interviewDate: initialData.interviewDate || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index] = value;
    setFormData({ ...formData, questions: newQuestions });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, '']
    });
  };

  const removeQuestion = (index) => {
    const newQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Filter out empty questions
    const filteredQuestions = formData.questions.filter(q => q.trim() !== '');
    onSubmit({ ...formData, questions: filteredQuestions });
  };

  return (
    <form onSubmit={handleSubmit} className="interview-form">
      <div className="form-group">
        <label>Company Name *</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
          placeholder="e.g., Google, Microsoft"
        />
      </div>

      <div className="form-group">
        <label>Position *</label>
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
          placeholder="e.g., Software Engineer, Data Analyst"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Difficulty</label>
          <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="form-group">
          <label>Outcome</label>
          <select name="outcome" value={formData.outcome} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="form-group">
          <label>Interview Date</label>
          <input
            type="date"
            name="interviewDate"
            value={formData.interviewDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Your Experience *</label>
        <textarea
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          required
          rows="4"
          placeholder="Share your overall interview experience..."
        />
      </div>

      <div className="form-group">
        <label>Interview Questions</label>
        {formData.questions.map((question, index) => (
          <div key={index} className="question-input">
            <input
              type="text"
              value={question}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
              placeholder={`Question ${index + 1}`}
            />
            {formData.questions.length > 1 && (
              <button
                type="button"
                onClick={() => removeQuestion(index)}
                className="btn-remove"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addQuestion} className="btn-add">
          + Add Question
        </button>
      </div>

      <div className="form-group">
        <label>Tips for Future Candidates</label>
        <textarea
          name="tips"
          value={formData.tips}
          onChange={handleChange}
          rows="3"
          placeholder="Any tips or advice for others..."
        />
      </div>

      <button type="submit" className="btn-submit">
        Share Interview Experience
      </button>
    </form>
  );
};

export default InterviewForm;