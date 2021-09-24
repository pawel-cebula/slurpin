import { Card } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import placeIcon from '../static/place.png';
import PlaceRating from './PlaceRating';
import Quote from './Quote';

const Place = ({ place }) => {
  const averageRating =
    place.checkins.length > 0
      ? (
          place.checkins.reduce((total, checkin) => total + checkin.rating, 0) /
          place.checkins.length
        ).toFixed(1)
      : null;

  const highlightedCheckin =
    place && place.checkins.find((c) => c.review !== '');

  return (
    <Card
      className="card places-place"
      title={
        <div className="card-title">
          <img src={placeIcon} alt="" className="card-title-icon" />
          <Link to={`/places/${place.id}`} className="place-detail-link">
            {place.name}
          </Link>
          <PlaceRating value={averageRating} checkins={place.checkins.length} />
        </div>
      }
    >
      {!highlightedCheckin || !highlightedCheckin.review ? (
        'This place has no reviews yet'
      ) : (
        <div>
          <p className="margin-zero">Recent review:</p>
          <Quote quote={highlightedCheckin.review} />
        </div>
      )}
    </Card>
  );
};

export default Place;
