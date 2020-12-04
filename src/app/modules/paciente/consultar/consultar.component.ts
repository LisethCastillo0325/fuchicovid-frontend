import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../../models/paciente.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PacienteService } from '../../../services/paciente/paciente.service';
import { AlertMessagesService } from '../../../services/alert/alert-messages.service';
import { DataSourceService } from '../../../services/data-source/data-source.service';
import { Ciudad } from '../../../models/ciudad.model';
import { TipoDocumento } from '../../../models/tipo-documento.model';
import { ProfesionalSalud } from '../../../models/profesional-salud.model';
import { Departamento } from '../../../models/departamento.model';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

  pacientes : Paciente[] = [];

  //source
  dataSourceEstados: any[] = [];
  dataSourceCiudad : Ciudad[] = [];
  dataSourceDepartamento : Departamento[] = [];
  dataSourceTipoDocumento: TipoDocumento[] = [];
  dataSourceMedico: ProfesionalSalud[] = []

  //form
  forma: FormGroup;

  //filter
  filters: any;

  //pagination
  limitData: number = 5;
  currentPage: number = 1;
  pagesForEachGroup: number = 3;
  currentPageGroup: number = 1;
  arrayPagesNumbers: number[] = [];
  totalPages: number;
  startPage: number;
  endPage: number;
  totalPageGroups: number;
  isSearch: boolean = false;

  constructor(private _pacienteService: PacienteService,
              private _alertMessagesService: AlertMessagesService,
              private _dataSourceService: DataSourceService,
              private fb: FormBuilder) {
                this.createForm();
                this.getSourceEstados();
                this.getSourceDepartamento();
                this.getSourceTipoDocumento();
                this.createListeners();
                //this.getSourceMedico();

              }

  ngOnInit(): void {
    this.getAll();
  }

  createForm(){
    this.forma = this.fb.group({
      id: [''],
      nombre: [''],
      estado: [''],
      numeroDocumento: [''],
      tipodoDumento: [''],
      ciudad: [''],
      departamento: ['']
    });
  }

  createListeners(){
    // escuchar un campo en especifico
    this.forma.get('departamento').valueChanges.subscribe(
      value => {
        this.forma.get('ciudad').setValue('');
        if(value > 0){
          this.getSourceCiududPorDepartamento(value);
        }
      }
    );
  }

  async getSourceEstados(){
    this.dataSourceEstados = await this._dataSourceService.getDataSourceEstados();
  }

  async getSourceDepartamento(){
    this.dataSourceDepartamento = await this._dataSourceService.getDataSourceDepartamento();
  }

  async getSourceTipoDocumento(){
    this.dataSourceTipoDocumento = await this._dataSourceService.getDataSourceTipoDocumento();
  }

  async getSourceMedico(){
    this.dataSourceMedico = await this._dataSourceService.getDataSourceProfesionalSalud();
  }

  async getSourceCiududPorDepartamento(id_departamento: number){
    this.dataSourceCiudad = await this._dataSourceService.getDataSourceCiudadPorDepartmento(id_departamento);
  }


  getAll(isBtnSearch?:boolean){

    this._alertMessagesService.showMessageLoading();
    this._pacienteService.getAllPaginated(this.currentPage, this.limitData, this.filters).subscribe(response => {
      console.log(response);
      if(!response.ok){
        this._alertMessagesService.showMessage('error', response.message);
      }else{
        this.pacientes = response.data.data;
        //Paginación
        this.currentPage = response.data.page;
        this.totalPages = response.data.totalPages;
        this.totalPageGroups = Math.ceil(this.totalPages / this.pagesForEachGroup);
        this.setPageValues();
        this.pagesNumbers();

        this._alertMessagesService.closeMessage();
      }

    },
    error =>{
      this._alertMessagesService.showMessage('error', error);
      this._alertMessagesService.closeMessage();
    });

  }

  inactivateAndActivate(paciente: Paciente){
    let mensaje : string;
    if(paciente.estado == 'ACTIVO'){
      mensaje = 'inactivar ';
    }else{
      mensaje = 'activar';
    }

    this._alertMessagesService.confirmationMessage('warning','', `Está seguro de ${mensaje} este registro?`,`Si, ${mensaje} `)
      .then(result => {
        if(result.isConfirmed){

          if(paciente.estado == 'ACTIVO'){
            paciente.estado = 'INACTIVO';
          }else{
            paciente.estado = 'ACTIVO';
          }

          this._pacienteService.inactivateAndActivate(paciente).subscribe(
            response => {
              if(response === null){
                this._alertMessagesService.showMessage('error', 'se presentó un error en el api');
              }else{
                if(!response.ok){
                  this._alertMessagesService.showMessage('error', response.message);
                }else{
                  let nameForm : string = this.forma.get('nombre').value;
                  this._alertMessagesService.showMessage('success', response.message, nameForm.toUpperCase() , false, 2000);
                }
              }
            }
          );
        }
      });
  }

  // Paginación

  search(){
    this.currentPage = 1;
    this.currentPageGroup = 1;
    this.filters = this.forma.value;
    this.isSearch = true;
    this.getAll(true);
  }

  pagesNumbers(){
    this.arrayPagesNumbers = [];
    for (let index = this.startPage; index <= this.endPage; index++) {
      this.arrayPagesNumbers.push(index);
    }
  }

  setPageValues(){
    this.endPage   = (this.pagesForEachGroup * this.currentPageGroup);
    this.startPage = ((this.endPage - this.pagesForEachGroup) + 1);
    if(this.endPage > this.totalPages){
      this.endPage = this.totalPages;
    }
  }

  changePage(page: number){
    this.currentPage = page;
    if(this.currentPage === 1){
      this.currentPageGroup = 1;
      this.setPageValues();
    }else if(this.currentPage === this.totalPages){
      this.currentPageGroup = this.totalPageGroups;
      this.setPageValues();
    }
    this.getAll();
  }

  nextPage(){
    if(this.currentPage === this.endPage){
      this.nextPageGroup();
    }else{
      this.currentPage++;
    }
    this.getAll();
  }

  previousPage(){
    if(this.currentPage === this.startPage){
      this.previousPageGroup();
    }else{
      this.currentPage--;
    }
    this.getAll();
  }

  nextPageGroup(){
    this.currentPageGroup++;
    this.setPageValues();
    this.currentPage = this.startPage;
    this.getAll();
  }

  previousPageGroup(){
    this.currentPageGroup--;
    this.setPageValues();
    this.currentPage = this.endPage;
    this.getAll();
  }

}
