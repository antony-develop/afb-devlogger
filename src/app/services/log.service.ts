import { Injectable } from '@angular/core';
import { Log } from '../models/Log';

import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs: Log[];

  private logSource = new BehaviorSubject<Log>({
    id: null,
    text: null,
    date: null
  });
  currentLog = this.logSource.asObservable();

  constructor() { 
    this.logs = [
      {id: '1', text: 'Generated components', date: new Date('2018.10.10 05:00:00')},
      {id: '2', text: 'Added markup', date: new Date('2018.10.11 12:00:00')},
      {id: '3', text: 'Added log compoentt', date: new Date('2018.10.11 15:00:00')}
    ];
  }

  getLogs(): Observable<Log[]> {
    return of(this.logs);
  }

  setCurrentLog(log: Log) {
    this.logSource.next(log);
  }
}
