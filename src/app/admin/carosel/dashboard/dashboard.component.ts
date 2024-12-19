import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/service/admin.service';
import { AlertService } from 'src/service/alert.service';
import { GetdataService } from 'src/service/getdata.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private getSearvice: GetdataService, private router: Router, private admin: AdminService, private alert: AlertService) { }

  ngOnInit(): void {
    this.slideImageCall();
  }
  userName: any = localStorage.getItem('email');
  profileImage: string = 'assets/dow.png'; // Replace with actual profile image URL
  showLogoutDialog: boolean = false;


  images: any[] = [];


  slideImageCall() {
    this.getSearvice.getData().subscribe((res: any) => {
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
    this.router.navigate(['/admin/carosel/addCarosel'])
  }

  onEdit(imageId: number): void {
    this.router.navigate([`/admin/carosel/editCarosel/${imageId}`]);
  }

  onDelete(imageId: number): void {
    this.admin.adminDeleteImageById(imageId).subscribe((res: any) => {
      if (res.statusCode == 0) {
        this.alert.showCustomPopup('success', 'Image deleted successfully');
        this.router.navigate(['/admin/carosel/caroseldashboard']);
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
    localStorage.removeItem('email');
    this.showLogoutDialog = false;
    this.router.navigate(['/']);
    console.log('User logged out');
  }

  cancelLogout() {
    this.showLogoutDialog = false;
  }
}