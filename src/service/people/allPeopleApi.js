


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

export const getPeopleDetail = async (id) => {
  try {
    options.url = `https://api.themoviedb.org/3/person/${id}?language=en-US`;
    const data = await axios.request(options);
    // console.log(data);
    return data.data;
  } catch (error) {
    console.log("Getting error while calling getPeopleDetail : ", error);
  }
};


export const getPeopleTvCredits = async (id) => {
  try {
    options.url = `https://api.themoviedb.org/3/person/${id}/tv_credits?language=en-US`;
    const data = await axios.request(options);
    // console.log(data);
    return data.data;
  } catch (error) {
    console.log("Getting error while calling getPeopleTvCredits : ", error);
  }
};

export const getPeopleMovieCredits = async (id) => {
  try {
    options.url = `https://api.themoviedb.org/3/person/${id}/movie_credits?language=en-US`;
    const data = await axios.request(options);
    // console.log(data);
    return data.data;
  } catch (error) {
    console.log("Getting error while calling getPeopleMovieCredits : ", error);
  }
};


export const getPeopleImages = async (id) => {
  try {
    options.url = `https://api.themoviedb.org/3/person/${id}/images`;
    const data = await axios.request(options);
    // console.log(data);
    return data.data;
  } catch (error) {
    console.log("Getting error while calling getPeopleImages : ", error);
  }
};


