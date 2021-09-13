import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Checkin from '../components/Checkin';
import Spinner from '../components/Spinner';
import { initializeCheckins } from '../reducers/checkinReducer';

const Feed = () => {
  const checkins = useSelector((state) => state.checkins);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!checkins.data && user.token) {
      dispatch(initializeCheckins());
    }
  }, [dispatch]);

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
