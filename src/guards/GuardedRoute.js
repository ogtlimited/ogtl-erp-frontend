import PropTypes from "prop-types";
import { useState } from "react";
import { Navigate } from "react-router-dom";
// hooks

// routes
import tokenService from "../services/token.service";

// ----------------------------------------------------------------------

GuardedRoute.propTypes = {
  children: PropTypes.node,
};

export default function GuardedRoute({ title, dept, children }) {
  const [user] = useState(tokenService.getUser());
  // const AllAccess = ["super", "ceo", "hr_manager"];

  const CurrentUserRoles = user?.employee_info?.roles;

  const userDept =
    user?.office?.office_type === "department"
      ? user?.office?.title?.toLowerCase()
      : null;

  const canView = (title, dept) => {
    if (
      userDept === dept ||
      CurrentUserRoles.includes("ceo") ||
      CurrentUserRoles.includes("super") ||
      CurrentUserRoles.includes("hr_manager")
    ) {
      return true;
    } else if (dept === "all") {
      return true;
    } else if (CurrentUserRoles.includes("team_lead")) {
      return true;
    } else if (CurrentUserRoles.includes("supervisor")) {
      return true;
    } else if (CurrentUserRoles.includes("rep_siever")) {
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
