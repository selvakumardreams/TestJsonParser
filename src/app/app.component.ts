import { Component, Inject, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ParserService } from './parser.service';
import { ParserData } from './parser.data';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WidgetRegistry, Validator } from 'ngx-schema-form';
import sampleSchema1 from './sampleschema.json';
import { Subscription } from 'rxjs';
import { AppService, AppData } from './app.service';
import { RecomService } from './state/recom.service';
import { akitaDevtools } from '@datorama/akita';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  schema: any = sampleSchema1;
  title = 'app';
  data: ParserData[];
  options: string[];
  value: any;
  fieldValidators: { [fieldId: string]: Validator } = {};
  actions = {};
  schemaUrl: string;
  private subs: Subscription;
  dialogRef: MatDialogRef<DialogComponent> | null;

  constructor(private service: ParserService,
    public dialog: MatDialog,
    registry: WidgetRegistry,
    private appService: AppService,
    private recomService: RecomService,
    private ngZone: NgZone) {
    console.log(this.getParserData());
    akitaDevtools(ngZone);
  }

  ngOnInit(): void {
    this.subs = this.appService.dataChanged
      .subscribe((data: AppData | null) => {
        if (data) {
          this.schema = data.schema;
          return;
        }

        this.schema = sampleSchema1;
      });
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getParserData(): void {
    this.service.getData().subscribe(data => this.data = data);
  }


  onContentUpdate(event: any, value: any) {
    console.log(event + ' ' + value);
  }

  onButtonClick(value, ele) {
    console.log(value, ele);
    this.options = value;
    this.dialogRef = this.dialog.open(DialogComponent, {
      data: this.options,
    });
    // const dialogRef = this                               .dialog.open(DialogComponent, {
    //   data: ['is anteverted and gravid', 'is retroverted and gravid', '*.*'],
    // });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        console.log('undefined');
      } else {
        console.log('result:', result);
        document.getElementById(ele).innerHTML = result;
        this.recomService.add(null, null, result, 'empty');
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

  constructor(public dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string[]) {
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
