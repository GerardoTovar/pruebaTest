import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TaskFormComponent } from 'src/app/components/taskForm/taskForm.component';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, TaskFormComponent],
})
export default class ViewMessagePage {
  public declare idtask : string;
  private activatedRoute = inject(ActivatedRoute);

  constructor() {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.idtask = id
  }
}
