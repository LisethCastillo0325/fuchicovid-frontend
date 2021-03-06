import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfesionalSalud } from '../../../models/profesional-salud.model';
import { AlertMessagesService } from '../../../services/alert/alert-messages.service';
import { DataSourceService } from '../../../services/data-source/data-source.service';
import { ProfesionalSaludService } from '../../../services/profesional-salud/profesional-salud.service';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

  profesionalesSalud: ProfesionalSalud[] = [];

  //source
  dataSourceEstados: any[] = [];

  //form
  forma: FormGroup;

  //filter
  filters: any;

  //pagination
  limitData: number = 10;
  currentPage: number = 1;
  pagesForEachGroup: number = 3;
  currentPageGroup: number = 1;
  arrayPagesNumbers: number[] = [];
  totalPages: number;
  startPage: number;
  endPage: number;
  totalPageGroups: number;
  isSearch: boolean = false;


  constructor(private _ProfesionalSaludService: ProfesionalSaludService,
              private _alertMessagesService: AlertMessagesService,
              private _dataSourceService : DataSourceService,
              private fb: FormBuilder) {
                this.createForm();
                this.getSourceEstados();
              }

  ngOnInit(): void {
    this.getAll();
  }

  createForm(){
    this.forma = this.fb.group({
      id: [''],
      nombre: [''],
      estado: [''],
      numeroIdentificacion: [''],
      idTipoIdentificacion:[''],
      universiad:[''],
      eps:['']
    });
  }

  async getSourceEstados(){

    this.dataSourceEstados = await this._dataSourceService.getDataSourceEstados();
      
  }

  getAll(isBtnSearch?:boolean){

    this._alertMessagesService.showMessageLoading();
    

    this._ProfesionalSaludService.getAllPaginated(this.currentPage, this.limitData, this.filters).subscribe(response => {
      
      console.log("coqrwerqwersas",response.data);
      if(!response.ok){
        this._alertMessagesService.showMessage('error', response.message);
      }else if(response.data.data===undefined){

      }
      else{
        this.profesionalesSalud = response.data.data;
        console.log("prueqwerqewrba",response.data.data);
        // console.log("prueba",this.profesionalesSalud);
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

  inactivateAndActivate(ProfesionalSalud: ProfesionalSalud){
    let mensaje : string;
    console.log(ProfesionalSalud,'lo que recibe');
    if(ProfesionalSalud.idPersona2.estado == 'ACTIVO'){
      mensaje = 'inactivar ';
    }else{
      mensaje = 'activar';
    }

    this._alertMessagesService.confirmationMessage('warning','', `Está seguro de ${mensaje} este registro?`,`Si, ${mensaje} `)
      .then(result => {
        if(result.isConfirmed){

          if(ProfesionalSalud.idPersona2.estado == 'ACTIVO'){
            ProfesionalSalud.idPersona2.estado = 'INACTIVO';
          }else{
            ProfesionalSalud.idPersona2
            .estado = 'ACTIVO';
          }

          this._ProfesionalSaludService.inactivateAndActivate(ProfesionalSalud).subscribe(
            response => {
              if(response === null){
                this._alertMessagesService.showMessage('error', 'se presentó un error en el api');
              }else{
                if(!response.ok){
                  this._alertMessagesService.showMessage('error', response.message);
                }else{
                  console.log("prueba cosas",this.forma.get('nombre'));
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
    console.log("cosas de buscar",this.filters);
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
