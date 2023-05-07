import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask, INewTask, IUpdateTask } from 'src/app/interfaces/task.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private base = 'task/';
  constructor(private api: ApiService) { }

  getAllTask(): Observable<ITask[]> {
    return this.api.get(`${this.base}`);
  }

  getAllTaskFilter(body: { complete?: boolean; }): Observable<ITask[]> {
    return this.api.post(`${this.base}filter`, body);
  }

  getTaskById( id :string): Observable<ITask> {
    return this.api.get(`${this.base}${id}`);
  }

  createTask(body: INewTask ): Observable<ITask> {
    return this.api.post(this.base, body);
  }

  updateTask(id: string, body: IUpdateTask): Observable<ITask>{
    return this.api.patch(this.base + id, body);
  }

  deleteTask(id: string) {
    return this.api.deleteAuth(this.base + id);
  }
}

