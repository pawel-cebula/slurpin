import { Card } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import placeIcon from '../static/place.png';
import PlaceRating from './PlaceRating';
import Review from './Review';

const Place = ({ place }) => {
  const averageRating =
    place.checkins.length > 0
      ? (
          place.checkins.reduce((total, checkin) => total + checkin.rating, 0) /
          place.checkins.length
        ).toFixed(1)
      : null;

  const highlightedCheckin = place
    ? place.checkins.find((c) => c.review !== '')
    : null;

  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={placeIcon}
            alt=""
            style={{ width: 48, height: 48, marginRight: 16 }}
          />
          <Link to={`/places/${place.id}`}>{place.name}</Link>
          <PlaceRating value={averageRating} checkins={place.checkins.length} />
        </div>
      }
      style={{ maxWidth: 768, margin: '20px auto' }}
    >
      {!highlightedCheckin || !highlightedCheckin.review ? (
        'This place has no reviews yet'
      ) : (
        <div>
          <p style={{ marginBottom: 0 }}>Recent review:</p>
          <Review review={highlightedCheckin.review} />
        </div>
      )}
    </Card>
  );
};

export default Place;
