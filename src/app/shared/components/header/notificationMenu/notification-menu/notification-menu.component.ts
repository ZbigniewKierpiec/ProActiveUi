import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CustomDatePipe } from "../../../../Pipe's/custom-date.pipe";
import { Notification } from 'src/app/shared/Interface/app.interface';

@Component({
  selector: 'app-notification-menu',
  standalone: true,
  templateUrl: './notification-menu.component.html',
  styleUrl: './notification-menu.component.scss',
  imports: [NgFor, NgIf, CustomDatePipe],
})
export class NotificationMenuComponent {
  @Output() notificationLengthChange = new EventEmitter<number>();
  @Input() isActiveInfo: boolean = false;
  @Input() infoMessageLength: number = 0;
  isActiveNotifi: boolean = false;
  notifications: Notification[] = [
    {
      id: 1,
      name: 'John Doe',
      message: 'You have a new message!',
      date: new Date('2024-06-26'),
    },
    {
      id: 2,
      name: 'Jane Smith',
      message: 'Your order has been shipped.',
      date: new Date('2024-06-23'),
    },
    {
      name: 'Alice Johnson',
      message: 'Reminder: Meeting at 3 PM.',
      date: new Date('2024-06-23'),
      id: 3,
    },

    {
      id: 4,
      name: 'Parces sended',
      message: 'Reminder: Meeting at 3 PM.',
      date: new Date('2024-06-26'),
    },

    {
      id: 5,
      name: 'Parces sended',
      message: 'Reminder: Meeting at 3 PM.',
      date: new Date('2024-06-26'),
    },
  ];

  onShowNotifi() {
    this.isActiveNotifi = !this.isActiveNotifi;
  }

  onMessageDetete(item: Notification) {
    const index = this.notifications.findIndex(
      (notification) => notification.id === item.id
    );
    if (index !== -1) {
      this.notifications.splice(index, 1);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['infoMessageLength']) {
      this.notifyParent();
    }
  }

  notifyParent() {
    this.notificationLengthChange.emit(this.notifications.length);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.infoMessageLength = this.notifications.length;
  }
}
