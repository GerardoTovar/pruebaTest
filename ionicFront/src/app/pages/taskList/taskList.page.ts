import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActionSheetController, IonicModule, RefresherCustomEvent } from '@ionic/angular';
import { TaslListComponent } from '../../components/taskList/taskList.component';
import { TaskService } from '../../services/api/task.service';
import { ITask } from '../../interfaces/task.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: 'taskList.page.html',
  styleUrls: ['taskList.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, TaslListComponent, RouterLink],
})
export default class TaskListPage {
  public optsPop = [
    { name: 'Todo', value: true },
    { name: 'Completadas', value: false , check: true },
    { name: 'Pendientes', value: false , check: false },
  ]
  private taskS = inject(TaskService);
  public tasksList: ITask[] = [];
  filterOpt = 'Todos'
  constructor(private actionSheetCtrl: ActionSheetController) {
    this.getAllTasks()
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
      this.getAllTasks()
    }, 2000);
  }
  
  ionViewWillEnter() {
    this.getAllTasks()
  }

  saveCheck(opt:any){
    opt.name === 'Todo' ? this.filterOpt = 'Todos' : this.filterOpt = opt.check
    this.optsPop.forEach((opt)=> opt.value = false)
    this.optsPop.forEach((opts)=> {
      if(opts.name === opt.name) opts.value = true
    })
    this.getAllTasks()
  }

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
