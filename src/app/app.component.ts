import {Component, OnInit} from '@angular/core';
import {NotificationsService} from './notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private notificationsService: NotificationsService) {
  }

  title = 'התראות פיקוד העורף';
  notifications: [] = null;
  lastNotification = null;

  ngOnInit(): void {
    this.notificationsService.getHistory().subscribe(data => this.notifications = data);
    setInterval( () => {
      this.getLast();
    }, 5000);
  }

  getLast(): void {
    this.notificationsService.getLastNotification().subscribe(data => this.lastNotification = data);
  }
}
