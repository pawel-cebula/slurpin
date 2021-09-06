import React from 'react';
import { Card } from 'antd';
import { ReactComponent as Bowl } from '../assets/bowl.svg';

const Checkin = ({ checkin }) => (
  <Card
    title={
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Bowl style={{ width: 48, height: 48, marginRight: 16 }} />
        {checkin.place_name}
      </div>
    }
    extra={<a href="/">More</a>}
    actions={['Like', 'Comment']}
    style={{ maxWidth: 768, margin: '20px auto' }}
  >
    <p>Rating: {checkin.rating}</p>
    <p>{checkin.review}</p>
    <p>{checkin.person_username}</p>
  </Card>
);

export default Checkin;
