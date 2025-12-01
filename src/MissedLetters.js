import React from 'react';

export default function MissedLetters({ missed, triesLeft }) {
  return (
    <div className="missed-box">
      <div><strong>Missed Letters:</strong> {missed.length ? missed.join(', ') : 'None'}</div>
      <div style={{ marginTop: '6px' }}><strong>Tries left:</strong> {triesLeft}</div>
    </div>
  );
}
