import React from 'react';
import { useSelector } from 'react-redux';
import Place from '../components/Place';
import Spinner from '../components/Spinner';

const Places = () => {
  const places = useSelector((state) => state.places);

  return (
    <div>
      {places.isLoading && <Spinner />}
      {places.data &&
        places.data.map((place) => <Place key={place.id} place={place} />)}
    </div>
  );
};

export default Places;
