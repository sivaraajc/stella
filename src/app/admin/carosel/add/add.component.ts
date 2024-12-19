import { Component } from '@angular/core';
import { AdminService } from 'src/service/admin.service';
import { AlertService } from 'src/service/alert.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  file: any; // Variable to hold the selected image file
  image: string | null = null; // Variable to hold the image preview source

  constructor(private addImgae: AdminService, private alert: AlertService) {}

  // Handle the file selection and set image preview
  onFileChange(event: any): void {
    this.file = event.target.files[0];
    if (this.file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.image = e.target.result;  // Set image source for preview
      };
      reader.readAsDataURL(this.file);  // Read the selected image as base64
    }
  }

  // Submit the image using FormData
  onSubmit(): void {
    if (this.file) {
      const formData = new FormData();
      formData.append('image', this.file, this.file.name); // Append image to FormData

      this.addImgae.adminAddCaroselImage(formData).subscribe(res => {
        if (res.statusCode === 0) {
          this.alert.showCustomPopup('success', 'Image Added Successfully');
          console.log('Image Added Successfully');
        } else {
          this.alert.showCustomPopup('error', 'Image Not Added Successfully');
          console.log('Failed to add image');
        }
      }, error => {
        this.alert.showCustomPopup('error', 'An error occurred');
        console.error('Error: ', error);
      });
    } else {
      this.alert.showCustomPopup('error', 'No image selected');
    }
  }
}