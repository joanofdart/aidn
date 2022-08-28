import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap, Observable } from 'rxjs';
import { Breed } from 'src/app/models/breed';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  #apiUrl: string;

  constructor(private readonly httpClient: HttpClient) {
    this.#apiUrl = environment.apiUrl;
  }

  fetchBreeds(): Observable<Breed[]> {
    return this.httpClient.get<Breed[]>(`${this.#apiUrl}/breeds`);
  }
}
