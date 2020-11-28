import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  @Output() menuHidden = new EventEmitter();

  constructor(private http: HttpClient) {}
}
