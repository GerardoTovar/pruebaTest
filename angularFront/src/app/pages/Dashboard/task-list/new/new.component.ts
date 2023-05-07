import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import taskC from 'src/app/components/task-form/task-form.component';
@Component({
  selector: 'app-new',
  standalone: true,
  imports: [CommonModule, taskC],
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export default class NewComponent {

}
