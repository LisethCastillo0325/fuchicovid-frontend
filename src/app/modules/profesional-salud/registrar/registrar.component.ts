import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FieldValidation } from '../../../interfaces/field-validation.interface';
import { Eps_model } from '../../../models/eps.model';
import { TipoDocumento } from '../../../models/tipo-documento.model';
import { Universidad } from '../../../models/universidad.model';
import { AlertMessagesService } from '../../../services/alert/alert-messages.service';
import { EntidadPromotoraService } from '../../../services/entidad-promotora/entidad-promotora.service';
import { ProfesionalSaludService } from '../../../services/profesional-salud/profesional-salud.service';
import { TipoDocumentoService } from '../../../services/tipo-documento/tipo-documento.service';
import { UniversidadService } from '../../../services/universidad/universidad.service';
import { ValidatorsService } from '../../../services/validators/validators.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  eps:Eps_model[]=[];
  universidades:Universidad[]=[];
  tiposDocumentos: TipoDocumento[] = [];
  actual:any=0;
  forma: FormGroup;
  formTitle = 'Registrar Funcionario Publico';
  isEditing = false;
  id : number = null;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private _alertMessagesService : AlertMessagesService,
              private fb: FormBuilder,
              private _ProfesionalSaludService: ProfesionalSaludService,
              private _tipoDocumentoService: TipoDocumentoService,
              private _univeridadService:UniversidadService,
              private _entidadpromotora:EntidadPromotoraService,
              private _validatorsService : ValidatorsService,) {
                this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
                this.createForm();
              }

  ngOnInit(): void {
  
    this._tipoDocumentoService.getAll().subscribe(response => { 
    
      if(!response.ok){
        this._alertMessagesService.showMessage('error', response.message);
      }else{
        this.tiposDocumentos = response.data;
     
      }
      
    });
    this._univeridadService.getAll().subscribe(response => { 
  
      if(!response.ok){
        this._alertMessagesService.showMessage('error', response.message);
      }else{
        this.universidades = response.data;
      
      }});
    this._entidadpromotora.getAll().subscribe(response => { 

      if(!response.ok){
        this._alertMessagesService.showMessage('error', response.message);
      }else{
        this.eps = response.data;
      
      }});
    if(this.id){
      this.formTitle = 'Editar Funcionario Publico';
      this.isEditing = true;
      this.showProfesionalSalud();
    }
  }

  createForm(){
    this.forma = this.fb.group({
      id: [''],
      nombre: [''],
      numeroIdentificacion: [''],
      idTipoIdentificacion:[''],
      fechaNacimiento:[''],
      idUniversidad:[''],
      idEps:['']
    });
  }

  // validacion campos
  isInvalidField(name:string){
    return this.forma.get(name).invalid && this.forma.get(name).touched;
  }

  validateField(control: string) : FieldValidation {
    return this._validatorsService.validateField(this.forma.get(control));
  }

  async showProfesionalSalud(){
    const response = await this._ProfesionalSaludService.getById(this.id).toPromise();
    if(!response.ok){
      this._alertMessagesService.showMessage('error', response.message);
    }else{
      const ProfesionalSalud = response.data;
      console.log("cosas en registros",ProfesionalSalud);
      this.forma.reset(
        {

          id: ProfesionalSalud.persona_id,
          nombre: ProfesionalSalud.persona_nombre,
          numeroIdentificacion: ProfesionalSalud.persona_numero_identificacion,
          idTipoIdentificacion: ProfesionalSalud.id_tipo_identificacion,
          fechaNacimiento:ProfesionalSalud.persona_fecha_nacimiento

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
      console.log("update",this.forma.value);
      observable = this._ProfesionalSaludService.update(this.forma.value);
    }else{
      console.log("create",this.forma.value);
      
      observable = this._ProfesionalSaludService.create(this.forma.value);
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
            this.router.navigate(['profesional-salud','consultar']);
          });
        }
      }
    },
    error =>{
      this._alertMessagesService.showMessage('error', error);
    });

  }
  changeCity(e) {
    this.forma.setValue({idTipoIdentificacion:e.target.value}, {
      onlySelf: true
    })
  }

  }


