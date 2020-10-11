import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

//////////////////////////////
// The Cat API functions
//////////////////////////////

const API_URL = process.env.REACT_APP_CAT_API_URL;
const API_KEY = process.env.REACT_APP_CAT_API_KEY;

export const searchCats = (breed_id, category_ids, page, limit) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/images/search`, {
        headers: {
          "x-api-key": API_KEY,
        },
        params: { page, limit, breed_id, category_ids, order: "desc" },
      })
      .then((response) => {
        console.log("searchCats response.data: ", response.data);
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error("CAT_API_ERROR"));
        }
      })
      .catch((err) => {
        reject(new Error("CAT_API_CONNECTION_ERROR"));
      });
  });
};

export const getBreedImage = (breed_ids) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/images/search`, {
        headers: {
          "x-api-key": API_KEY,
        },
        params: { page: 0, limit: 1, breed_ids },
      })
      .then((response) => {
        console.log("getBreedImage response.data: ", response.data);
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error("GET_BREED_IMAGE_ERROR"));
        }
      })
      .catch((err) => {
        reject(new Error("CAT_API_CONNECTION_ERROR"));
      });
  });
};

export const searchBreeds = (q) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/breeds/search`, {
        headers: {
          "x-api-key": API_KEY,
        },
        params: { q },
      })
      .then((response) => {
        console.log("searchBreeds response.data: ", response.data);
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error("SEARCH_BREEDS_ERROR"));
        }
      })
      .catch((err) => {
        reject(new Error("CAT_API_CONNECTION_ERROR"));
      });
  });
};

export const getBreeds = (page, limit) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/breeds`, {
        headers: {
          "x-api-key": API_KEY,
        },
        params: { page, limit },
      })
      .then((response) => {
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error("GET_BREEDS_API_ERROR"));
        }
      })
      .catch((err) => {
        reject(new Error("GET_BREEDS_CONNECTION_ERROR"));
      });
  });
};

export const getCategories = (page, limit) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/categories`, {
        headers: {
          "x-api-key": API_KEY,
        },
        params: { page, limit },
      })
      .then((response) => {
        console.log("response.data: ", response.data);
        if (response.data) {
          resolve(response.data);
        } else {
          reject(new Error("GET_CATEGORIES_API_ERROR"));
        }
      })
      .catch((err) => {
        reject(new Error("GET_CATEGORIES_CONNECTION_ERROR"));
      });
  });
};
