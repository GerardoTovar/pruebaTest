import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TaskFormComponent } from 'src/app/components/taskForm/taskForm.component';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, TaskFormComponent],
})
export default class NewPage {

}
