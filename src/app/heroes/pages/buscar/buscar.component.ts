import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  public termino: string = ''
  heroes: Heroe[] = []
  heroeSeleccionado: Heroe | undefined;

  constructor( private heroesService: HeroesService ) { }

  ngOnInit(): void {
  }


  buscando(){

    this.heroesService.getSugerencias( this.termino.trim() )
    .subscribe( res => this.heroes = res )

  }

  opcionSeleccionada( event: MatAutocompleteSelectedEvent ){
    
    if (!event.option.value) {
      this.heroeSeleccionado = undefined;
      return;
    }
    
    const heroe: Heroe = event.option.value

    this.termino = heroe.superhero

    this.heroesService.getHeroePorId( heroe.id! )
    .subscribe( res => this.heroeSeleccionado = res)
  }

}
