import { Component, OnInit } from '@angular/core';
import { Log } from '../../models/Log';

import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  logs: Log[];
  currentLog: Log;
  logsLoaded: boolean = false;

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logService.getLogs().subscribe(logs => {
      this.logs = logs;
    });

    setTimeout(() => {
      this.logService.editState.subscribe(isEdit => {
        if (isEdit === false) {
          this.currentLog = this.logService.getEmptyLog();
        }
  
        this.logsLoaded = true;
      })
    }, 3000);    
  }

  onSelect(log: Log) {
    this.logService.setCurrentLog(log);
    this.currentLog = log;
  }

  onDelete(log: Log) {
    if (confirm("Are you sure?")) {
      this.logService.deleteLog(log);
      
      if (this.currentLog === log) {
        this.logService.setCurrentLog(this.logService.getEmptyLog());
      }
    }
  }

}
