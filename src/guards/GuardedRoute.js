import PropTypes from "prop-types";
import { useState } from "react";
import { Navigate } from "react-router-dom";
// hooks

// routes
import { PATH_DASHBOARD } from "../routes/paths";
import tokenService from "../services/token.service";
import { useEffect } from "react";

// ----------------------------------------------------------------------

GuardedRoute.propTypes = {
  children: PropTypes.node,
};

export default function GuardedRoute({ title, dept, children }) {
  const [user, setuser] = useState(tokenService.getUser());

  useEffect(() => {
  console.log("this guarded route user:", user)
  }, [user])

  const AllAccess = ["Super", "CEO", "hr_manager"];
  const canView = (title, dept) => {
    if (
      user?.department?.department === dept ||
      AllAccess.includes(user?.role?.title)
    ) {
      return true;
    } else if (dept === "All") {
      return true;
    } else if (
      title === "" &&
      user?.role?.title === "HR In-House Agent"
    ) {
      return true;
    } else if (
      user?.role?.title === "HR Associate"
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
