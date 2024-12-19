import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/service/admin.service';
import { AlertService } from 'src/service/alert.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  currentImage: string | null = null;
  imagePreview: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.loadCurrentImage();
  }

  loadCurrentImage(): void {
    const imageId = this.route.snapshot.params['id'];
    this.adminService.adminGetImageById(imageId).subscribe((res: any) => {
      this.currentImage = res.responseContent.image;
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    if (!this.selectedFile) {
      this.alert.showCustomPopup('error', 'Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);
    const imageId = this.route.snapshot.params['id'];
    this.adminService.adminEditCaroselImage(imageId, formData).subscribe(
      (response: any) => {
        if (response.statusCode==0) {
          this.alert.showCustomPopup('success', 'Image updated successfully!');
          this.router.navigate(['/admin/carosel/caroseldashboard']);
        } else {
          this.alert.showCustomPopup("error", 'Failed to update the image.');
        }
      },
      (error: any) => {
        console.error('Error updating image:', error);
        this.alert.showCustomPopup("error", 'An error occurred while updating the image.');
      }
    );
  }
}