import React from 'react';

export default function WinLossModal({ isOpen, message, onClose, onRestart }) {
  if (!isOpen) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h2>{message}</h2>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button className="btn-primary" onClick={onRestart}>Play again</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
