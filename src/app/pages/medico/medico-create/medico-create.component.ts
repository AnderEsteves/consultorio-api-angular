import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Medico } from '../../../models/models.medico';
import { MedicoService } from '../../../services/medicos/medico.service';

@Component({
  selector: 'app-medico-create',
  templateUrl: './medico-create.component.html',
  styleUrl: './medico-create.component.css'
})
export class MedicoCreateComponent {
  Medico = new Medico();

  constructor(private medicoServices: MedicoService, private router: Router){}

  enviar(): void{
      this.medicoServices.post(this.Medico).subscribe({
        next: jsonMedico =>{
          alert('Cadastro realizado com sucesso!');
          this.router.navigate(['/medico']);
        },
        error:(jsonErro) =>{
          this.exibirMensagemErro(jsonErro.status);
        }
      })
  }

  exibirMensagemErro(status: Number){
    if(status === 400)
      alert("Confira os dados")

    if(status === 500)
      alert("Erro no servidor, entre em contato com o suporte")

    if(status === 0)
      alert("Falha na requisição, entre em contato com o suporte")
  }
}
