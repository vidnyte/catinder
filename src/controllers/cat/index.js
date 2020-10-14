import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

//////////////////////////////
// The Cat API functions
//////////////////////////////

const API_URL = process.env.REACT_APP_CAT_API_URL;
const API_KEY = process.env.REACT_APP_CAT_API_KEY;

export const getBreedImage = async (breed_ids) => {
  const options = {
    headers: {
      "x-api-key": API_KEY,
    },
    params: { page: 0, limit: 1, breed_ids },
  };

  try {
    const response = await axios.get(`${API_URL}/images/search`, options);
    if (response && response.data) {
      return response.data;
    } else {
      return new Error("GET_BREED_IMAGE_ERROR");
    }
  } catch (err) {
    console.log("CAT_API_CONNECTION_ERROR: ", err);
    return new Error("CAT_API_CONNECTION_ERROR");
  }
};

export const getBreeds = async (page, limit) => {
  const options = {
    headers: {
      "x-api-key": API_KEY,
    },
    params: { page, limit },
  };

  try {
    const response = await axios.get(`${API_URL}/breeds`, options);
    if (response && response.data) {
      return response.data;
    } else {
      return new Error("GET_BREEDS_API_ERROR");
    }
  } catch (err) {
    console.log("CAT_API_CONNECTION_ERROR: ", err);
    return new Error("CAT_API_CONNECTION_ERROR");
  }
};
