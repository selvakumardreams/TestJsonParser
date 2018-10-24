import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ParserService } from './parser.service';
import { HttpClientModule } from '@angular/common/http';
import { ContenteditableModelDirective } from './contenteditable-model';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ROUTES } from './app.routes';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { AngularWebStorageModule } from 'angular-web-storage';
import { ReactiveFormsModule } from '@angular/forms';

import {
  SchemaFormModule,
  SchemaValidatorFactory,
  ZSchemaValidatorFactory,
  TemplateSchemaModule,
  WidgetRegistry,
  DefaultWidgetRegistry
} from 'ngx-schema-form';
import { KeysPipe } from './keys.pipe';
import { RecomService } from './state/recom.service';
import { ReportComponent } from './report/report.component';
import { DashboardComponent, DialogComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ContenteditableModelDirective,
    KeysPipe,
    DialogComponent,
    ReportComponent,
    DashboardComponent
  ],
  imports: [
    SchemaFormModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    AngularWebStorageModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
  ],
  providers: [ParserService, {provide: MAT_DIALOG_DATA, useValue: {}},
    RecomService, {provide: MatDialogRef, useValue: {}},
    { provide: WidgetRegistry, useClass: DefaultWidgetRegistry },
    {
      provide: SchemaValidatorFactory,
      useClass: ZSchemaValidatorFactory
    }],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
