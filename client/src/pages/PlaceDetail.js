import { Card } from 'antd';
// import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PlaceCheckin from '../components/PlaceCheckin';
// import Quote from '../components/Quote';
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
              <PlaceCheckin key={checkin.id} checkin={checkin} />
              // <Card key={checkin.id} style={{ marginTop: '1em' }}>
              //   <Rate
              //     disabled
              //     defaultValue={checkin.rating}
              //     style={{ display: 'flex', justifyContent: 'flex-end' }}
              //   />
              //   <Quote quote={checkin.review || '...'} />
              //   <div
              //     style={{
              //       display: 'flex',
              //       justifyContent: 'space-between',
              //       marginTop: '0.5em',
              //     }}
              //   >
              //     <span style={{ fontWeight: 'bold' }}>Like</span>
              //     <span style={{ color: '#bfbfbf' }}>
              //       {moment(checkin.createdAt).fromNow()}
              //     </span>
              //   </div>
              // </Card>
            ))}
          </Card>
        </>
      )}
    </div>
  );
};

export default PlaceDetail;
