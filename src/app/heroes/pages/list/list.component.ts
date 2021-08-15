import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [


  ]
})
export class ListComponent implements OnInit {

  public heroes: Heroe[] = []


  constructor( private heroesService: HeroesService ) { }

  ngOnInit(): void {

    this.heroesService.getHeroes()
    .subscribe( resp => {
      // this.heroes = resp.map( res => res.superhero )
      this.heroes = resp
    } )


  }

}
