import { Button, Card, Rate } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeCheckin, unlikeCheckin } from '../reducers/checkinReducer';
import { addUserLike, deleteUserLike } from '../reducers/userReducer';
import Quote from './Quote';

const CheckinSmall = ({ checkin }) => {
  const user = useSelector((state) => state.user);
  const [liked, setLiked] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setLiked(user.likes.includes(checkin.id));
  }, [user]);

  const handleLike = async () => {
    if (!liked) {
      await dispatch(likeCheckin(checkin.id, user.id));
      dispatch(addUserLike(checkin.id));
    } else {
      await dispatch(unlikeCheckin(checkin.id, user.id));
      dispatch(deleteUserLike(checkin.id));
    }
    setLiked(!liked);
  };

  return (
    <Card key={checkin.id} className="card margin-top">
      <Rate disabled defaultValue={checkin.rating} className="flex-end" />
      <Quote quote={checkin.review || '...'} />
      <div className="flex-between">
        <Button
          type="text"
          onClick={handleLike}
          className={`card-button${liked ? ' card-button-clicked' : ''}`}
        >
          Like
        </Button>
        <span className="light-grey">
          {moment(checkin.createdAt).fromNow()}
        </span>
      </div>
    </Card>
  );
};

export default CheckinSmall;
