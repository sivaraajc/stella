import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/service/admin.service';
import { AlertService } from 'src/service/alert.service';
import { GetdataService } from 'src/service/getdata.service';

@Component({
  selector: 'app-admineditpage',
  templateUrl: './admineditpage.component.html',
  styleUrls: ['./admineditpage.component.css']
})
export class AdmineditpageComponent {
  productEditForm: FormGroup;
  categoriesList: any[] = [];
  subCategoriesList: any[] = [];
  imagePreview: string | null = null;
  selectedFile: File | null = null;
  editIt: any;
  image: any;
  currentProductImage: any;

  constructor(private fb: FormBuilder, private commondata: GetdataService, private admin: AdminService, private alert: AlertService, private router: Router, private route: ActivatedRoute) {
    this.productEditForm = this.fb.group({
      productName: ['', Validators.required],
      productPrice: [null, [Validators.required, Validators.min(1)]],
      productCategoryId: ['', Validators.required],
      // productSubCategoryId: ['', Validators.required],
      productCode: ['', Validators.required],
      ProductStatus: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.route.queryParams.subscribe(params => {
      this.image = params['id'];
    });
    this.editPage();
  }


  editPage() {
    const req = {
      "dataCode": "GET_PRODUCT_DETAILS_BY_PRODUCTID",
      "placeholderKeyValueMap": {
        "id": this.image,
      }
    };

    this.commondata.commonData(req).subscribe((res: any) => {
      if (res.statusCode === 0 && res.responseContent.length > 0) {
        const product = res.responseContent[0];
        this.currentProductImage = product.product_image;
        this.productEditForm.patchValue({
          productName: product.product_name,
          productPrice: product.product_price,
          productCategoryId: product.product_category_id,
          productSubCategoryId: product.product_sub_category_id,
          productCode: product.product_code,
        });
      } else {
        console.log('Product details not found or invalid response');
      }
    });
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
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagePreview = e.target?.result as string; // Set image preview URL
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }


  onSubmit(): void {
    const productDTO = {
      id: this.image, 
      productName: this.productEditForm.get('productName')?.value,
      productPrice: this.productEditForm.get('productPrice')?.value,
      productCategoryId: this.productEditForm.get('productCategoryId')?.value,
      productSubCategoryId: this.productEditForm.get('productSubCategoryId')?.value,
      productImage: this.selectedFile ? this.selectedFile.name : this.currentProductImage ||null, 
      productCode: this.productEditForm.get('productCode')?.value,
      productStatus: this.productEditForm.get('ProductStatus')?.value,
    };
    const productDTOJson = JSON.stringify(productDTO);
    const formData = new FormData();
    formData.append('productDTO', productDTOJson);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);  
    }
    this.admin.adminUpdateProduct(formData).subscribe(res => {
      if (res.statusCode === 0) {
        this.alert.showCustomPopup('success', 'Product updated successfully.');
        this.router.navigate(['/admin/']);
      } else {
        this.alert.showCustomPopup('error', 'Failed to update product.');
      }
    });
  }



  onCancel(): void {
    this.router.navigate(['/admin/']);
  }
}