import PropTypes from 'prop-types';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
// hooks

// routes
import { PATH_DASHBOARD } from '../routes/paths';
import tokenService from '../services/token.service';

// ----------------------------------------------------------------------

GuardedRoute.propTypes = {
  children: PropTypes.node
};

export default function GuardedRoute({title, dept, children }) {
    console.log(dept);
    console.log(children);
  const [user, setuser] = useState(tokenService.getUser());
  console.log(user)

  const AllAccess = ['Super', 'CEO', 'HR Manager']
  const canView = (title, dept) => {
      console.log(title, user.role.title);
    if (user?.department?.department === dept || AllAccess.includes(user?.role?.title)) {
      return true;
    }
    else if(dept === 'All'){
      return true
    }else if(title === 'Job Applicants' && user.role.title === 'HR In-House Agent'){
        return true
    }
     else {
      return false;
    }
  };
  console.log(canView());
  if (!canView(dept)) {
    return <Navigate to="/403" />;
  }

  return <>{children}</>;
}
