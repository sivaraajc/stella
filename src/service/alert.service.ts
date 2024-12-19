import { Injectable } from '@angular/core';
// import swal, { SweetAlertOptions} from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {


  constructor(private toaster: ToastrService) {}

  // Show Toastr Notifications
  private msg(
    toasterType: 'success' | 'error' | 'info' | 'warning',
    message: string,
    title: string
  ): void {
    const toastr = this.toaster;
    switch (toasterType) {
      case 'success':
        toastr.success(message, title, { positionClass: 'toast-top-right' });
        break;
      case 'error':
        toastr.error(message, title, { positionClass: 'toast-top-right' });
        break;
      case 'info':
        toastr.info(message, title, { positionClass: 'toast-top-right' });
        break;
      case 'warning':
        toastr.warning(message, title, { positionClass: 'toast-top-right' });
        break;
    }
  }


  // Show SweetAlert2 Alert (Optional)
  showCustomPopup(type: 'success' | 'error' | 'warning' | 'info', message: string): void {
    Swal.fire({
      icon: type,
      title: message,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
      },
    });  
  }
  
}