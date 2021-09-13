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
    if (user.token) {
      dispatch(initializeCheckins());
    }
  }, [dispatch]);

  return (
    <div>
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
