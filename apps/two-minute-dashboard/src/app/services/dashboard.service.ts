import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashBoardData } from '../models/dashboard-data.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  public get() {
    return this.http.get('https://beachclean.azurewebsites.net/api/dashboard');
  }

  post(dashboardData: DashBoardData) {
    return this.http.post('https://beachclean.azurewebsites.net/api/dashboard', dashboardData);
  }
}
