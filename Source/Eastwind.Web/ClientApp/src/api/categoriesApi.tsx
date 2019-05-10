import axios from "axios";
import {Observable} from "rxjs";
import { handleResponse, handleError } from "./apiUtils";
import { Category } from "../category";
const baseUrl = process.env.API_URL + "/categories/";

export class CategoryService {
  getAll(): Observable <Category[]> {  
      const observable$ = Observable.create((observer: any) => {
      axios
      .get(baseUrl)
      .then((response: any) => {
        observer.next(response.data);
        observer.complete();
      })
      .catch((error: any) => {
          observer.error(error);
        });
    });
    return observable$;
  }
}