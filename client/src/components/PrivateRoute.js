import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => state.user);

  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={() => (user.token ? children : <Redirect to="/login" />)}
    />
  );
};

export default PrivateRoute;
