export const canView = (user, dept) => {
  if (user?.office?.title === dept) {
    return true;
  } else {
    return false;
  }
};
