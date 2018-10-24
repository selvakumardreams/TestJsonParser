import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable, BehaviorSubject } from 'rxjs';
import { ParserData } from './parser.data';
import { Recom } from './state/recom.model';
import { RecomService } from './state/recom.service';

@Injectable({
  providedIn: 'root'
})
export class ParserService {
  parserUrl = 'assets/data/recom.json';  // URL to web api
  data: BehaviorSubject<ParserData[]>;

  constructor(private http: HttpClient,
  private recomService: RecomService) {
    this.data = new BehaviorSubject<Array<ParserData>>([]);
  }

  getData(): Observable<any> {
    return this.http.get<ParserData[]>(this.parserUrl);
  }

  setParserData(): void {
    this.getData().subscribe(data => {
      this.data.next(data);
      this.recomService.addJson(data);
    });
  }
}
