import React from 'react';

class LetterBox extends React.Component {
  render() {
    const { letter, isVisible, boxStyle, letterStyle } = this.props;

    const defaultBoxStyle = {
      border: '1px solid rgba(0,0,0,0.12)',
      width: '56px',
      height: '56px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '24px',
      fontWeight: 'bold',
      borderRadius: '6px',
      background: '#1976d2'
    };

    const defaultLetterStyle = {
      visibility: isVisible ? 'visible' : 'hidden',
      color: 'white', 
      fontSize: '30px' 
    };

    const combinedBoxStyle = { ...defaultBoxStyle, ...boxStyle };
    const combinedLetterStyle = { ...defaultLetterStyle, ...letterStyle };

    return (
      <div style={combinedBoxStyle}>
        <span style={combinedLetterStyle}>{letter}</span>
      </div>
    );
  }
}

export default LetterBox;