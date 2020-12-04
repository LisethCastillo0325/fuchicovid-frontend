import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay } from "rxjs/operators";
import { constants } from '../../../config/app.constants';
import {Eps_model } from '../../models/eps.model';
import { EnvService } from '../utils/env.service';


@Injectable({
  providedIn: 'root'
})
export class EntidadPromotoraService {

constructor(private http: HttpClient,
  private env: EnvService) { }

  getAll() : Observable<any>{
    const headers = new HttpHeaders()
      .set('content-type','application/json')
      .set('Authorization','Bearer ' + localStorage.getItem('token'));

    const url = this.env.apiGatewayBackOffice + constants.config.eps;
    
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

    const url = this.env.apiGatewayBackOffice + constants.config.eps + id;
    console.log('URL', url);
    return this.http.get(url, {headers})
      .pipe(
        delay(500),
        catchError(err => of(err.error))
      );
  }
  create(eps: Eps_model){
    const headers = new HttpHeaders()
      .set('content-type','application/json')
      .set('Authorization','Bearer ' + localStorage.getItem('token'));

    const url = this.env.apiGatewayBackOffice + constants.config.eps;
    return this.http.post<Eps_model>(url, eps, {headers})
    .pipe(
      delay(500),
      catchError(err => of(err.error))
    );
  }

  update(eps){
    const headers = new HttpHeaders()
      .set('content-type','application/json')
      .set('Authorization','Bearer ' + localStorage.getItem('token'));
    const url = this.env.apiGatewayBackOffice + constants.config.eps + eps.id;
    return this.http.put<Eps_model>(url, eps, {headers})
    .pipe(
      delay(500),
      catchError(err => of(err.error))
    );
  }
}
