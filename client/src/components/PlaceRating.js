import { Rate } from 'antd';
import React from 'react';

const PlaceRating = ({ value, checkins }) => (
  <div className="margin-left-auto">
    <Rate disabled value={value || 0} />
    <span className="light-grey rating-count">({checkins})</span>
  </div>
);

export default PlaceRating;
