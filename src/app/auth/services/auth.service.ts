import { Auth } from './../interfaces/auth.interfase';
import { map, tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl :string = environment.baseUrl
  private _auth: Auth | undefined;


  get auth(): Auth{
    return {...this._auth!}
  }

  constructor( private http: HttpClient) { }


  verificaAuth(): Observable<boolean> {
    if ( !localStorage.getItem('token') ) {
      return of(false);
    }

    return this.http.get<Auth>( `${ this.baseUrl }/usuarios/1` )
    .pipe(
      map( auth => {
        this._auth = auth
        return true
      } )
    )

    
  }


  login(){
    return this.http.get<Auth>( `${ this.baseUrl }/usuarios/1` )
    .pipe (
      tap( res => this._auth = res),
      tap( res => localStorage.setItem( 'token', res.id )),
    )
  }

  logout(){
    this._auth = undefined
  }

}
