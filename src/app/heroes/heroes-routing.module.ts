import { HomeComponent } from './pages/home/home.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { ListComponent } from './pages/list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HeroeComponent } from './pages/heroe/heroe.component';

const routes : Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'listado',
        component: ListComponent,
      },
      {
        path: 'agregar',
        component: AgregarComponent,
      },
      {
        path: 'editar/:id',
        component: AgregarComponent,
      },
      {
        path: 'buscar',
        component: BuscarComponent,
      },
      {
        path: ':id',
        component: HeroeComponent
      },
      {
        path: '**',
        redirectTo: 'listado'
      }
    ]
  }
]


@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class HeroesRoutingModule { }
