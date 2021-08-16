import { Auth } from './../../interfaces/auth.interfase';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent{

  

  constructor(private router: Router,
              private authService: AuthService) { }

  login() {

    this.authService.login(  )
    .subscribe( res => {
    
      if (res.id) {
        this.router.navigate( ['./heroes'] )
      }

    } )

  }

  ingresarSinLogin() {
    this.authService.logout();
    this.router.navigate(['./heroes']);
  }

}
