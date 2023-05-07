import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { ITask } from 'src/app/interfaces/task.interface';
import { TaskService } from 'src/app/services/api/task.service';

@Component({
  selector: 'app-taskList',
  templateUrl: './taskList.component.html',
  styleUrls: ['./taskList.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
})
export class TaslListComponent {
  private taskS = inject(TaskService);
  private router = inject(Router);

  @Input() declare task: ITask;
  @Output() ChangeValue: EventEmitter<any> = new EventEmitter()
  constructor(private actionSheetCtrl: ActionSheetController) {}
  
  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Actions',
      buttons: [
        { text: 'Delete', role: 'Delete' },
        { text: 'Update', role: 'Update' },
        { text: 'Marcar como completado', role: 'done' },
        { text: 'Marcar como pendiente', role: 'undone' },
      ],
    });

    await actionSheet.present();
    const { role } = await actionSheet.onDidDismiss()
    if(role === 'Delete') this.deleteTask()
    if(role === 'Update') this.editar()
    if(role === 'done') this.taskComplete()
    if(role === 'undone') this.taskIncomplete()
  }
  
  deleteTask(): void {
    this.taskS.deleteTask(this.task.id).subscribe({
      next: (v) => {this.ChangeValue.emit()},
      error: (e) => console.log(e),
      complete: () => console.info('complete'),
    });
  }
  taskIncomplete(): void {
    this.taskS.updateTask(this.task.id,{complete: false}).subscribe({
      next: (v) => {this.ChangeValue.emit()},
      error: (e) => console.log(e),
      complete: () => console.info('complete'),
    });
  }
  taskComplete(): void {
    this.taskS.updateTask(this.task.id,{complete: true}).subscribe({
      next: (v) => {this.ChangeValue.emit()},
      error: (e) => console.log(e),
      complete: () => console.info('complete'),
    });
  }
  editar(): void {
    this.router.navigateByUrl('/update/' + this.task.id);
  }
}
