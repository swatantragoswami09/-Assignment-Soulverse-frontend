import axios from "axios";

// comes from .env file
const BASE_URL = "https://moviesdatabase.p.rapidapi.com";
const API_KEY = "b8c0f97209msh2d881a30a53a7a9p1f6172jsn0386e5149f41";
const HOST = "moviesdatabase.p.rapidapi.com";

const options = {
  method: "GET",
  url: BASE_URL + "/titles/x/upcoming",
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": HOST,
  },
};
export const getUpcomingMovies = async () => {
  try {
    const response = await axios(options);
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};
