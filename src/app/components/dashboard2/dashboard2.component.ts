import { CdkDrag, CdkDragDrop, CdkDragHandle, DragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild, input } from '@angular/core';

import { TestDirective } from 'src/app/shared/directives/test.directive';
import { EventService } from 'src/app/shared/service/event.service';
import { BanerComponent } from './baner/baner.component';

import { NgClass, NgFor } from '@angular/common';
import { DragDirective } from 'src/app/shared/directives/drag.directive';


@Component({
  selector: 'app-dashboard2',
  standalone: true,
  imports: [TestDirective ,BanerComponent  , DragDropModule , NgFor , NgClass],
  templateUrl: './dashboard2.component.html',
  styleUrl: './dashboard2.component.scss'
})
export class Dashboard2Component {
isActive:boolean=false;
items = ['Item 1', 'Item 2', 'Item 3'];

drop(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.items, event.previousIndex, event.currentIndex);
}

constructor(    private eventService: EventService ){


  this.eventService.clickEvent$.subscribe(()=>{
    this.isActive =! this.isActive;
  })

}
}
