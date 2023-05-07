import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-btn-filter-task',
  standalone: true,
  imports: [CommonModule,MatCheckboxModule,MatListModule,FormsModule, ReactiveFormsModule,MatRadioModule],
  templateUrl: './btn-filter-task.component.html',
  styleUrls: ['./btn-filter-task.component.css']
})
export class BtnFilterTaskComponent {
  label: 'Todos' | true | false = 'Todos';
  constructor(private _bottomSheetRef: MatBottomSheetRef<BtnFilterTaskComponent>){
    this.label = (_bottomSheetRef as any)._ref.config.data;
  }
  closeFilter(event: MouseEvent): void {
    setTimeout(() => this.close(event), 200);
  }
  close(event: MouseEvent): void {
    this._bottomSheetRef.dismiss(this.label);
    event.preventDefault();
  }
}
