import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  static CLIENT_MUDULE_ID : number = 6;
  static SMTP_MUDULE_ID : number = 8;

  constructor() { }



  getDataSourceEstados(){
    let array :any = [];
    array[0] = {
      value: "",
      text: "Seleccione un estado"
    };

    array[1] = {
      value: "ACTIVO",
      text: "ACTIVO"
    };

    array[2] = {
      value: "INACTIVO",
      text: "INACTIVO"
    };
    return array;
  }

  manipulateData(data: any, name: string) : any[]{
    let dataSource = [];
    if(data !== null){
      dataSource = data;
      dataSource.unshift({
        id: '',
        name: `Seleccione ${name}`
      });
    }
    return dataSource;
  }
}
