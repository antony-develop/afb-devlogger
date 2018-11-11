import { Component, OnInit } from '@angular/core';

import { Log } from '../../models/Log';

import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.scss']
})
export class LogFormComponent implements OnInit {
  currentLog: Log;
  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logService.currentLog.subscribe(log => {
      this.currentLog = log;
    });
  }

  onSubmit() {
    if (this.currentLog.id === null) {
      this.createLog(this.currentLog);
    } else {
      this.updateLog(this.currentLog);
    }
  }

  createLog(log: Log) {
    let newLog: Log = {
      id: this.createUuid(),
      text: log.text,
      date: new Date()
    }

    this.logService.createLog(newLog);
  }

  updateLog(log: Log) {
    let updatedLog: Log = {
      id: log.id,
      text: log.text,
      date: new Date()
    }

    this.logService.updateLog(updatedLog);
  }

  createUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
