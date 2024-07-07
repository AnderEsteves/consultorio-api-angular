import { Component } from '@angular/core';
import { Medico } from '../../../models/models.medico';
import { MedicoService } from '../../../services/medicos/medico.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-medico-edit',
  templateUrl: './medico-edit.component.html',
  styleUrl: './medico-edit.component.css'
})
export class MedicoEditComponent {

  Medico: Medico;

  constructor(private medicoServices: MedicoService, private activatedRoute: ActivatedRoute, private router: Router){
    this.Medico = new Medico;
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.medicoServices.getId(Number(id)).subscribe({
      next: (jsonMedico) =>{
        this.Medico = jsonMedico;
      },
      error: jsonErro =>{
        this.exibirMensagemErro(jsonErro.status);
      }
    })
  }

  atualizar(): void{
    if(this.validarDados()){
      this.medicoServices.put(this.Medico).subscribe({
        next: ()=>{
          alert('Atualizado com sucesso!');
          this.router.navigate(['/medico']);
        },
        error: jsonErro =>{
          this.exibirMensagemErro(jsonErro.status);
        }
      })
    }
  }

  excluir(): void{
    this.medicoServices.delete(this.Medico.Id).subscribe({
      next: () =>{
        alert('Excluído com sucesso!');
         this.router.navigate(['/medico']);
      },
      error: jsonErro =>{
        this.exibirMensagemErro(jsonErro.status);
      }
    })
  }


  exibirMensagemErro(status: Number){
    if(status === 400)
    alert("Preencha os dados corretamente")

    if(status === 404)
      alert("Dado não encontrado")

    if(status === 500)
      alert("Erro no servidor, entre em contato com o suporte")

    if(status === 0)
      alert("Falha na requisição, entre em contato com o suporte")
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
      alert(msg)
      return false;
    }
    return true;
  }

}
