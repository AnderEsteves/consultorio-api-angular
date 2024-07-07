import { Component } from '@angular/core';
import { Medico } from '../../models/models.medico';
import { MedicoService } from '../../services/medicos/medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrl: './medico.component.css'
})
export class MedicoComponent {

  Medicos: Medico[];
  Crm : string;
  Nome : string;
  Id: string;

  constructor(private medicoServices: MedicoService){
    this.Medicos = [];
    this.Crm = '';
    this.Nome = '';
    this.Id = '';
  }

  pesquisar():void{

    this.Medicos = [];

    if(this.Id || this.Id == '0')
      return this.pesquisarPorId();

    if(this.Crm)
     return this.pesquisarPorCrm();

    if(this.Nome)
      return this.pesquisarPorNome();

    this.pesquisarTudo();
  }


  pesquisarTudo():void{
    this.medicoServices.getAll().subscribe({
      next:(jsonMedico: Medico[]) =>{
        this.Medicos = jsonMedico;
        if(this.Medicos.length == 0)
        this.exibirMensagemErro(404);
      },
      error: jsonErro =>{
        this.exibirMensagemErro(jsonErro.status);
      }
    })
  }

  pesquisarPorId():void{
    this.medicoServices.getId(Number(this.Id)).subscribe({
      next: jsonMedico => {
       this.Medicos = [jsonMedico];
      },
      error: jsonErro =>{
        this.exibirMensagemErro(jsonErro.status);
      }
    })
  }


  pesquisarPorCrm():void{
    this.medicoServices.getCrm(this.Crm).subscribe({
      next: jsonMedico => {
       this.Medicos = [jsonMedico];
       if(this.Medicos.length == 0)
        this.exibirMensagemErro(404);
      },
      error: jsonErro =>{
        this.exibirMensagemErro(jsonErro.status);
      }
    })
  }

  pesquisarPorNome():void{
    this.medicoServices.getNome(this.Nome).subscribe({
      next: jsonMedico => {
       this.Medicos = jsonMedico;
       if(this.Medicos.length == 0)
          this.exibirMensagemErro(404);
      },
      error: jsonErro =>{
        this.exibirMensagemErro(jsonErro.status);
      }
    })
  }


  exibirMensagemErro(status: Number){
    if(status === 404)
      alert("Dado não encontrado")

    if(status === 500)
      alert("Erro no servidor, entre em contato com o suporte")

    if(status === 0)
      alert("Falha na requisição, entre em contato com o suporte")
  }

}
