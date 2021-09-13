import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { addError } from '../reducers/notificationReducer';

const PrivateRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={() => {
        if (user.token) {
          return children;
        }
        dispatch(addError('You need to log in to access this page'));
        return <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;
