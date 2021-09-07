import { Card, Rate } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import placeIcon from '../assets/place.png';

const PlaceDetail = () => {
  const { id } = useParams();
  const place = useSelector((state) => state.places.find((p) => p.id === id));
  return (
    <div>
      {place && (
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
          style={{ maxWidth: 768, margin: '20px auto' }}
        >
          {place.checkins.map((checkin) => (
            <Card key={checkin.id}>
              <p style={{ fontStyle: 'italic' }}>
                &quot;{checkin.review}&quot;
              </p>
              <Rate disabled defaultValue={checkin.rating} />
            </Card>
          ))}
        </Card>
      )}
    </div>
  );
};

export default PlaceDetail;
