import React from 'react';

const Review = ({ review }) => (
  <div
    style={{
      marginTop: '0.5em',
      padding: '2em',
      border: '1px #ffc53d solid',
      borderRadius: '0.5em',
      backgroundColor: '#fffbe6',
    }}
  >
    <p style={{ fontStyle: 'italic', marginBottom: 0 }}>&quot;{review}&quot;</p>
  </div>
);

export default Review;
