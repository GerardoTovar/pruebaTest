import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TaskService } from 'src/app/services/api/task.service';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule,MatInputModule,MatButtonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export default class TaskFormComponent implements OnInit {
  @Input('idTask') idTask: string = '';
  public title = 'New Task'
  constructor( private fb: FormBuilder, private taskS: TaskService, private router:Router){}

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
          console.log(v)
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
          console.log(v)
          this.router.navigateByUrl('/')
         },
        error: (e) => { console.log(e) },
        complete: () => console.info('complete') 
      })
    }
  }
}
