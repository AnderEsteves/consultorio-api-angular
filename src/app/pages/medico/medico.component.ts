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

  constructor(private medicoServices: MedicoService){
    this.Medicos = [];
  }

  pesquisar():void{
    this.medicoServices.getAll().subscribe({
      next:(jsonMedico: Medico[]) =>{
        this.Medicos = jsonMedico;
      }
    })
  }

}
