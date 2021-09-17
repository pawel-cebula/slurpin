import { EditOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import CheckinSmall from '../components/CheckinSmall';
import Spinner from '../components/Spinner';
import personService from '../services/persons';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState();
  const loggedUser = useSelector((state) => state.user);

  useState(() => {
    const getUser = async (userId) => {
      const userInfo = await personService.getById(userId);
      setUser(userInfo);
    };
    if (id) {
      getUser(id);
    }
  }, [user, id]);

  if (!user) return <Spinner />;

  return (
    <div style={{ maxWidth: 768, margin: '20px auto' }}>
      <h1>User Profile</h1>
      <Card
        style={{ textAlign: 'center' }}
        actions={
          loggedUser.id === user.id
            ? [
                <Link to={`/users/${loggedUser.id}/edit`}>
                  <EditOutlined key="edit" />
                </Link>,
              ]
            : []
        }
      >
        <Card.Meta title={user.username} description={user.email} />
      </Card>
      <p style={{ marginTop: '2em', textAlign: 'center', fontWeight: 'bold' }}>
        Activity: {user.checkins.length} checkins to date
      </p>
      {user.checkins.map((checkin) => (
        <CheckinSmall key={checkin.id} checkin={checkin} />
      ))}
    </div>
  );
};

export default UserProfile;
