import React from 'react';

const Quote = ({ quote }) => (
  <div
    style={{
      marginTop: '0.5em',
      padding: '2em',
      border: '1px #ffc53d solid',
      borderRadius: '0.5em',
      backgroundColor: '#fffbe6',
    }}
  >
    <p style={{ fontStyle: 'italic', marginBottom: 0 }}>&quot;{quote}&quot;</p>
  </div>
);

export default Quote;
