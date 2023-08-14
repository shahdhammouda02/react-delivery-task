import React, { useEffect, useState } from 'react';

const Snackbar = ({ message, type, duration, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        onClose();
      }
    }, duration || 3000);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return isVisible ? (
    <div className={`snackbar ${type}`}>
      {message}
    </div>
  ) : null;
};

export default Snackbar;
