import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/products/";

export function productListGet() {
  return axios
    .get(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export async function productGetById(id: any) {
  return await axios
    .get(baseUrl + id)
    .then(handleResponse)
    .catch(handleError);
}

export async function productAdd(product: any) {
  return await axios
    .post(baseUrl, product)
    .then(handleResponse)
    .catch(handleError);
}

export async function productEdit(product: any) {
  return await axios
    .put(baseUrl, product)
    .then(handleResponse)
    .catch(handleError);
}

export async function productDelete(product: any) {
  return await axios
    .delete(baseUrl + product.productId)
    .then(handleResponse)
    .catch(handleError);
}
