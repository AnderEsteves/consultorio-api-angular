import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Medico } from '../../../models/models.medico';
import { MedicoService } from '../../../services/medicos/medico.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';

@Component({
  selector: 'app-medico-create',
  templateUrl: './medico-create.component.html',
  styleUrl: './medico-create.component.css'
})
export class MedicoCreateComponent {
  Medico = new Medico();

  constructor(private medicoServices: MedicoService, private router: Router, private dialog: MatDialog){}

  enviar(): void{
    if(this.validarDados()){
      this.medicoServices.post(this.Medico).subscribe({
        next: jsonMedico =>{
          this.exibirMensagemRedirecionar('Cadastro realizado com sucesso!');
        },
        error:(jsonErro) =>{
          this.exibirMensagemErro(jsonErro.status);
        }
      })
    }
  }

  exibirMensagemErro(status: Number){
    if(status === 400)
      this.exibirMensagem("Confira os dados")

    if(status === 500)
      this.exibirMensagem("Erro no servidor, entre em contato com o suporte")

    if(status === 0)
      this.exibirMensagem("Falha na requisição, entre em contato com o suporte")
  }

  validarDados(){
    let msg = '';

    if(this.Medico.CRM.length > 9)
      msg += 'CRM deve ter no máximo 9 caracteres.\n'

    if(this.Medico.CRM == '')
      msg += 'CRM é obrigatório.\n'


    if(this.Medico.Nome.length < 3 || this.Medico.Nome.length > 100 )
      msg += 'Nome deve conter de 3 a 100 caracteres.\n'

    const nomeRegex = /^[a-zA-ZÀ-ÿ\s]+$/;

    if(!nomeRegex.test(this.Medico.Nome) && this.Medico.Nome != '')
        msg += 'Nome deve conter apenas letras.\n'

    if(msg){
      this.exibirMensagem(msg)
      return false;
    }
    return true;
  }

  exibirMensagem(msg: string){
    this.dialog.open(AlertComponent, {data:{content: msg}})
  }

  exibirMensagemRedirecionar(msg: string){
    const ref = this.dialog.open(AlertComponent, {data:{content: msg}})

    ref.afterClosed().subscribe(
      ()=> {
        this.router.navigate(['/medico']);
      })
  }
}
