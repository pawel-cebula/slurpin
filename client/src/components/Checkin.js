import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Button, Card, Rate, Tag } from 'antd';
import { LikeTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactComponent as Bowl } from '../static/bowl.svg';
import { likeCheckin, unlikeCheckin } from '../reducers/checkinReducer';
import { addUserLike, deleteUserLike } from '../reducers/userReducer';
import Quote from './Quote';

const Checkin = ({ checkin }) => {
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
    <Card
      className="card feed-checkin"
      title={
        <div className="card-title">
          <Bowl className="card-title-icon" />
          <div>
            <h3 className="margin-zero">{checkin.placeName}</h3>
            <Tag color="blue">{checkin.bowl}</Tag>
          </div>
          <Rate
            disabled
            defaultValue={checkin.rating}
            className="margin-left-auto"
          />
        </div>
      }
      actions={[
        <Button
          type="text"
          onClick={handleLike}
          className={`card-button ${liked ? 'card-button-clicked' : ''}`}
        >
          Like
        </Button>,
      ]}
    >
      <div className="flex-between">
        <p className="margin-zero">
          <Link
            to={`/users/${checkin.personId}`}
            className="bold checkin-user-profile"
          >
            {checkin.personUsername}
          </Link>{' '}
          said:
        </p>
        {checkin.personId === user.id && (
          <Link to={`/checkins/${checkin.id}/edit`}>Edit</Link>
        )}
      </div>

      <Quote quote={checkin.review} />
      <div className="flex-between margin-top">
        <div>
          {checkin.likes > 0 && (
            <>
              <LikeTwoTone className="like-icon" />
              <span>{checkin.likes}</span>
            </>
          )}
        </div>
        <span className="light-grey checkin-created-at">
          {moment(checkin.createdAt).fromNow()}
        </span>
      </div>
    </Card>
  );
};

export default Checkin;
