import React from 'react';
import { useSelector } from 'react-redux';
import Checkin from '../components/Checkin';
import Spinner from '../components/Spinner';

const Feed = () => {
  const checkins = useSelector((state) => state.checkins);

  return (
    <div>
      <h1>Recent checkins from Berlin</h1>
      {checkins.isLoading && <Spinner />}
      {checkins.data && (
        <div>
          {checkins.data.map((checkin) => (
            <Checkin key={checkin.id} checkin={checkin} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
