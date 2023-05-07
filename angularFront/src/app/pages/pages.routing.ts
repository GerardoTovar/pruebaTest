import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Mi Componentes
import { PagesComponent } from './pages.component';

const routes: Routes = [
  { path: '', component: PagesComponent, loadChildren: ()=> import('./Dashboard/child-routing.module').then(m => m.ChildRoutingModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class pagesRoutingModule {}
