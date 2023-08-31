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

export const getMovieDetail = async (id) => {
  try {
    console.log(id);
    options.url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const data = await axios.request(options);
    console.log(data);
    return data.data;
  } catch (error) {
    console.log("Getting error while calling getMovieDetail : ", error);
  }
};

export const getMovieCredits = async (id) => {
  try {
    const data = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=cfae944d416f6b2c0b677fcfef99f043`
    );
    return data.data;
  } catch (error) {
    console.log("Getting error while calling getMovieCredits : ", error);
  }
};

export const getMovieBackDrop = async (id) => {
  try {
    options.url = `https://api.themoviedb.org/3/movie/${id}/images`;
    const data = await axios.request(options);

    return data.data;
  } catch (error) {
    console.log("Getting error while calling getMovieBackDrop : ", error);
  }
};

export const getMovieRecommendation = async (id) => {
  try {
    options.url = `https://api.themoviedb.org/3/movie/${id}/recommendations`;
    const data = await axios.request(options);
    return data.data;
  } catch (error) {
    console.log("Getting error while calling getMovieBackDrop : ", error);
  }
};

export const moviesTypes = async (type, page) => {
  try {
    if (type === "anime") {
      options.url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&vote_average.gte=7.5&vote_count.gte=100&watch_region=In&with_keywords=210024`;
    } else {
      options.url = `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=${page}&region=In`;
    }
    const data = await axios.request(options);
    return data.data;
  } catch (error) {
    console.log("Getting error while calling getMovieBackDrop : ", error);
  }
};
