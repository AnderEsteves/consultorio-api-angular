import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medico } from '../../models/models.medico';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Medico[]>{
    return this.httpClient.get<Medico[]>('https://localhost:44309/api/medicos');
  }

  getCrm(crm: string): Observable<Medico>{
    return this.httpClient.get<Medico>(`https://localhost:44309/api/medicos?CRM=${crm}`);
  }

  getId(id: number): Observable<Medico>{
    return this.httpClient.get<Medico>(`https://localhost:44309/api/medicos/${id}`)
  }

  getNome(nome: string): Observable<Medico[]>{
    return this.httpClient.get<Medico[]>(`https://localhost:44309/api/medicos?nome=${nome}`);
  }

  post(medico: Medico): Observable<Medico>{
    return this.httpClient.post<Medico>(`https://localhost:44309/api/medicos`, medico)
  }

  put(medico: Medico): Observable<Medico>{
    return this.httpClient.put<Medico>(`https://localhost:44309/api/medicos/${medico.Id}`, medico)
  }

  delete(id: Number): Observable<void>{
    return this.httpClient.delete<void>(`https://localhost:44309/api/medicos/${id}`)
  }

}



