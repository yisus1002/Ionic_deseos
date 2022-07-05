import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {  path: '',  component: Tab1Page, },
  // pages/agregar/agregar.module
  { path: 'agregar/:listaId', loadChildren: () => import('../../pages/agregar/agregar.module').then( m => m.AgregarPageModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
