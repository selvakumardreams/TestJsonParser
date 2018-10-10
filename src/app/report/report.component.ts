import { Component, OnInit } from '@angular/core';
import { RecomService } from '../state/recom.service';
import { Recom } from '../state/recom.model';
import { Observable } from 'rxjs';
import { RecomQuery } from '../state/recom.query';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit, OnDestroy {

  today = new Date();
  recom$: Observable<Recom[]>;
  constructor( private recomService: RecomService,
  private recomQuery: RecomQuery) { }

  ngOnInit() {
    this.recom$ = this.recomQuery.selectAll();
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.recom$ = null;
  }

}
