import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent, DialogComponent } from './app.component';
import { ParserService } from './parser.service';
import { HttpClientModule } from '@angular/common/http';
import { ContenteditableModelDirective } from './contenteditable-model';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [
    AppComponent,
    ContenteditableModelDirective,
    KeysPipe,
    DialogComponent
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
  ],
  providers: [ParserService, RecomService, { provide: WidgetRegistry, useClass: DefaultWidgetRegistry },
    {
      provide: SchemaValidatorFactory,
      useClass: ZSchemaValidatorFactory
    }],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
