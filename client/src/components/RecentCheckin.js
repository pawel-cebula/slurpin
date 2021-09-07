import React from 'react';

const RecentCheckin = ({ checkin }) => (
  <div>
    {checkin ? (
      <>
        <p>Recent checkin:</p>
        <p style={{ fontStyle: 'italic' }}>&quot;{checkin.review}&quot;</p>
      </>
    ) : (
      <p>No recent checkins</p>
    )}
  </div>
);

export default RecentCheckin;
