import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

//////////////////////////////
// The Cat API functions
//////////////////////////////

const API_URL = process.env.REACT_APP_CAT_API_URL;
const API_KEY = process.env.REACT_APP_CAT_API_KEY;

console.log("api_url: ", API_URL);
console.log("api_key: ", API_KEY);

export const searchCats = (breed_id, page, limit) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/images/search`, {
        headers: { "x-api-key": API_KEY },
        params: { page, limit, breed_id, order: "desc" },
      })
      .then((response) => {
        console.log("response.data: ", response.data);
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
