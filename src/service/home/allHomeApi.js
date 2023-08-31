import axios from "axios";

const AUTH = process.env.REACT_APP_IMDB_AUTH;

const APIKEY=process.env.REACT_APP_API_KEY;

console.log(APIKEY);

const options = {
  method: "GET",
  url: "",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${AUTH}`,
  },
};

export const tredingMovies = async (duration) => {
  try {
    let data = await axios.get(
      `https://api.themoviedb.org/3/trending/all/${duration}?api_key=${APIKEY}`
    );
    return data;
  } catch (error) {
    console.log("Getting error while calling trending data : ", error);
  }
};

export const basedOnGenres = async (id) => {
  try {
    if (id === 296) {
      options.url =
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte=7.5&vote_count.gte=100&watch_region=In&with_keywords=210024";
      const data = await axios.request(options);
      console.log(data);
      return data;
    }
    let data = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${id}&with_original_language=en&hi&with_watch_monetization_types=flatrate`
    );
    return data;
  } catch (error) {
    console.log("Getting error while calling function : ", error);
  }
};

export const monetization = async ({ name }) => {
  try {
    const data = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&primary_release_date.gte=2020-01-01&with_original_language=en&hi&watch_region=IN&with_watch_monetization_types=${name}`
    );
    return data;
  } catch (error) {
    console.log("Getting error while calling monetization : ", error);
  }
};

export const hollyBolly = async ({ lang }) => {
  try {
    const data = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&language=en-US&sort_by=vote_count.desc&include_adult=true&include_video=false&page=1&primary_release_year=2022&with_original_language=${lang}&watch_region=IN&with_watch_monetization_types=flatrate`
    );
    return data;
  } catch (error) {
    console.log("Getting error while calling hollybolly : ", error);
  }
};
