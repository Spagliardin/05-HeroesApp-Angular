import { Heroe } from './../interfaces/heroes.interface';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HeroesService {


  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient ) {}

  getHeroes(): Observable<Heroe[]>{
    return this.http.get<Heroe[]>( `${this.baseUrl}/heroes` )
  }

  getHeroePorId( id : string): Observable<Heroe>{
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`)
  }

  getSugerencias( termino: string ): Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=6`)
  }

  addHeroe( heroe: Heroe ): Observable<Heroe> {
    return this.http.post<Heroe>( `${this.baseUrl}/heroes`, heroe )
  }

  ActualizarHeroe( heroe: Heroe ): Observable<Heroe> {
    return this.http.put<Heroe>( `${this.baseUrl}/heroes/${ heroe.id }`, heroe )
  }

  deleteHeroe ( heroe: any ): Observable<any> {
    return this.http.delete<any>( `${this.baseUrl}/heroes/${ heroe.id }`)
  }
}
