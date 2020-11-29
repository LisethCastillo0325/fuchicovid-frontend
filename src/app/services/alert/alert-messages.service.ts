import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertMessagesService {

  constructor() { }

  showMessageLoading(text: string = 'Espere por favor...', title:string = ''){
    this.closeMessage();
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: title,
      text: text
    });
    Swal.showLoading();
  }

  showMessage(icon : SweetAlertIcon, message: string, title:string = '', showConfirmButton: boolean = true, timer: number = null) : Promise<SweetAlertResult<unknown>> {
    this.closeMessage();
    return Swal.fire({
      position: 'center',
      icon: icon,
      title: title,
      text: message,
      showConfirmButton: showConfirmButton,
      timer: timer
    });
  }

  confirmationMessage(icon : SweetAlertIcon, message: string, title:string, confirmButtonText:string, confirmButtonColor:string = '#3085d6', cancelButtonColor:string = '#d33'){
    return Swal.fire({
      title: title,
      text: message,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: confirmButtonColor,
      cancelButtonColor: cancelButtonColor,
      confirmButtonText: confirmButtonText
    });
  }

  closeMessage(){
    if(Swal.isVisible()){
      Swal.close();
    }
  }


}
