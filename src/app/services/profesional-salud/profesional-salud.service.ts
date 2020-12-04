import { Injectable } from '@angular/core';
import { EnvService } from '../utils/env.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { constants } from '../../../config/app.constants';
import { delay, catchError } from 'rxjs/operators';

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

    const url = this.env.apiGatewayBackOffice + constants.config.profesionalSalud;
    console.log('URL', url);
    return this.http.get(url, {headers})
      .pipe(
        delay(500),
        catchError(err => of(err.error))
      );
  }
}
