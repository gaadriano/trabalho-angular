import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaComponent } from './agenda/crud/agenda.component';
import { FormComponent } from './agenda/form/form.component';
import { AgendaResolverGuard } from './agenda/guards/agenda-resolver.guard';

const routes: Routes = [
  { path: '', component: AgendaComponent },
  {
    path: 'agenda', component: FormComponent,
    resolve: {
      agenda: AgendaResolverGuard
    }
  },
  {
    path: 'agenda/:id', component: FormComponent,
    resolve: {
      agenda: AgendaResolverGuard
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
