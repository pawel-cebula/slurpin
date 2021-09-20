import { Card } from 'antd';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CheckinSmall from '../components/CheckinSmall';
import Spinner from '../components/Spinner';
import placeIcon from '../static/place.png';

const PlaceDetail = () => {
  const [place, setPlace] = useState(null);
  const { id } = useParams();
  const places = useSelector((state) => state.places);

  useEffect(() => {
    if (places.data) {
      setPlace(places.data.find((p) => p.id === id));
    }
  }, [places]);

  return (
    <div>
      {places.isLoading && <Spinner />}
      {place && (
        <>
          <h1>More information about {place.name}</h1>
          <Card
            className="card"
            title={
              <div className="card-title">
                <img src={placeIcon} alt="" className="card-title-icon" />
                {place.name}
              </div>
            }
          >
            <p className="text-center bold">
              {place.checkins.length} checkins:
            </p>
            {place.checkins.map((checkin) => (
              <CheckinSmall key={checkin.id} checkin={checkin} />
            ))}
          </Card>
        </>
      )}
    </div>
  );
};

export default PlaceDetail;
