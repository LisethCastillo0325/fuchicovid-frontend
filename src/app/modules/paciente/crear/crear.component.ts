import { Component, OnInit } from '@angular/core';
import { Ciudad } from '../../../models/ciudad.model';
import { Departamento } from '../../../models/departamento.model';
import { TipoDocumento } from '../../../models/tipo-documento.model';
import { ProfesionalSalud } from '../../../models/profesional-salud.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PacienteService } from '../../../services/paciente/paciente.service';
import { AlertMessagesService } from '../../../services/alert/alert-messages.service';
import { DataSourceService } from '../../../services/data-source/data-source.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorsService } from '../../../services/validators/validators.service';
import { FieldValidation } from '../../../interfaces/field-validation.interface';
import { Observable } from 'rxjs';
import { Paciente } from '../../../models/paciente.model';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {


  //source
  dataSourceEstados: any[] = [];
  dataSourceCiudad : Ciudad[] = [];
  dataSourceDepartamento : Departamento[] = [];
  dataSourceTipoDocumento: TipoDocumento[] = [];
  dataSourceMedico: ProfesionalSalud[] = []
  dataSourceEstadoEnfermedad: any[] = [];

  //form
  forma: FormGroup;

  formTitle = 'Crear Paciente';
  isEditing = false;
  pacienteId : number = null;

  constructor(private activatedRoute: ActivatedRoute,
              private _validatorsService : ValidatorsService,
              private router: Router,
              private _pacienteService: PacienteService,
              private _alertMessagesService: AlertMessagesService,
              private _dataSourceService: DataSourceService,
              private fb: FormBuilder) {
                this.pacienteId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

                this.createForm();
                this.getSourceEstados();
                this.getSourceEstadoEnfermedad();
                this.getSourceDepartamento();
                this.getSourceTipoDocumento();
                this.getSourceMedico();
                this.createListeners();
              }

  ngOnInit(): void {
    if(this.pacienteId){
      this.formTitle = 'Editar Paciente';
      this.isEditing = true;
      this.showPaciente();
    }
  }

  createForm(){
    this.forma = this.fb.group({
      id: [''],
      nombre: [''],
      estado: [''],
      numeroIdentificacion: [''],
      idTipoIdentificacion: [''],
      fechaNacimiento: [''],
      idCiudadContagio: [''],
      departamento: [''],
      latitud: [''],
      longitud: [''],
      numeroIntegrantesHogar: [''],
      estadoEnfermedad: [''],
      idDoctorEncargado: ['']
    });
  }

  createListeners(){
    // escuchar un campo en especifico
    this.forma.get('departamento').valueChanges.subscribe(
      value => {
        if(this.isEditing === false){
          this.forma.get('idCiudadContagio').setValue('');
        }

        if(value > 0){
          this.getSourceCiududPorDepartamento(value);
        }
      }
    );
  }

  async showPaciente(){
    const response = await this._pacienteService.getById(this.pacienteId).toPromise();
    if(!response.ok){
      this._alertMessagesService.showMessage('error', response.message);
    }else{
      const paciente : Paciente = response.data;
      console.log(paciente);
      this.forma.reset(
        {
          id: paciente.id,
          nombre: paciente.nombre,
          estado: paciente.estado,
          numeroIdentificacion: paciente.numeroIdentificacion,
          idTipoIdentificacion: paciente.idTipoIdentificacion.id,
          fechaNacimiento: paciente.fechaNacimiento,
          departamento: paciente.paciente.idCiudadContagio.idDepartamento,
          idCiudadContagio: paciente.paciente.idCiudadContagio.id,
          latitud: paciente.paciente.latitud,
          longitud: paciente.paciente.longitud,
          numeroIntegrantesHogar: paciente.paciente.numeroIntegrantesHogar,
          estadoEnfermedad: paciente.paciente.estadoEnfermedad,
          idDoctorEncargado: paciente.paciente.idDoctorEncargado.idPersona
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
      observable = this._pacienteService.update(this.forma.value);
    }else{
      observable = this._pacienteService.create(this.forma.value);
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
            this.router.navigate(['paciente','consultar']);
          });
        }
      }
    },
    error =>{
      this._alertMessagesService.showMessage('error', error);
    });



  }

  // validacion campos
  isInvalidField(name:string){
    return this.forma.get(name).invalid && this.forma.get(name).touched;
  }

  validateField(control: string) : FieldValidation {
    return this._validatorsService.validateField(this.forma.get(control));
  }

  async getSourceEstados(){
    this.dataSourceEstados = await this._dataSourceService.getDataSourceEstados();
  }

  async getSourceEstadoEnfermedad(){
    this.dataSourceEstadoEnfermedad = await this._dataSourceService.getDataSourceEstadoEnfermedad();
  }

  async getSourceDepartamento(){
    this.dataSourceDepartamento = await this._dataSourceService.getDataSourceDepartamento();
  }

  async getSourceTipoDocumento(){
    this.dataSourceTipoDocumento = await this._dataSourceService.getDataSourceTipoDocumento({estado: "ACTIVO"});
  }

  async getSourceMedico(){
    this.dataSourceMedico = await this._dataSourceService.getDataSourceProfesionalSalud();
  }

  async getSourceCiududPorDepartamento(id_departamento: number){
    this.dataSourceCiudad = await this._dataSourceService.getDataSourceCiudadPorDepartmento(id_departamento);
  }




}
