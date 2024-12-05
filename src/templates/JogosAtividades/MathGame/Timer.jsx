import React, { useState, useEffect } from 'react';
import './styles.css';

const Timer = ({ onTimeOver }) => {
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
      const timer = setInterval(() => {
          if (timeLeft > 0) {
              setTimeLeft(timeLeft - 1);
          } else {
              clearInterval(timer);
              onTimeOver();
          }
      }, 1000);

      return () => clearInterval(timer);
  }, [timeLeft, onTimeOver]);

  return <div>Time Left: {timeLeft} seconds</div>;
};

export default Timer;
