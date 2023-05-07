import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, Platform } from '@ionic/angular';
import { ITask } from 'src/app/interfaces/task.interface';
import { TaskService } from 'src/app/services/api/task.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export default class DetailPage implements OnInit {
  public task!: ITask;
  private taskS = inject(TaskService);
  private activatedRoute = inject(ActivatedRoute);

  constructor() {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.getTask(id)
  }
  getTask(id:string){
    this.taskS.getTaskById(id).subscribe({
      next: (v) => this.task = v,
      error: (e) => { console.log(e) },
      complete: () => console.info('complete') 
    })
  }
}
