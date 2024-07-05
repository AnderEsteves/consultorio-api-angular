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

    console.log(this.Id);

    if(this.Id || this.Id == '0' )
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
      }
    })
  }

  pesquisarPorCrm():void{
    this.medicoServices.getCrm(this.Crm).subscribe({
      next: jsonMedico => {
       this.Medicos = [jsonMedico];
      }
    })
  }

  pesquisarPorNome():void{
    this.medicoServices.getNome(this.Nome).subscribe({
      next: jsonMedico => {
       this.Medicos = jsonMedico;
      }
    })
  }

  pesquisarPorId(): void{
    this.medicoServices.getId(Number(this.Id)).subscribe({
      next: jsonMedico =>{
        this.Medicos = [jsonMedico];
      }
    })
  }


}
