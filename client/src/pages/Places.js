import React from 'react';
import { useSelector } from 'react-redux';
import Place from '../components/Place';
import Spinner from '../components/Spinner';

const Places = () => {
  const places = useSelector((state) => state.places);

  return (
    <div>
      <h1>Ramen places in Berlin</h1>
      {places.isLoading && <Spinner />}
      {places.data &&
        places.data
          .sort((a, b) => b.checkins.length - a.checkins.length)
          .map((place) => <Place key={place.id} place={place} />)}
    </div>
  );
};

export default Places;
