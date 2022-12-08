import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, empty, Observable, Subject } from 'rxjs';
import { Agenda } from './agenda';
import { AgendaService } from './agenda.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})

export class AgendaComponent implements OnInit {

  constructor(
    private _agendaService: AgendaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  agenda$!: Observable<Agenda[]>;
  error$ = new Subject<boolean>();

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.agenda$ = this._agendaService.list()
    .pipe(
      catchError(error => {
        console.error(error);
        this.error$.next(true);
        return empty();
      })
    );
  }

  onEdit(id: any) {
    this.router.navigate(['agenda', id], { relativeTo: this.route });
  }

  onDelete(id: any) {
    this._agendaService.remove(id)
      .subscribe(
        success => {
          alert("Contato removido excluido com sucesso!")
          this.onRefresh()
        } 
    );
  }
}
