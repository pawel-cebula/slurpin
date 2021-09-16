import { Card, Rate } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import RecentCheckin from './RecentCheckin';
import placeIcon from '../static/place.png';

const Place = ({ place }) => {
  const averageRating =
    place.checkins.length > 0
      ? (
          place.checkins.reduce((total, checkin) => total + checkin.rating, 0) /
          place.checkins.length
        ).toFixed(1)
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
          {averageRating && (
            <Rate
              disabled
              value={averageRating}
              style={{ marginLeft: 'auto' }}
            />
          )}
          <span
            style={{
              marginLeft: '0.5em',
              color: '#bfbfbf',
            }}
          >
            ({place.checkins.length})
          </span>
        </div>
      }
      style={{ maxWidth: 768, margin: '20px auto' }}
    >
      <RecentCheckin checkin={place.checkins[0]} />
    </Card>
  );
};

export default Place;
