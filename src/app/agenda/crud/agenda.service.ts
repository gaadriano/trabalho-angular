import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, take, tap } from 'rxjs';
import { Agenda } from './agenda';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private _httpClient: HttpClient) { }
  
  private readonly API = "http://localhost:3000/agenda";

  list() {
    return this._httpClient.get<Agenda[]>(this.API)
    .pipe(
      delay(2000),
      tap(console.log)
    );
  }

  loadById(id: any) {
    return this._httpClient.get<Agenda>(`${this.API}/${id}`).pipe(take(1));
  }

  private create(agenda: any) {
    return this._httpClient.post(this.API, agenda).pipe(take(1));
  }

  private update(agenda: any) {
    return this._httpClient.put(`${this.API}/${agenda.id}`, agenda).pipe(take(1));
  }

  save(agenda: any) {
    if (agenda.id) {
      return this.update(agenda);
    }
    return this.create(agenda);
  }

  remove(id: any){
    return this._httpClient.delete(`${this.API}/${id}`).pipe(take(1))
  }
}
