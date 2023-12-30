import { HttpClient } from "@angular/common/http";
import { apiBaseUrl } from "../../shared/app-constants";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { UploadResponse } from "../../models/common/upload-response";
import { Event } from '../../models/data/event';


@Injectable({
    providedIn: 'root'
  })
  export class EventService {
    constructor(
      private http:HttpClient
    ) { }
    
    getEvents(): Observable<Event[]> {
      return this.http.get<Event[]>(`${apiBaseUrl}/api/Events`)    
    }
  
    getEventsWithManager(): Observable<Event[]> {
      return this.http.get<Event[]>(`${apiBaseUrl}/api/Events/Managers/Include`)    
    }
    getEventsWithSelectionPanel(): Observable<Event[]> {
      return this.http.get<Event[]>(`${apiBaseUrl}/api/Events/SelectionPanel/Include`)    
    }
    getEventById(id: number): Observable<Event> {
      return this.http.get<Event>(`${apiBaseUrl}/api/Events/${id}`);
    }  
    getEventsWithManagerById(id:number): Observable<Event[]>
    {
      return this.http.get<Event[]>(`${apiBaseUrl}/api/Events/Manager/Include/${id}`)
    }
    getEventsWithSelectionPanelById(id:number): Observable<Event[]>
    {
      return this.http.get<Event[]>(`${apiBaseUrl}/api/Events/SelectionPanel/${id}`)
    }
  
    create(data:Event):Observable<Event>{
      console.log(data)
      return this.http.post<Event>(`${apiBaseUrl}/api/Events`, data);
    }
    update(data: Event): Observable<any> {
      return this.http.put<Event>(`${apiBaseUrl}/api/Events/${data.eventId}`, data);
    }
    getById(id: number): Observable<Event> {
      return this.http.get<Event>(`${apiBaseUrl}/api/Events/${id}`)
    }
    delete(id: number): Observable<any> {
      return this.http.delete<any>(`${apiBaseUrl}/api/Events/${id}`);
    }
    uploadImage(id: number, f: File): Observable<UploadResponse> {
      const formData = new FormData();
      formData.append('file', f);
      console.log(f);
      return this.http.post<UploadResponse>(`${apiBaseUrl}/api/Events/Upload/${id}`, formData);
    }
  }