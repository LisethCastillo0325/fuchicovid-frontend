import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { delay, catchError } from "rxjs/operators";
import { EnvService } from '../utils/env.service';
import { Observable, of } from 'rxjs';
import { constants } from '../../../config/app.constants';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  constructor(private http: HttpClient,
              private env: EnvService) { }

  getAll() : Observable<any>{
    const headers = new HttpHeaders()
      .set('content-type','application/json')
      .set('Authorization','Bearer ' + localStorage.getItem('token'));

    const url = this.env.apiGatewayBackOffice + constants.config.tipoDocumento;
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

    const url = this.env.apiGatewayBackOffice + constants.config.tipoDocumentoPaginationFilter;
    return this.http.post(url, params, {headers})
      .pipe(
        delay(200),
        catchError(err =>  of( err.error))
      );
  }


}
