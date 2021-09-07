import { Card } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import RecentCheckin from './RecentCheckin';
import placeIcon from '../assets/place.png';

const Place = ({ place }) => (
  <Card
    title={
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={placeIcon}
          alt=""
          style={{ width: 48, height: 48, marginRight: 16 }}
        />
        {place.name}
      </div>
    }
    extra={<Link to={`/places/${place.id}`}>More</Link>}
    actions={['Save']}
    style={{ maxWidth: 768, margin: '20px auto' }}
  >
    <RecentCheckin checkin={place.checkins[0]} />
  </Card>
);

export default Place;
