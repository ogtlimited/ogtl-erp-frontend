export const canView = (user, dept) => {
  if (user?.department?.department === dept) {
    return true;
  } else {
    return false;
  }
};
