import moment from "moment";

export const antvalidationError = [
  {
    message: "Required",
    required: true,
  },
];
export const getDate = (date) => {
  return moment(date).format("MMMM Do YYYY");
};
export const getDateTimeFormat = (date) => {
  return moment(date).format("MMMM Do YYYY, g:mm:ss a");
}