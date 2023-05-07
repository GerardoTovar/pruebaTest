import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/api/task.service';
import { ITask } from 'src/app/interfaces/task.interface';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export default class DetailComponent {
  public declare task : ITask;
  constructor(private activatedRoute: ActivatedRoute, private taskS: TaskService) {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.getTask(id);
    });
  }
  getTask(id:string){
    this.taskS.getTaskById(id).subscribe({
      next: (v) => this.task = v,
      error: (e) => { console.log(e) },
      complete: () => console.info('complete') 
    })
  }
}
