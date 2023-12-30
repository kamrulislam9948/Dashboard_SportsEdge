import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Manager } from '../../models/data/manager';
import { apiBaseUrl } from '../../shared/app-constants';
import { UploadResponse } from '../../models/common/upload-response';


@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  constructor(
    private http:HttpClient
  ) { }
  
  getManagers(): Observable<Manager[]> {
    return this.http.get<Manager[]>(`${apiBaseUrl}/api/Managers`);
  }
  getManagersWithEvents():Observable<Manager[]> {
    return this.http.get<Manager[]>(`${apiBaseUrl}/api/Managers/Events/Include`);
  }
  getManagerById(id: number): Observable<Manager> {
    return this.http.get<Manager>(`${apiBaseUrl}/api/Managers/${id}`);
  }  
  create(data: Manager): Observable<Manager> {
    return this.http.post<Manager>(`${apiBaseUrl}/api/Managers`, data);
  }
  
  uploadImage(id: number, formData: FormData): Observable<UploadResponse> {
    return this.http.post<UploadResponse>(`${apiBaseUrl}/api/Managers/Upload/${id}`, formData);
  }
  

  // save(data:Item):Observable<Item>
  // {
  //   return this.http.post<Item>(`${apiBaseUrl}/api/Items`, data);
  // }

  update(data: Manager): Observable<any> {
    return this.http.put<Manager>(`${apiBaseUrl}/api/Managers/${data.managerId}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${apiBaseUrl}/api/Managers/${id}`);
  }
}