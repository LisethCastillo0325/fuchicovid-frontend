import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay } from "rxjs/operators";
import { constants } from '../../../config/app.constants';
import { FuncionarioPublico } from '../../models/funcionario-publico.model';
import { EnvService } from '../utils/env.service';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioPublicoService {

  constructor(private http: HttpClient,
    private env: EnvService) { }

    getAll() : Observable<any>{
      const headers = new HttpHeaders()
        .set('content-type','application/json')
        .set('Authorization','Bearer ' + localStorage.getItem('token'));
  
      const url = this.env.apiGatewayBackOffice + constants.config.funcionario;
      
      return this.http.get(url, {headers})
        .pipe(
          delay(500),
          catchError(err => of(err.error))
        );
    }
    getById(id: number) : Observable<any>{
      const headers = new HttpHeaders()
        .set('content-type','application/json')
        .set('Authorization','Bearer ' + localStorage.getItem('token'));
  
      const url = this.env.apiGatewayBackOffice + constants.config.funcionario + id;
      console.log('URL', url);
      return this.http.get(url, {headers})
        .pipe(
          delay(500),
          catchError(err => of(err.error))
        );
    }
    create(funcionarioPublico: FuncionarioPublico){
      const headers = new HttpHeaders()
        .set('content-type','application/json')
        .set('Authorization','Bearer ' + localStorage.getItem('token'));
  
      const url = this.env.apiGatewayBackOffice + constants.config.funcionario;
      return this.http.post<FuncionarioPublico>(url, funcionarioPublico, {headers})
      .pipe(
        delay(500),
        catchError(err => of(err.error))
      );
    }
  
    update(funcionarioPublico){
      const headers = new HttpHeaders()
        .set('content-type','application/json')
        .set('Authorization','Bearer ' + localStorage.getItem('token'));
      const url = this.env.apiGatewayBackOffice + constants.config.funcionario + funcionarioPublico.id;
      return this.http.put<FuncionarioPublico>(url, funcionarioPublico, {headers})
      .pipe(
        delay(500),
        catchError(err => of(err.error))
      );
    }

    getAllPaginated(page: number, limit: number, filters?: any) : Observable<any> {
      const headers = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Authorization', 'Bearer ' + localStorage.getItem('token'));
      
      let params = {
        page:  page.toString(),
        limit: limit.toString(),
        filters: filters
      }
  
      const url = this.env.apiGatewayBackOffice + constants.config.funcionarioPaginationFilter;
      return this.http.post(url, params, {headers})
        .pipe(
          delay(200),
          catchError(err =>  of( err.error))
        );
    }
    inactivateAndActivate(funcionarioPublico: FuncionarioPublico){
      const headers = new HttpHeaders()
        .set('content-type','application/json')
        .set('Authorization','Bearer ' + localStorage.getItem('token'));
    
      const url = this.env.apiGatewayBackOffice + constants.config.funcionarioActivarInactivar + funcionarioPublico.id;
      return this.http.put<FuncionarioPublico>(url, funcionarioPublico, {headers})
      .pipe(
        delay(500),
        catchError(err => of(err.error))
      );
    }
}
