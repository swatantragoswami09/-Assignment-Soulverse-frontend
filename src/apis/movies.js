import apiRequest from ".";

export const AddMovie = async (data) => {
  return await apiRequest({
    method: "POST",
    endPoint: "/api/movies/",
    payload: data,
  });
};
export const GetAllMovie = async () => {
  return await apiRequest({
    method: "GET",
    endPoint: "/api/movies",
  });
};
export const GetMovieById = async (id) => {
  console.log("id from api=>", id);
  return await apiRequest({
    method: "GET",
    endPoint: `/api/movies/${id}`,
  });
};
export const UpdateMovie = async (id, data) => {
  return await apiRequest({
    method: "PUT",
    endPoint: `/api/movies/${id}`,
    payload: data,
  });
};
export const DeleteMovie = async (id) => {
  return await apiRequest({
    method: "DELETE",
    endPoint: `/api/movies/${id}`,
    payload: id,
  });
};
