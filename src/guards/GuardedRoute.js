import PropTypes from "prop-types";
import { useState } from "react";
import { Navigate } from "react-router-dom";
// hooks

// routes
import { PATH_DASHBOARD } from "../routes/paths";
import tokenService from "../services/token.service";

// ----------------------------------------------------------------------

GuardedRoute.propTypes = {
  children: PropTypes.node,
};

export default function GuardedRoute({ title, dept, children }) {
  const [user, setuser] = useState(tokenService.getUser());

  const AllAccess = ["Super", "CEO", "HR Manager"];
  const canView = (title, dept) => {
    if (
      user?.department?.department === dept ||
      AllAccess.includes(user?.role?.title)
    ) {
      return true;
    } else if (dept === "All") {
      return true;
    } else if (
      title === "Job Opening" &&
      user?.role?.title === "HR In-House Agent"
    ) {
      return true;
    } else if (
      title === "Job Applicants" &&
      user?.role?.title === "HR In-House Agent"
    ) {
      return true;
    } else if (
      title === "Academy Applicants" &&
      user?.role?.title === "HR In-House Agent"
    ) {
      return true;
    }  else if (
      title === "Interview" &&
      user?.role?.title === "HR In-House Agent"
    ) {
      return true;
    } else if (
      title === "Job Offer" &&
      user?.role?.title === "HR In-House Agent"
    ) {
      return true;
    }  else if (
      title === "Interview Schedule List" &&
      user?.role?.title === "HR In-House Agent"
    ) {
      return true;
    } else if (
      title === "Shadowing" &&
      user?.role?.title === "HR In-House Agent"
    ) {
      return true;
    } else if (
      title === "Orientation and Training" &&
      user?.role?.title === "HR In-House Agent"
    ) {
      return true;
    } else {
      return false;
    }
  };
  if (!canView(title, dept)) {
    return <Navigate to="/403" />;
  }

  return <>{children}</>;
}
