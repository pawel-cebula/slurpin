import React from 'react';
import { Card, Rate } from 'antd';
import { ReactComponent as Bowl } from '../assets/bowl.svg';

const Checkin = ({ checkin }) => (
  <Card
    title={
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Bowl style={{ width: 48, height: 48, marginRight: 16 }} />
        {checkin.place_name}
      </div>
    }
    actions={['Like', 'Comment']}
    style={{ maxWidth: 768, margin: '20px auto' }}
  >
    <p style={{ fontStyle: 'italic' }}>&quot;{checkin.review}&quot;</p>
    <p>{checkin.person_username}</p>
    <Rate disabled defaultValue={checkin.rating} />
  </Card>
);

export default Checkin;
