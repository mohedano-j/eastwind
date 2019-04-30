import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/categories/";

export async function categoryListLoad() {
  return await axios
    .get(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
