import { Component } from '@angular/core';
import { Paciente } from '../../models/models.paciente';
import { PacienteService } from '../../services/pacientes/paciente.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})
export class PacienteComponent {

  Paciente: Paciente[];
  CodigoInput: string;
  NomeInput: string;
  DataNascimentoInput: string;

  constructor(private pacienteServices: PacienteService){
    this.Paciente = [];
    this.CodigoInput = '';
    this.NomeInput = '';
    this.DataNascimentoInput = '';
  }

  pesquisar(): void{
    console.log("oi");
    this.pacienteServices.getAll().subscribe({
      next: (jsonPaciente : Paciente[]) =>{
        this.Paciente = jsonPaciente;
        console.log(this.Paciente);
      }
    })
  }
}
