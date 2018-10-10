import { Component, OnInit } from '@angular/core';
import { ParserService } from './parser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  constructor(private parseService: ParserService) {}

  ngOnInit(): void {
    this.parseService.setParserData();
  }
}
