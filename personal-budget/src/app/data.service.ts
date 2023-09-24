import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/budget'; // Adjust the API URL as needed
  private data: any[] = []; // Store the data here

  constructor(private http: HttpClient) { }

  fetchData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  setData(data: any[]): void {
    this.data = data;
  }

  getData(): any[] {
    return this.data;
  }
}