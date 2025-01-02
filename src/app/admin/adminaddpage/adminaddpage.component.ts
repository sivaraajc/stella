import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/service/admin.service';
import { AlertService } from 'src/service/alert.service';
import { GetdataService } from 'src/service/getdata.service';

@Component({
  selector: 'app-adminaddpage',
  templateUrl: './adminaddpage.component.html',
  styleUrls: ['./adminaddpage.component.css']
})
export class AdminaddpageComponent implements OnInit {
  productForm: FormGroup;
  categoriesList: any[] = [];
  subCategoriesList: any[] = [];
  imagePreview: string | null = null;
  selectedFile: File | null = null;
  temporaryDescriptions: any[]=[];

  constructor(private fb: FormBuilder, private commondata: GetdataService, private admin: AdminService, private alert: AlertService, private router: Router) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productPrice: [null, [Validators.required, Validators.min(1)]],
      productCategoryId: ['', Validators.required],
      productCode: ['', Validators.required],
      productDescription:['']
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    const req = { dataCode: 'GET_ALL_CATEGORY' };
    this.commondata.commonData(req).subscribe((res) => {
      if (res.statusCode === 0) {
        this.categoriesList = res.responseContent;
        this.onCategoryChange();
      } else {
        console.error('Failed to fetch categories.');
      }
    });
  }

  onCategoryChange(): void {
    const req = { dataCode: 'GET_ALL_SUB_CATEGORY' };
    this.commondata.commonData(req).subscribe((res) => {
      if (res.statusCode === 0) {
        this.subCategoriesList = res.responseContent;
      } else {
        console.error('Failed to fetch subcategories.');
      }
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Set selected file

      // Preview the image
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagePreview = e.target?.result as string; // Set image preview URL
      };
      reader.readAsDataURL(this.selectedFile); // Read the file as data URL for preview
    }
  }
  onAddDescription() {
    const description = this.productForm.get('productDescription')?.value;

      this.temporaryDescriptions.push(description); // Add description to the array
      console.log(this.temporaryDescriptions);
      
      this.productForm.get('productDescription')?.reset(); // Clear the input field
  }


  onSubmit(): void {
    if (!this.selectedFile) {
      alert('Please select an image.');
      return;
    }

    // Prepare the URL with query parameters
    const productName = encodeURIComponent(this.productForm.get('productName')?.value);
    const productPrice = encodeURIComponent(this.productForm.get('productPrice')?.value);
    const productCategoryId = encodeURIComponent(this.productForm.get('productCategoryId')?.value);
    // const productSubCategoryId =4;
    const productCode = encodeURIComponent(this.productForm.get('productCode')?.value);
    const productDescription = encodeURIComponent(this.productForm.get('productDescription')?.value);

    //const url = `/product/addproduct?productName=${productName}&productPrice=${productPrice}&productCategoryId=${productCategoryId}&productSubCategoryId=${productSubCategoryId}&productCode=${productCode}`;
    const url = `/product/addproduct?productName=${productName}&productPrice=${productPrice}&productCategoryId=${productCategoryId}&productDescription=${this.temporaryDescriptions}&productCode=${productCode}`;

    // Create FormData object to send the image
    const formData = new FormData();
    formData.append('image', this.selectedFile);

    // Call the backend service to add the product
    this.admin.adminAddProduct(url, formData).subscribe(res => {
      if (res.statusCode === 0) {
        this.alert.showCustomPopup('success', 'Product added successfully.');
        this.router.navigate(['/admin/'])
      } else {
        this.alert.showCustomPopup('error', 'Failed to add product.');
      }
    });
  }



  onCancel(): void {
    this.productForm.reset();
    this.imagePreview = "";
    this.selectedFile = null;
  }
}