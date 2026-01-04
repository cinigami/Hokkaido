import React, { useMemo } from 'react';

const FLAKE_COUNT = 20;
const MIN_DURATION = 10;
const MAX_DURATION = 20;
const MIN_SIZE = 4;
const MAX_SIZE = 12;

const Snowflakes = () => {
  const flakes = useMemo(() =>
    Array.from({ length: FLAKE_COUNT }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: MIN_DURATION + Math.random() * (MAX_DURATION - MIN_DURATION),
      size: MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE),
      opacity: 0.2 + Math.random() * 0.4,
    })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {flakes.map((f) => (
        <div
          key={f.id}
          className="absolute text-white snowflake"
          style={{
            left: `${f.left}%`,
            top: '-20px',
            fontSize: `${f.size}px`,
            opacity: f.opacity,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
          }}
        >
          &#10052;
        </div>
      ))}
    </div>
  );
};

export default Snowflakes;
