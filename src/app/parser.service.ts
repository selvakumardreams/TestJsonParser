import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParserData } from './parser.data';

@Injectable({
  providedIn: 'root'
})
export class ParserService {
  parserUrl = 'assets/data/recom.json';  // URL to web api

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<ParserData[]>(this.parserUrl);
  }
}
