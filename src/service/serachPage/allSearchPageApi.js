import axios from "axios";

const AUTH = process.env.REACT_APP_IMDB_AUTH;

const options = {
  method: "GET",
  url: "",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${AUTH}`,
  },
};

export const getSearchText = async (params, activeState, page) => {
  try {
    options.url = `https://api.themoviedb.org/3/search/${activeState}?query=${params}&include_adult=false&language=en-US&page=${page}`;
    const data = await axios.request(options);
    // console.log(data);
    return data.data;
  } catch (error) {
    console.log("Getting error while calling getSearchText : ", error);
  }
};
