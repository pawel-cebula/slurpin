import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Card, Rate, Tag } from 'antd';
import { LikeTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Bowl } from '../assets/bowl.svg';
import Review from './Review';
import { likeCheckin, unlikeCheckin } from '../reducers/checkinReducer';
import { addUserLike, deleteUserLike } from '../reducers/userReducer';

const Checkin = ({ checkin }) => {
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
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Bowl
            style={{ width: 48, height: 48, marginRight: 16, flexShrink: 0 }}
          />
          <div>
            <h3 style={{ marginBottom: 0 }}>{checkin.placeName}</h3>
            <Tag color="blue">{checkin.bowl}</Tag>
          </div>
          <Rate
            disabled
            defaultValue={checkin.rating}
            style={{ marginLeft: 'auto' }}
          />
        </div>
      }
      actions={[
        <span
          role="button"
          tabIndex={0}
          onClick={handleLike}
          onKeyDown={handleLike}
          style={{ color: likeBtnColor }}
        >
          Like
        </span>,
      ]}
      style={{ maxWidth: 768, margin: '20px auto' }}
    >
      <p style={{ marginBottom: 0 }}>
        <span style={{ fontWeight: 'bold' }}>{checkin.personUsername}</span>{' '}
        said:
      </p>
      <Review review={checkin.review} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '1em 0 0',
        }}
      >
        <div>
          {checkin.likes > 0 && (
            <>
              <LikeTwoTone
                style={{ fontSize: '1.2rem', marginRight: '0.2em' }}
              />
              <span>{checkin.likes}</span>
            </>
          )}
        </div>
        <span style={{ color: '#bfbfbf' }}>
          {moment(checkin.createdAt).fromNow()}
        </span>
      </div>
    </Card>
  );
};

export default Checkin;
