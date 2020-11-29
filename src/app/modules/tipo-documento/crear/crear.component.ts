import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertMessagesService } from '../../../services/alert/alert-messages.service';
import { TipoDocumentoService } from '../../../services/tipo-documento/tipo-documento.service';
import { ValidatorsService } from '../../../services/validators/validators.service';
import { FieldValidation } from '../../../interfaces/field-validation.interface';
import { TipoDocumento } from '../../../models/tipo-documento.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  forma: FormGroup;
  formTitle = 'Crear Tipo Documento';
  isEditing = false;
  tipoDocumentoId : number = null;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private _alertMessagesService : AlertMessagesService,
              private fb: FormBuilder,
              private _tipoDocumentoService: TipoDocumentoService,
              private _validatorsService : ValidatorsService,) {
                this.tipoDocumentoId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
                this.createForm();
              }

  ngOnInit(): void {
    if(this.tipoDocumentoId){
      this.formTitle = 'Editar Tipo Documento';
      this.isEditing = true;
      this.showTipoDocumento();
    }
  }

  createForm(){
    this.forma = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  // validacion campos
  isInvalidField(name:string){
    return this.forma.get(name).invalid && this.forma.get(name).touched;
  }

  validateField(control: string) : FieldValidation {
    return this._validatorsService.validateField(this.forma.get(control));
  }

  async showTipoDocumento(){
    const response = await this._tipoDocumentoService.getById(this.tipoDocumentoId).toPromise();
    if(!response.ok){
      this._alertMessagesService.showMessage('error', response.message);
    }else{
      const tipoDocumento : TipoDocumento = response.data;
      this.forma.reset(
        {
          id: tipoDocumento.id,
          nombre: tipoDocumento.nombre
        }
      );
    }
  }

  save(){
    // si el formulario es invalido se marca como tocado cada campo y activa las validaciones
    if(this.forma.invalid){
      return Object.values(this.forma.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    this._alertMessagesService.showMessageLoading();

    let observable : Observable<any>;
    if(this.isEditing){
      observable = this._tipoDocumentoService.update(this.forma.value);
    }else{
      observable = this._tipoDocumentoService.create(this.forma.value);
    }

    observable.subscribe(response => {
      if(response === null){
        this._alertMessagesService.showMessage('error', 'se presentó un error en el api');
      }else{
        if(!response.ok){
          this._alertMessagesService.showMessage('error', response.message);
        }else{
          let nameForm : string = this.forma.get('nombre').value;
          this._alertMessagesService.showMessage('success', response.message, nameForm.toUpperCase() , false, 2000)
          .then(() => {
            this.forma.reset();
            this.router.navigate(['tipo-documento','consultar']);
          });
        }
      }
    },
    error =>{
      this._alertMessagesService.showMessage('error', error);
    });

  }

}
