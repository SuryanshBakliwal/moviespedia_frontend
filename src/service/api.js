import axios from "axios";

export const loginUser = async (data) => {
  const response = await axios.post(
    "https://moviespediabackend.onrender.com/loginuser",
    data
  );
  return response;
};

export const createUser = async (data) => {
  const response = await axios.post(
    "https://moviespediabackend.onrender.com/createuser",
    data
  );
  console.log("Hello from create user");
  return response;
};

export const forgotPassword = async ({ email }) => {
  console.log(email);
  const data = await axios.post(
    "https://moviespediabackend.onrender.com/forgotpassword",
    {
      email,
    }
  );
  return data;
};
export const resetPassword = async (id, credentials) => {
  console.log(id);
  try {
    const response = await axios.post(
      `https://moviespediabackend.onrender.com/${id}/resetpassword`,
      {
        credentials,
      }
    );

    return response;
  } catch (error) {
    console.error("Error in resetPassword:", error);
    throw error;
  }
};

export const verifyEmail = async ({ id, token }) => {
  const data = await axios.post(
    `https://moviespediabackend.onrender.com/${id}/verify/${token}`
  );
  console.log(data);
  return data;
};

export const forVerify = async ({ email }) => {
  const data = await axios.post(
    "https://moviespediabackend.onrender.com/forverify",
    { email }
  );
  console.log(data);
  return data;
};

export const addFavroites = async ({ email, movie }) => {
  const response = await axios.post(
    "https://moviespediabackend.onrender.com/addfavroites",
    {
      email,
      movie,
    }
  );
  // console.log("Hello from addFav user", response.data);
  return response.data;
};

export const getFavoriteMovies = async ({ email }) => {
  console.log("hello from get fav", email);
  const response = await axios.post(
    "https://moviespediabackend.onrender.com/getfavorites",
    {
      email,
    }
  );
  console.log(response);
  return response;
};

export const addWatchList = async ({ email, movie }) => {
  const response = await axios.post(
    "https://moviespediabackend.onrender.com/addwatchlist",
    {
      email,
      movie,
    }
  );
  // console.log("Hello from addFav user", response.data);
  return response.data;
};

export const getWatchList = async ({ email }) => {
  console.log("hello from get fav", email);
  const response = await axios.post(
    "https://moviespediabackend.onrender.com/getwatchlist",
    {
      email,
    }
  );
  console.log(response);
  return response;
};
