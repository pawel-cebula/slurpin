import { Rate } from 'antd';
import React from 'react';

const PlaceRating = ({ value, checkins }) => (
  <div style={{ marginLeft: 'auto' }}>
    <Rate disabled value={value || 0} />
    <span
      style={{
        marginLeft: '0.5em',
        color: '#bfbfbf',
      }}
    >
      ({checkins})
    </span>
  </div>
);

export default PlaceRating;
