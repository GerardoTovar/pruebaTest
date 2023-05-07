import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { TaskService } from 'src/app/services/api/task.service';
@Component({
  selector: 'app-btn-sheet-task-list',
  standalone: true,
  imports: [CommonModule, MatBottomSheetModule, MatListModule, RouterModule],
  templateUrl: './btn-sheet-task-list.component.html',
  styleUrls: ['./btn-sheet-task-list.component.css'],
})
export class BtnSheetTaskListComponent {
  public declare idTask;
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BtnSheetTaskListComponent>,
    private router: Router,
    private taskS: TaskService
  ) {
    this.idTask = (_bottomSheetRef as any)._ref.config.data;
  }

  deleteTask(event: MouseEvent): void {
    this.taskS.deleteTask(this.idTask).subscribe({
      next: (v) => {},
      error: (e) => console.log(e),
      complete: () => console.info('complete'),
    });
    this.close(event);
  }
  taskIncomplete(event: MouseEvent): void {
    this.taskS.updateTask(this.idTask,{complete: false}).subscribe({
      next: (v) => {},
      error: (e) => console.log(e),
      complete: () => console.info('complete'),
    });
    this.close(event);
  }
  taskComplete(event: MouseEvent): void {
    this.taskS.updateTask(this.idTask,{complete: true}).subscribe({
      next: (v) => {},
      error: (e) => console.log(e),
      complete: () => console.info('complete'),
    });
    this.close(event);
  }
  editar(event: MouseEvent): void {
    this.router.navigateByUrl('/edit/' + this.idTask);
    this.close(event);
  }
  detail(event: MouseEvent): void {
    this.router.navigateByUrl('/detail/' + this.idTask);
    this.close(event);
  }
  close(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
