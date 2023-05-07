import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/taskList/taskList.page') },
  { path: 'detail/:id', loadComponent: () => import('./pages/taskList/detail/detail.page')},
  { path: 'update/:id', loadComponent: () => import('./pages/taskList/update/update.page')},
  { path: 'new', loadComponent: () => import('./pages/taskList/new/new.page')},
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
