export const canView = (user, dept) => {
  if (user?.office?.title.toLowerCase() === dept) {
    return true;
  } else {
    return false;
  }
};
