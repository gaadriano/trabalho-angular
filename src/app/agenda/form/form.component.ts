import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AgendaService } from '../crud/agenda.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form!: FormGroup;
  submited = false;

  constructor(
    private fb: FormBuilder,
    private service: AgendaService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const agenda = this.route.snapshot.data['agenda'];

    this.form = this.fb.group({
      id: [agenda.id],
      nome: [agenda.nome],
      telefone: [agenda.telefone],
      email: [agenda.email],
      empresa: [agenda.empresa],
    });
  }

  onSubmit() {
    this.submited = true;
    if (this.form.valid) {
      
      let msgSucess = 'Contato registrado com sucesso!';

      if (this.form.value.id) {
        msgSucess = 'Contato atualizado com sucesso!';
      }

      this.service.save(this.form.value).subscribe(
        sucesso => {
          alert(msgSucess);
          this.location.back();
        },
      )
    }
  }

  onCancel() {
    this.submited = false;
    this.location.back();
  }
}