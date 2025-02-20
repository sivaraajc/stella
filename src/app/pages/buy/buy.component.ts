import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/service/alert.service';
import { GetdataService } from 'src/service/getdata.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
})
export class BuyComponent implements OnInit {
  buyForm: FormGroup;
  showPayButton = false; // Initially hidden
  showConformButton=true;
  pincodeData: any[] = [];
  uniqueTaluks: string[] = [];
  filteredVillages: any[];
  totalAmount: any;

  constructor(private fb: FormBuilder, private getData: GetdataService,private alert:AlertService,private router:Router) {
    this.buyForm = this.fb.group({
      pincode: ['', [Validators.required]],
      village: ['', Validators.required],
      taluk: ['', [Validators.required]],
      district: ['', [Validators.required]],
      state: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { 
    if (history.state.total) {
      this.totalAmount = history.state.total;
    }
    console.log('Total Amount received:', this.totalAmount);
  }

  onPincodeInput(event: any): void {
    const value = event.target.value;

    if (value.length >= 6) {
      setTimeout(() => {
        const req = {
          dataCode: 'GET_VILLAGE_TALUK_STATE_DISTRICT_DETAILS_BY_PINCODE',
          placeholderKeyValueMap: { pinCode: value },
        };

        this.getData.commonData(req).subscribe(
          (res) => {
            if (res.statusCode === 0) {
              this.pincodeData = res.responseContent;
              this.uniqueTaluks = [...new Set(this.pincodeData.map((data) => data.taluk))];

              if (this.pincodeData.length > 0) {
                const firstData = this.pincodeData[0];
                this.buyForm.patchValue({
                  district: firstData.district,
                  state: firstData.state,
                  // latitude: firstData.latitude,
                   longitude: firstData.longitude,
                });
              }
            } else {
              console.error(res.errorMessage || 'Unexpected response structure or empty content');
            }
          },
          (err) => console.error('Error fetching data', err)
        );
      }, 300);
    }
  }

  onSubmit(): void {
    if (this.buyForm.valid) {
      console.log('Form Submitted', this.buyForm.value);
      // Process the payment and order details here
    } else {
      console.error('Form is invalid');
    }
  }

  onTalukChange(): void {
    const selectedTaluk = this.buyForm.get('taluk')?.value;

    if (selectedTaluk) {
      this.filteredVillages = this.pincodeData
        .filter((data) => data.taluk === selectedTaluk)
        .map((data) => data.village);

      // Optionally clear the village field if the selected taluk has no villages
      if (this.filteredVillages.length === 0) {
        this.buyForm.get('village')?.setValue('');
      }
    }
  }

 payment() {
    if (this.buyForm.valid) {
      console.log('Address Confirmed:', this.buyForm.value);
      this.showPayButton = true; // Show Pay button
      this.showConformButton=false;
    } else {
      console.log('Please fill all required fields.');
      this.buyForm.markAllAsTouched(); // Show validation messages
    }
  }
  pay() {
    this.alert.showCustomPopup("info",'Proceeding to payment...');
    this.router.navigate(['pay'], {
      state: { total: this.totalAmount } 
    });
  }
}
