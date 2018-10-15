import { Component, Inject, OnInit, OnDestroy, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WidgetRegistry, Validator } from 'ngx-schema-form';
import { Subscription, Observable } from 'rxjs';
import { akitaDevtools } from '@datorama/akita';
import { Router } from '@angular/router';
import { ParserData } from '../parser.data';
import { ParserService } from '../parser.service';
import { AppService } from '../app.service';
import { RecomService } from '../state/recom.service';
import { SessionStorageService } from 'angular-web-storage';
import { Recom } from '../state/recom.model';
import { RecomQuery } from '../state/recom.query';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  title = 'app';
  data: ParserData[];
  queryData: Observable<Recom[]>;
  options: string[];
  elementKey: string;
  value: any;
  fieldValidators: { [fieldId: string]: Validator } = {};
  actions = {};
  schemaUrl: string;
  dialogRef: MatDialogRef<DialogComponent> | null;
  item = {};

  KEY = 'isFirst';

  constructor(
    private service: ParserService,
    public dialog: MatDialog,
    registry: WidgetRegistry,
    private appService: AppService,
    private recomService: RecomService,
    private ngZone: NgZone,
    private router: Router,
    public session: SessionStorageService,
    private parserservice: ParserService,
    private recomQuery: RecomQuery
  ) {
    akitaDevtools(ngZone);
  }

  ngOnInit(): void {
    console.log('Dashboard ', 'ngOnInit');
    this.parserservice.data.subscribe(data => {
     this.data = data;
    });
    this.recomService.addJson(this.data);
    this.queryData = this.recomQuery.selectAll();
  }

  ngOnDestroy(): void {
    this.session.set(this.KEY, false);
    console.log('Dashboard ', 'ngOnDestroy');
  }

  suggestImpression(): void {
    this.router.navigateByUrl('/report');
  }

  onContentUpdate(event: any, value: any) {
    console.log(event + ' ' + value);
  }

  onButtonClick(value, ele, d) {
    this.options = value;
    this.elementKey = ele;
    this.dialogRef = this.dialog.open(DialogComponent, {
      data: this.options,
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        console.log('undefined');
      } else {
        console.log('result:', result, this.elementKey, d);
        document.getElementById(ele).innerHTML = result;
        this.item = {
          state: result
        };
      }
    });
  }
}

@Component({
  selector: 'app-dialog-component',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.css'],
})
export class DialogComponent {
  observations;
  editable = [];
  selectedValue;
  dataValue = [];
  selectedIndex;

  constructor(public dialogRef: MatDialogRef<DashboardComponent>, @Inject(MAT_DIALOG_DATA) public data: string[]) {
    data.forEach((element, index) => {
      this.editable[index] = false;
    });
  }

  makeEditable(index) {
    this.editable[index] = true;
    this.dataValue[index] = this.data[index];
    this.selectedIndex = index;
  }

  isEditable(index) {
    return this.editable[index];
  }

  selectValue(value, i) {
    this.selectedValue = value;
    this.selectedIndex = i;
    if (this.isEditable(this.selectedIndex) !== true) {
      this.dataValue[this.selectedIndex] = this.selectedValue;
    }
  }

  getSelectedValue() {
    this.data = this.dataValue;
  }
}
