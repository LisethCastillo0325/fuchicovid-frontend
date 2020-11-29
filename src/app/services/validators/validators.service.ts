import { Injectable } from '@angular/core';
import { FormGroup, Validators, AbstractControl } from '@angular/forms';
import { FieldValidation } from '../../interfaces/field-validation.interface';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  private numberRegExp : RegExp = new RegExp(/^([0-9])*$/);

  private emailRegExp : RegExp = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);


  constructor() { }


  getRegExpEmail() {
    return this.emailRegExp;
  }

  getRegExpNumber(){
    return this.numberRegExp;
  }

  validateField(control: AbstractControl) : FieldValidation{
    let field = control;
    let result : FieldValidation = {
      show: false,
      message: ""
    }

    if(field.errors && field.touched){
      if(field.hasError('pattern')){
        result.show = true;
        result.message = "Campo no válido";
      }

      if(field.hasError('required')){
        result.show = true;
        result.message = "Debe diligenciar este campo";
      }

      if(field.hasError('maxlength')){
        result.show = true;
        result.message = "Ha excedido el máximo de carateres";
      }
      if(field.hasError('minlength')){
        result.show = true;
        result.message = "Debe ingresar una cantidad mayor de carateres";
      }
    }
    return result;
  }

}
