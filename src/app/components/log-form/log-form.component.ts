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

}
