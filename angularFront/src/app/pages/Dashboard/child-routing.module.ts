import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const childRoutes: Routes = [
  { path: '', loadComponent: ()=> import('./task-list/task-list.component'), title: 'Task List' },
  { path: 'edit/:id', loadComponent: ()=> import('./task-list/edit/edit.component'), title: 'Update Task' },
  { path: 'new', loadComponent: ()=> import('./task-list/new/new.component'), title: 'New Task' },
  { path: 'detail/:id', loadComponent: ()=> import('./task-list/detail/detail.component'), title: 'Detail Task' },
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutingModule { }
