import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay } from "rxjs/operators";
import { constants } from '../../../config/app.constants';
import { ProfesionalSalud } from '../../models/profesional-salud.model';
import { EnvService } from '../utils/env.service';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalSaludService {

  constructor(private http: HttpClient,
    private env: EnvService) { }

    getAll() : Observable<any>{
      const headers = new HttpHeaders()
        .set('content-type','application/json')
        .set('Authorization','Bearer ' + localStorage.getItem('token'));

      const url = this.env.apiGatewayBackOffice + constants.config.profesional;

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

      const url = this.env.apiGatewayBackOffice + constants.config.profesional + id;
      console.log('URL', url);
      return this.http.get(url, {headers})
        .pipe(
          delay(500),
          catchError(err => of(err.error))
        );
    }
    create(ProfesionalSalud: ProfesionalSalud){
      const headers = new HttpHeaders()
        .set('content-type','application/json')
        .set('Authorization','Bearer ' + localStorage.getItem('token'));

      const url = this.env.apiGatewayBackOffice + constants.config.profesional;
      return this.http.post<ProfesionalSalud>(url, ProfesionalSalud, {headers})
      .pipe(
        delay(500),
        catchError(err => of(err.error))
      );
    }

    update(ProfesionalSalud){
      const headers = new HttpHeaders()
        .set('content-type','application/json')
        .set('Authorization','Bearer ' + localStorage.getItem('token'));
        console.log("prof",ProfesionalSalud);
      const url = this.env.apiGatewayBackOffice + constants.config.profesional + ProfesionalSalud.id;
      return this.http.put<ProfesionalSalud>(url, ProfesionalSalud, {headers})
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

      const url = this.env.apiGatewayBackOffice + constants.config.profesionalPaginationFilter;
      return this.http.post(url, params, {headers})
        .pipe(
          delay(200),
          catchError(err =>  of( err.error))
        );
    }
    inactivateAndActivate(ProfesionalSalud: ProfesionalSalud){
      const headers = new HttpHeaders()
        .set('content-type','application/json')
        .set('Authorization','Bearer ' + localStorage.getItem('token'));

      const url = this.env.apiGatewayBackOffice + constants.config.profesionalActivarInactivar + ProfesionalSalud.idPersona;
      return this.http.put<ProfesionalSalud>(url, ProfesionalSalud, {headers})
      .pipe(
        delay(500),
        catchError(err => of(err.error))
      );
    }
}

