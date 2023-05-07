import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import taskC from 'src/app/components/task-form/task-form.component';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/api/task.service';
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule,taskC],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export default class EditComponent {
  public declare idtask : string;
  constructor(private activatedRoute: ActivatedRoute, private taskS: TaskService) {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.idtask = id
    });
  }
}
