import { Injectable } from '@angular/core';
import { CiudadService } from '../ciudad/ciudad.service';
import { ProfesionalSaludService } from '../profesional-salud/profesional-salud.service';
import { TipoDocumentoService } from '../tipo-documento/tipo-documento.service';
import { DepartamentoService } from '../departamento/departamento.service';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  static CLIENT_MUDULE_ID : number = 6;
  static SMTP_MUDULE_ID : number = 8;

  constructor(private _ciudadService: CiudadService,
              private _profesionalSalud: ProfesionalSaludService,
              private _tipoDocumento: TipoDocumentoService,
              private _departamentoService: DepartamentoService) { }

  async getDataSourceCiudad() : Promise<any[]> {
    let response = await this._ciudadService.getAll().toPromise();
    return this.manipulateData(response.data, 'una ciudad');
  }

  async getDataSourceDepartamento() : Promise<any[]> {
    let response = await this._departamentoService.getAll().toPromise();
    return this.manipulateData(response.data, 'un departamento');
  }

  async getDataSourceProfesionalSalud() : Promise<any[]> {
    let response = await this._profesionalSalud.getAll().toPromise();
    return this.manipulateData(response.data, 'un médico');
  }

  async getDataSourceTipoDocumento(filters?:any) : Promise<any[]> {
    let response = await this._tipoDocumento.getAllUsingFilters(filters).toPromise();
    return this.manipulateData(response.data.data, 'un tipo documento');
  }

  async getDataSourceCiudadPorDepartmento(departmentId : number) : Promise<any[]>{
    let response = await  this._ciudadService.getAllByDepartamento(departmentId).toPromise();
    return this.manipulateData(response.data, 'una Ciudad');
  }

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

  getDataSourceEstadoEnfermedad(){
    let array :any = [];
    array[0] = {
      value: "",
      text: "Seleccione un estado"
    };

    array[1] = {
      value: "TRATAMIENTO",
      text: "TRATAMIENTO"
    };

    array[2] = {
      value: "CURADO",
      text: "CURADO"
    };
    return array;
  }

  manipulateData(data: any, name: string) : any[]{
    let dataSource = [];
    if(data !== null){
      dataSource = data;
      dataSource.unshift({
        id: '',
        nombre: `Seleccione ${name}`
      });
    }
    return dataSource;
  }
}
