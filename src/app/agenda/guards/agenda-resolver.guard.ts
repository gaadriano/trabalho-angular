import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Agenda } from '../crud/agenda';
import { AgendaService } from '../crud/agenda.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaResolverGuard implements Resolve<Agenda> {

  constructor(
    private service: AgendaService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Agenda> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }

    return of({
      id: '',
      nome: '',
      telefone: '',
      email: '',
      empresa: ''
    });
  }
}