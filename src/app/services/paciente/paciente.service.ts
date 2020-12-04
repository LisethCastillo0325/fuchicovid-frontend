import { Injectable } from '@angular/core';
import { delay, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { constants } from '../../../config/app.constants';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EnvService } from '../utils/env.service';
import { Paciente } from '../../models/paciente.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http: HttpClient,
    private env: EnvService) { }

  getAll() : Observable<any>{
    const headers = new HttpHeaders()
      .set('content-type','application/json')
      .set('Authorization','Bearer ' + localStorage.getItem('token'));

    const url = this.env.apiGatewayBackOffice + constants.config.paciente;
    console.log('URL', url);
    return this.http.get(url, {headers})
      .pipe(
        delay(500),
        catchError(err => of(err.error))
      );
  }

  getAllPaginated(page: number, limit: number, filters?: any) : Observable<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    //console.log(headers);
    let params = {
      page:  page.toString(),
      limit: limit.toString(),
      filters: filters
    }

    const url = this.env.apiGatewayBackOffice + constants.config.pacientePaginationFilter;
    return this.http.post(url, params, {headers})
      .pipe(
        delay(200),
        catchError(err =>  of( err.error))
      );
  }

  getById(id: number) : Observable<any>{
    const headers = new HttpHeaders()
      .set('content-type','application/json')
      .set('Authorization','Bearer ' + localStorage.getItem('token'));

    const url = this.env.apiGatewayBackOffice + constants.config.paciente + id;
    console.log('URL', url);
    return this.http.get(url, {headers})
      .pipe(
        delay(500),
        catchError(err => of(err.error))
      );
  }

  create(paciente: Paciente){
    const headers = new HttpHeaders()
    .set('content-type','application/json')
    .set('Authorization','Bearer ' + localStorage.getItem('token'));

    const url = this.env.apiGatewayBackOffice + constants.config.paciente;
    return this.http.post<Paciente>(url, paciente, {headers})
      .pipe(
        delay(500),
        catchError(err => of(err.error))
      );
  }

  update(paciente: Paciente){
    const headers = new HttpHeaders()
      .set('content-type','application/json')
      .set('Authorization','Bearer ' + localStorage.getItem('token'));

    const url = this.env.apiGatewayBackOffice + constants.config.paciente + paciente.id;
    return this.http.put<Paciente>(url, paciente, {headers})
      .pipe(
        delay(500),
        catchError(err => of(err.error))
      );
  }

  inactivateAndActivate(paciente: Paciente){
    const headers = new HttpHeaders()
      .set('content-type','application/json')
      .set('Authorization','Bearer ' + localStorage.getItem('token'));

    const url = this.env.apiGatewayBackOffice + constants.config.pacienteActivarInactivar + paciente.id;
    return this.http.put<Paciente>(url, paciente, {headers})
      .pipe(
        delay(500),
        catchError(err => of(err.error))
      );
  }
}
