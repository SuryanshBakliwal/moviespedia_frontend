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

export const getTvShowDetail = async (id) => {
  try {
    options.url = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;
    const data = await axios.request(options);
    // console.log(data);
    return data.data;
  } catch (error) {
    console.log("Getting error while calling getMovieDetail : ", error);
  }
};

export const getTvShowCredits = async (id) => {
  try {
    options.url = `https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`;
    const data = await axios.request(options);
    return data.data;
  } catch (error) {
    console.log("Getting error while calling getMovieDetail : ", error);
  }
};

export const getTvCast = async (id) => {
  try {
    options.url = `https://api.themoviedb.org/3/tv/${id}/aggregate_credits`;
    const data = await axios.request(options);
    return data.data;
  } catch (error) {
    console.log("Getting error while calling getTvCast : ", error);
  }
};

export const getTvShowBackdrops = async (id) => {
  try {
    options.url = `https://api.themoviedb.org/3/tv/${id}/images`;
    const data = await axios.request(options);
    return data.data;
  } catch (error) {
    console.log("Getting error while calling getMovieDetail : ", error);
  }
};
export const getTvShowRecommendation = async (id) => {
  try {
    options.url = `https://api.themoviedb.org/3/tv/${id}/recommendations`;
    const data = await axios.request(options);
    return data.data;
  } catch (error) {
    console.log("Getting error while calling getMovieDetail : ", error);
  }
};

export const showsType = async (type, page) => {
  try {
    if (type === "popular") {
      options.url = `https://api.themoviedb.org/3/discover/tv?page=${page}&sort_by=popularity.desc&watch_region=In`;
    } else if (type === "top_rated") {
      options.url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc&timezone=In&vote_average.gte=8.5&vote_count.gte=100&watch_region=In&without_keywords=210024`;
    } else {
      options.url = `https://api.themoviedb.org/3/tv/${type}?language=en-US&page=${page}`;
    }
    const data = await axios.request(options);

    // console.log("show data", data.data);
    return data.data;
  } catch (error) {
    console.log("Getting error while calling showTypes : ", error);
  }
};

export const getSeasonDetail = async (id, season) => {
  try {
    options.url = `https://api.themoviedb.org/3/tv/${id}/season/${season}`;
    const data = await axios.request(options);
    return data.data;
  } catch (error) {
    console.log("Getting error while calling getMovieDetail : ", error);
  }
};

export const getEpisodeDetail = async (id, season, episode) => {
  try {
    options.url = `https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${episode}`;
    console.log(id, season, episode);
    const data = await axios.request(options);
    return data.data;
  } catch (error) {
    console.log("Getting error while calling getEpisodeDetails : ", error);
  }
};
export const getEpisodeBackdrop = async (id, season, episode) => {
  try {
    options.url = `https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${episode}/images`;
    console.log(id, season, episode);
    const data = await axios.request(options);
    return data.data;
  } catch (error) {
    console.log("Getting error while calling getEpisodeBackdrop : ", error);
  }
};
