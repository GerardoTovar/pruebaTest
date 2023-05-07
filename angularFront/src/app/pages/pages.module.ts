import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//Componentes
import { PagesComponent } from './pages.component';

//Rutas
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PagesComponent,
  ],
  exports: [
    PagesComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
  ],
})
export class PagesModule {}
