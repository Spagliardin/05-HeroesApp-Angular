import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [

    `
    img {
      width: 100%;
      border-radius: 5px;
    }
    `

  ]
})
export class HeroeComponent implements OnInit {

  public heroe! : Heroe

  constructor(private activateRouter: ActivatedRoute,
              private heroesServices: HeroesService,
              private router:Router,
              ) { }

  ngOnInit(): void {

    this.activateRouter.params
    .pipe(
      switchMap( ({id}) => this.heroesServices.getHeroePorId( id ) )
      )
      .subscribe( res => {
        this.heroe = res
      } )
  }


  regresar(){
    this.router.navigate(['/heroes/listado']);
  }

}

