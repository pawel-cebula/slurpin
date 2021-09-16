import { Card, Rate } from 'antd';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import placeIcon from '../static/place.png';

const PlaceDetail = () => {
  const [place, setPlace] = useState(null);
  const { id } = useParams();
  const places = useSelector((state) => state.places.data);

  useEffect(() => {
    if (places) {
      setPlace(places.find((p) => p.id === id));
    }
  }, [places]);

  return (
    <div>
      {places.isLoading && <Spinner />}
      {place && (
        <>
          <h1>More information about {place.name}</h1>
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
        </>
      )}
    </div>
  );
};

export default PlaceDetail;
