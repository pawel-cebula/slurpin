import React from 'react';
import { useSelector } from 'react-redux';
import Checkin from '../components/Checkin';

const Feed = () => {
  const checkins = useSelector((state) => state.checkins);

  return (
    <div>
      {checkins ? (
        <div>
          {checkins.map((checkin) => (
            <Checkin key={checkin.id} checkin={checkin} />
          ))}
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default Feed;
