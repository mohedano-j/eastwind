import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/categories/";

export function getCategories() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
