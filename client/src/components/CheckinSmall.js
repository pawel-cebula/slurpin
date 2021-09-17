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

  const likeBtnColor = liked ? '#1890ff' : '#8c8c8c';

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
    <Card key={checkin.id} style={{ marginTop: '1em' }}>
      <Rate
        disabled
        defaultValue={checkin.rating}
        style={{ display: 'flex', justifyContent: 'flex-end' }}
      />
      <Quote quote={checkin.review || '...'} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '0.5em',
        }}
      >
        <Button
          type="link"
          onClick={handleLike}
          style={{ color: likeBtnColor }}
        >
          Like
        </Button>
        <span style={{ color: '#bfbfbf' }}>
          {moment(checkin.createdAt).fromNow()}
        </span>
      </div>
    </Card>
  );
};

export default CheckinSmall;
