import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay } from "rxjs/operators";
import { constants } from '../../../config/app.constants';
import { Universidad } from '../../models/universidad.model';
import { EnvService } from '../utils/env.service';


@Injectable({
  providedIn: 'root'
})
export class UniversidadService {

  constructor(private http: HttpClient,
    private env: EnvService) { }

    getAll() : Observable<any>{
      const headers = new HttpHeaders()
        .set('content-type','application/json')
        .set('Authorization','Bearer ' + localStorage.getItem('token'));
  
      const url = this.env.apiGatewayBackOffice + constants.config.universidad;
      
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
  
      const url = this.env.apiGatewayBackOffice + constants.config.universidad + id;
      console.log('URL', url);
      return this.http.get(url, {headers})
        .pipe(
          delay(500),
          catchError(err => of(err.error))
        );
    }
    create(universidad: Universidad){
      const headers = new HttpHeaders()
        .set('content-type','application/json')
        .set('Authorization','Bearer ' + localStorage.getItem('token'));
  
      const url = this.env.apiGatewayBackOffice + constants.config.universidad;
      return this.http.post<Universidad>(url, universidad, {headers})
      .pipe(
        delay(500),
        catchError(err => of(err.error))
      );
    }
  
    update(universidad){
      const headers = new HttpHeaders()
        .set('content-type','application/json')
        .set('Authorization','Bearer ' + localStorage.getItem('token'));
      const url = this.env.apiGatewayBackOffice + constants.config.universidad + universidad.id;
      return this.http.put<Universidad>(url, universidad, {headers})
      .pipe(
        delay(500),
        catchError(err => of(err.error))
      );
    }

}
