import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Modulos
import { pagesRoutingModule } from './pages/pages.routing';
import { PagesComponent } from './pages/pages.component';


const router: Routes = [
  { path: '**', redirectTo: '', pathMatch: 'full'},
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(router),
    pagesRoutingModule
  ],
  exports:[ RouterModule ]
})
export class AppRoutingModule { }
