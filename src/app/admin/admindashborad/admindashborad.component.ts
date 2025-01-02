import { state } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/service/admin.service';
import { AlertService } from 'src/service/alert.service';
import { GetdataService } from 'src/service/getdata.service';

@Component({
  selector: 'app-admindashborad',
  templateUrl: './admindashborad.component.html',
  styleUrls: ['./admindashborad.component.css']
})
export class AdmindashboradComponent {
  constructor(private getSearvice: GetdataService,private router:Router,private admin:AdminService,private alert:AlertService) { }

  ngOnInit(): void {
    this.slideImageCall();
  }
  userName: any = localStorage.getItem('email');
  profileImage: string = 'assets/dow.png'; // Replace with actual profile image URL
  showLogoutDialog: boolean = false;


  images: any[] = [];


  slideImageCall() {
    const req={
      "dataCode":"GET_ALL_PRODUCT_DETAILS_PD"
    }
    this.getSearvice.commonData(req).subscribe((res: any) => {
      if (res.statusCode === 0) {
        this.images = res.responseContent;
      } else {
        console.log("No data found");
      }
    });
  }

  get displayName(): string {
    return this.userName.split('@')[0];
  }

  onAdd() {
    this.router.navigate(['/admin/addpage'])
  }

  onEdit(image: any) {
    if (image ) {
      this.router.navigate(['/admin/editpage'], {
        queryParams: {
          id: image,  
        }
      });
    } else {
      console.log('Invalid image data');
    }
  }
  

  onDelete(image: any) {
    this.admin.adminDeleteDeleteProductImage(image).subscribe((res: any) => {
      if (res.statusCode == 0) {
        this.alert.showCustomPopup('success', 'Image deleted successfully');
        this.router.navigate(['/admin/']);
        this.slideImageCall();
      } else {
        this.alert.showCustomPopup('error', 'Image not deleted');
      }
    });
  }

  onClear() {
    console.log('Clear button clicked');
  }

  onLogout() {
    this.showLogoutDialog = true;
  }

  confirmLogout() {
    this.showLogoutDialog = false;
    this.router.navigate(['/']);
    localStorage.clear();
    console.log('User logged out');
  }

  cancelLogout() {
    this.showLogoutDialog = false;
  }
}