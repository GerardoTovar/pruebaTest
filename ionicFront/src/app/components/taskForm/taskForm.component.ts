import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { ITask } from 'src/app/interfaces/task.interface';
import { TaskService } from 'src/app/services/api/task.service';

@Component({
  selector: 'app-taskForm',
  templateUrl: './taskForm.component.html',
  styleUrls: ['./taskForm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink, FormsModule, ReactiveFormsModule],
})
export class TaskFormComponent implements OnInit {
  private taskS = inject(TaskService);
  @Input('idTask') idTask: string = '';
  public title = 'New Task'
  constructor( private fb: FormBuilder, private router:Router){}

  ngOnInit(): void {
    if(this.idTask){
      this.getTask()
    }
  }

  public taskForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
  })

  getTask(){
    this.title = 'Update Task'
    this.taskS.getTaskById(this.idTask).subscribe({
      next: (v) => {
        this.taskForm.get('name')?.setValue(v.name);
        this.taskForm.get('description')?.setValue(v.description);
      },
      error: (e) => { console.log(e) },
      complete: () => console.info('complete') 
    })
  }

  saveTask(){
    this.idTask ? this.updateTask() : this.createNewTask()
  }
  createNewTask(){
    const { name, description } = this.taskForm.value
    if(!this.taskForm.invalid && name && description){
      this.taskS.createTask({ name, description }).subscribe({
        next: (v) => { 
          this.router.navigateByUrl('/')
         },
        error: (e) => { console.log(e) },
        complete: () => console.info('complete') 
      })
    }
  }
  updateTask(){
    const { name, description } = this.taskForm.value
    if(!this.taskForm.invalid && name && description){
      this.taskS.updateTask(this.idTask,{ name, description }).subscribe({
        next: (v) => { 
          this.router.navigateByUrl('/')
         },
        error: (e) => { console.log(e) },
        complete: () => console.info('complete') 
      })
    }
  }
  
}
