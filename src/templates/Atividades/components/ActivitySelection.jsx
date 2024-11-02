import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ActivitySelection.css';

const ActivitySelection = () => {
  const navigate = useNavigate();

  const handleSelectActivity = (activity) => {
    navigate('/create-activity', { state: { selectedActivity: activity } });
  };

  return (
    <div className="activity-selection">
      <div className="activity-card" onClick={() => handleSelectActivity('Numbers')}>
        <img src="numbers-icon.png" alt="Numbers" />
        <h3>Numbers</h3>
        <p>All about number</p>
      </div>
      <div className="activity-card" onClick={() => handleSelectActivity('Reading')}>
        <img src="reading-icon.png" alt="Reading" />
        <h3>Reading</h3>
        <p>Reading some word</p>
      </div>
      <div className="activity-card" onClick={() => handleSelectActivity('Puzzle')}>
        <img src="puzzle-icon.png" alt="Puzzle" />
        <h3>Puzzle</h3>
        <p>Arranging puzzle</p>
      </div>
      <div className="activity-card" onClick={() => handleSelectActivity('Drawing')}>
        <img src="drawing-icon.png" alt="Drawing" />
        <h3>Drawing</h3>
        <p>Coloring a picture</p>
      </div>
    </div>
  );
};

export default ActivitySelection;
