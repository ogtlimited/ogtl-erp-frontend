import PropTypes from 'prop-types';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
// hooks

// routes
import { PATH_DASHBOARD } from '../routes/paths';
import tokenService from '../services/token.service';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default function GuestGuard({ children }) {
  const [isAuthenticated, setisAuthenticated] = useState(tokenService.getToken())

  if (isAuthenticated) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  return <>{children}</>;
}
