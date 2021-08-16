import { ConfirmComponent } from './../../components/confirm/confirm.component';
import { switchMap } from 'rxjs/operators';
import { HeroesService } from './../../services/heroes.service';
import { Heroe, Publisher } from './../../interfaces/heroes.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
    img{
      width: 100%;
      border-radius: 5px
    }
    `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id:'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id:'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  }

  constructor( private heroeService: HeroesService,
               private activateRoute: ActivatedRoute,
               private router: Router,
               private snackBar: MatSnackBar,
               private dialog: MatDialog) { }

  ngOnInit(): void {


    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activateRoute.params
    .pipe(
      switchMap( ({id}) => this.heroeService.getHeroePorId(id) )
    )
    .subscribe( heroe => this.heroe = heroe)


  }


  guardar(){
    
    if(this.heroe.superhero.trim().length === 0){
      return;
    }

    if (this.heroe.id) {
      //actualizar
      this.heroeService.ActualizarHeroe (this.heroe)
      .subscribe( res =>  {
        this.mostrarSnackBar('Registro Actualizado')
      })
    } else {
      // crear
      this.heroeService.addHeroe(this.heroe)
      .subscribe(
        (res) => {
          this.router.navigate(['/heroes/editar', res.id])
          this.mostrarSnackBar( 'Registro Creado' )
        } 
      )
    }

  }

  borrarHeroe(){

    const dialog = this.dialog.open( ConfirmComponent, {
      width: '250px',
      data: {...this.heroe}
    } );

    dialog.afterClosed()
    .subscribe( res => {

      if (res) {
        this.heroeService.deleteHeroe( this.heroe.id! )
        .subscribe( res => {
          this.router.navigate(['/heroe'])
        })
        
      }
    } )


  }

  mostrarSnackBar( mensaje:string ): void {

    this.snackBar.open( mensaje, 'Ok!', {
      duration: 2500
    } )

  }


}
