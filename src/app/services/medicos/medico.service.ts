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


}



