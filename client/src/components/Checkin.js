import React from 'react';

const Checkin = ({ checkin }) => (
  <div>
    <h3>
      {checkin.place_name} - {checkin.rating}
    </h3>
    <p>{checkin.review}</p>
    <p>{checkin.person_username}</p>
  </div>
);

export default Checkin;
