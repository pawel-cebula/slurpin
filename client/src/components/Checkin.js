import React from 'react';
import moment from 'moment';
import { Card, Rate, Tag } from 'antd';
import { LikeTwoTone } from '@ant-design/icons';
import { ReactComponent as Bowl } from '../assets/bowl.svg';
import Review from './Review';

const Checkin = ({ checkin }) => (
  <Card
    title={
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Bowl
          style={{ width: 48, height: 48, marginRight: 16, flexShrink: 0 }}
        />
        <div>
          <h3 style={{ marginBottom: 0 }}>{checkin.place_name}</h3>
          <Tag color="blue">{checkin.bowl}</Tag>
        </div>
        <Rate
          disabled
          defaultValue={checkin.rating}
          style={{ marginLeft: 'auto' }}
        />
      </div>
    }
    actions={['Like', 'Comment']}
    style={{ maxWidth: 768, margin: '20px auto' }}
  >
    <p style={{ marginBottom: 0 }}>
      <span style={{ fontWeight: 'bold' }}>{checkin.person_username}</span>{' '}
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
            <LikeTwoTone style={{ fontSize: '1.2rem', marginRight: '0.2em' }} />
            <span>{checkin.likes}</span>
          </>
        )}
      </div>
      <span style={{ color: '#bfbfbf' }}>
        {moment(checkin.created_at).fromNow()}
      </span>
    </div>
  </Card>
);

export default Checkin;
