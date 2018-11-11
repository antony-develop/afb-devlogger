import { Injectable } from '@angular/core';
import { Log } from '../models/Log';

import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs: Log[];

  private logSource = new BehaviorSubject<Log>(this.getEmptyLog());
  currentLog = this.logSource.asObservable();

  private editStateSource = new BehaviorSubject<boolean>(false);
  editState = this.editStateSource.asObservable();

  constructor() { 
    this.logs = [];
  }

  getLogs(): Observable<Log[]> {
    return of(this.logs);
  }

  setCurrentLog(log: Log) {
    this.logSource.next(log);
  }

  createLog(log: Log) {
    this.logs.unshift(log);
  }

  updateLog(log: Log) {
    this.logs.forEach((curLog, index) => {
      if (log.id === curLog.id) {
        this.logs.splice(index, 1);
      }
    });

    this.logs.unshift(log);
  }

  deleteLog(log: Log) {
    this.logs.forEach((curLog, index) => {
      if (log.id === curLog.id) {
        this.logs.splice(index, 1);
      }
    });
  }

  clearState() {
    this.editStateSource.next(false);
  }

  getEmptyLog(): Log {
    return {
      id: null,
      text: null,
      date: null
    }
  }
}
