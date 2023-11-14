import React from 'react';
import ConfettiExplosion from 'react-confetti-explosion';

const Confetti = () => {
  const bigExplodeProps = {
    force: 0.8,
    duration: 3000,
    particleCount: 250,
    width: 1600
  };

  const source = {
    position: 'absolute',
    right: '50%',
    left: '50%',
    width: '500px'
  };

  return (
    <div style={source}>
      <ConfettiExplosion {...bigExplodeProps} />
    </div>
  );
};

export default Confetti;
