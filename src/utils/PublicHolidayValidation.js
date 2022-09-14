/** @format */

export const PublicHolidayValidation = (value) => {
  if (
    !value.title.length ||
    !value.start_date.length ||
    !value.end_date.length 
  ) {
    return value;
  }
};
