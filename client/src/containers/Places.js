import React from 'react';
import { useSelector } from 'react-redux';
import Place from '../components/Place';

const Places = () => {
  const places = useSelector((state) => state.places);

  return (
    <div>
      {places.map((place) => (
        <Place key={place.id} place={place} />
      ))}
    </div>
  );
};

export default Places;
