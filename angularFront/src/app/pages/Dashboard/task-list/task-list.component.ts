import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BtnSheetTaskListComponent } from 'src/app/components/btn-sheet-task-list/btn-sheet-task-list.component';
import { BtnFilterTaskComponent } from 'src/app/components/btn-filter-task/btn-filter-task.component';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { TaskService } from 'src/app/services/api/task.service';
import { ITask } from 'src/app/interfaces/task.interface';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatBottomSheetModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export default class TaskListComponent {
  public tasksList: ITask[] = [];
  filterOpt = 'Todos'
  constructor(private _bottomSheet: MatBottomSheet, private taskS: TaskService) {
    this.getAllTasks()
  }
  
  openBottomSheetFilter(){
    this._bottomSheet.open(BtnFilterTaskComponent,{data:this.filterOpt}).afterDismissed().subscribe({
      next: (v) => {
        this.filterOpt = v
        this.getAllTasks()
      },
    });
  }

  openBottomSheet(data: string): void {
    this._bottomSheet.open(BtnSheetTaskListComponent, { data }).afterDismissed().subscribe({
      next: (v) => { 
        this.getAllTasks()
      },
    });
  }

  getAllTasks(){
    let filter = {}
    if(this.filterOpt !== 'Todos') filter = { complete: this.filterOpt }
    this.taskS.getAllTaskFilter(filter).subscribe({
      next: (v) => {  
        this.tasksList = v
      },
      error: (e) => { console.log(e) },
      complete: () => console.info('complete') 
    })
  }
  
}
