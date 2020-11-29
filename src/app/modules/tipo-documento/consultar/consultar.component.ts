import { Component, OnInit } from '@angular/core';
import { TipoDocumentoService } from '../../../services/tipo-documento/tipo-documento.service';
import { AlertMessagesService } from '../../../services/alert/alert-messages.service';
import { constants } from '../../../../config/app.constants';
import { TipoDocumento } from '../../../models/tipo-documento.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

  tiposDocumentos: TipoDocumento[] = [];

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


  constructor(private _tipoDocumento: TipoDocumentoService,
              private _alertMessagesService: AlertMessagesService,
              private fb: FormBuilder) {
                this.createForm();

              }

  ngOnInit(): void {
    this.getAll();
  }

  createForm(){
    this.forma = this.fb.group({
      id: [''],
      nombre: ['']
    });
  }

  getAll(isBtnSearch?:boolean){

    this._alertMessagesService.showMessageLoading();
    this._tipoDocumento.getAllPaginated(this.currentPage, this.limitData, this.filters).subscribe(response => {
      console.log(response);
      if(!response.ok){
        this._alertMessagesService.showMessage('error', response.message);
      }else{
        this.tiposDocumentos = response.data.data;

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
