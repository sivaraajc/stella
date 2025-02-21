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
  showConformButton = true;
  pincodeData: any[] = [];
  uniqueTaluks: string[] = [];
  filteredVillages: any[];
  totalAmount: any;
  addressList: any;
  selectedAddress: any;

  constructor(private fb: FormBuilder, private getData: GetdataService, private alert: AlertService, private router: Router) {
    this.buyForm = this.fb.group({
      pincode: ['', [Validators.required]],
      village: ['', Validators.required],
      taluk: ['', [Validators.required]],
      district: ['', [Validators.required]],
      state: ['', [Validators.required]],
      addressLine1: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });
  }

  ngOnInit(): void {
    if (history.state.total) {
      this.totalAmount = history.state.total;
    }
    console.log('Total Amount received:', this.totalAmount);
    this.addresid();
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
      const req = {
        mobile: this.buyForm.value.mobile,
        pincode: this.buyForm.value.pincode,
        userId: localStorage.getItem('userId'),
        addressLine1: this.buyForm.value.addressLine1,
        state: this.buyForm.value.state,
        district: this.buyForm.value.district,
        village: this.buyForm.value.village,
        taluk: this.buyForm.value.taluk,
        createdDate: new Date().toISOString()
      }
      this.getData.addressAdd(req).subscribe(res => {
        if (res.statusCode == 0) {
          this.alert.showCustomPopup('success', "SuccessFully add Address");
        }
        else {
          this.alert.showCustomPopup('error', "Something Went  Wrong");
        }
      })
      this.showPayButton = true; // Show Pay button
      this.showConformButton = false;
    } else {
      console.log('Please fill all required fields.');
      this.alert.showCustomPopup('error', "Please fill all required fields.")
      this.buyForm.markAllAsTouched(); // Show validation messages
    }
  }


  addresid() {
    const req =
    {
      "dataCode": "GET_ADDRESS_ID_BY_USERID",
      "placeholderKeyValueMap": {
        "userId": "'" + localStorage.getItem('userId') + "'"
      }
    }
    this.getData.commonData(req).subscribe(res => {
      if (res.statusCode == 0) {
        this.addressList = res.responseContent;
        if (this.addressList.length > 0) {
          this.fetchPincodeData(this.addressList[0].pincode);
        }
      }
      else {
        console.log("NotRun");
      }
    })
  }

  selectAddress(address: any) {
    this.selectedAddress = address;
    console.log("Selected Address:", address);
    
    // Ensure we have pincode data
    if (!this.pincodeData.length || this.pincodeData[0].pincode !== address.pincode) {
      this.fetchPincodeData(address.pincode).then(() => {
        this.patchAddressForm(address);
      });
    } else {
      this.patchAddressForm(address);
    }
  }
  
  // Function to patch address into form
  patchAddressForm(address: any) {
    const matchedData = this.pincodeData.find(
      (data) => data.pincode == address.pincode && data.village.toLowerCase().trim() === address.village.toLowerCase().trim()
    );
  
    console.log("Matched Data:", matchedData);
  
    this.buyForm.patchValue({
      addressLine1: address.address_line1,
      district: address.district,
      // pincode: address.pincode,
      state: address.state,
      mobile: address.mobile,
      taluk: matchedData ? matchedData.taluk : '', 
      village: matchedData ? matchedData.village : '',
    });
  
    console.log("Updated Form:", this.buyForm.value);
  }
  
  // Modify fetchPincodeData to return a Promise
  fetchPincodeData(pincode: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const req = {
        dataCode: 'GET_VILLAGE_TALUK_STATE_DISTRICT_DETAILS_BY_PINCODE',
        placeholderKeyValueMap: { pinCode: pincode }
      };
  
      this.getData.commonData(req).subscribe(res => {
        if (res.statusCode === 0) {
          this.pincodeData = res.responseContent;
          console.log("Fetched Pincode Data:", this.pincodeData);
          resolve();
        } else {
          console.log("Failed to Fetch Pincode Data");
          reject();
        }
      });
    });
  }
  

  pay() {
    this.alert.showCustomPopup("info", 'Proceeding to payment...');
    this.router.navigate(['pay'], {
      state: { total: this.totalAmount }
    });
  }


}
