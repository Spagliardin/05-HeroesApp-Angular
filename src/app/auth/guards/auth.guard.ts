import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor( private authService: AuthService,
               private router: Router ){

  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    return this.authService.verificaAuth()
    .pipe(
      tap( res => {
        if (!res){
          this.router.navigate( ['./auth/login'] )
        }
      })
    )

    // if (this.authService.auth.id) {
    //     return true
    //   }

    // return true;
  }


  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {



      return this.authService.verificaAuth()
      .pipe(
        tap( res => {
          if (!res){
            this.router.navigate( ['./auth/login'] )
          }
        })
      )


  //     if (this.authService.auth.id) {
  //       return true
  //     }

  //   return true;

  }
}
