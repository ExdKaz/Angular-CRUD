import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  url: string = 'http://localhost:4000/employees/'

  addEmployee(data: any): Observable<any> {
    return this.http.post(this.url, data);
  }

  getEmployeeList(): Observable<any> {
    return this.http.get(this.url);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(this.url + `${id}`);
  }

  editEmployee(id: number, data: any): Observable<any> {
    return this.http.put(this.url + `${id}`, data);
  }
}
