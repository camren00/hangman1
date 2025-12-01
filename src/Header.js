import React from 'react';

export default function Header({ onNewGame }) {
  return (
    <header className="app-header-custom">
      <h1 style={{ margin: 0, fontSize: '1.25rem' }}>Hangman</h1>
      <div>
        <button className="btn-primary" onClick={onNewGame}>New Game</button>
      </div>
    </header>
  );
}
