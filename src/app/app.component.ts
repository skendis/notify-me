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
  lastNotification = {data: ['אין התראות חדשות']};
  loadingNotifications = false;
  loadingHistory = false;

  ngOnInit(): void {
    this.getHistory();
    setInterval(() => {
      this.getLast();
    }, 5000);
  }

  getLast(): void {
    this.loadingNotifications = true;
    this.notificationsService.getLastNotification().subscribe(data => {
      if (data !== '') {
        this.loadingNotifications = false;
        this.lastNotification = data;
      } else {
        this.loadingNotifications = false;
        this.lastNotification = {data: ['אין התראות חדשות']};
      }
    });
  }

  getHistory(): void {
    this.loadingHistory = true;
    this.notificationsService.getHistory().subscribe(data => {
      this.notifications = data;
      this.loadingHistory = false;
    });
  }
}
