import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private baseUrl = 'https://pokeapi.co/api/v2/';
  constructor(private http: HttpClient) { }

  getPokemons(offset: number = 0, limit: number = 20): Observable<any> {
    return this.http.get(`${this.baseUrl}pokemon?offset=${offset}&limit=${limit}`);
  }

  getPokemonDetails(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}pokemon/${name}`);
  }
}
