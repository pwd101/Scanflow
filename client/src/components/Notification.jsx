import React, { useState, useEffect } from 'react';

const Notification = ({ message, showNotification }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(showNotification); // Update visibility based on prop
  }, [showNotification]);


  useEffect(() => {
    let timer;
    if (isVisible) {
      timer = setTimeout(() => {
        setIsVisible(false);
      }, 2000); // Auto-hide after 3 seconds (adjust as needed)
    }
    return () => clearTimeout(timer); // Cleanup on unmount or prop change
  }, [isVisible]);


  return (
    <div className={`notification ${isVisible ? 'show' : ''}`}>
      {message}
    </div>
  );
};

export default Notification;