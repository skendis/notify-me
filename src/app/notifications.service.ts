import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) {
  }

  getHistory(): Observable<any> {
    return this.http.get('api/notifications-history');
  }

  getLastNotification(): Observable<any> {
    const historyUrl = 'https://www.oref.org.il//Shared/Ajax/GetAlarmsHistory.aspx?lang=he&mode=1';
    return this.http.get(historyUrl);
  }
}
