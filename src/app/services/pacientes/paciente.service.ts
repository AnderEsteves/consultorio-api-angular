import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../../models/models.paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Paciente[]>{
    return this.httpClient.get<Paciente[]>('https://localhost:44309/api/pacientes')
  }

}
