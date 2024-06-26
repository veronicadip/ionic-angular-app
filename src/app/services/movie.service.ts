import { Injectable, inject } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ApiResultI, MovieI} from "./interfaces";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient);
  constructor() { }

  getTopRatedMovies(page = 1): Observable<ApiResultI> {
    return this.http.get<ApiResultI>(`${BASE_URL}/movie/popular?page=${page}&api_key=${API_KEY}`)
  }
  getMovieDetails(id: string): Observable<MovieI> {
    return this.http.get<MovieI>(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
  }
}
