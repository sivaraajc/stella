import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/service/alert.service';
import { GetdataService } from 'src/service/getdata.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  totalAmount: number;
  qrCodeBase64: string = '';
  amount: any;

  gpayUrl: string = '';
  paytmUrl: string = '';
  upiId: string = '8489017762@paytm';


  constructor(private paymentService: GetdataService, private alert: AlertService) { }

  ngOnInit(): void {
    if (history.state.total) {
      this.totalAmount = history.state.total;
    }
    console.log('Total Amount received:', this.totalAmount);
    this.initCall();
    this.generatePaymentLinks();
  }


  generatePaymentLinks() {
    this.gpayUrl = `upi://pay?pa=${this.upiId}&pn=Merchant&mc=1234&tid=TXN123&tr=INV001&tn=Payment&am=${this.totalAmount}&cu=INR`;
    this.paytmUrl = `paytmmp://pay?pa=${this.upiId}&pn=Merchant&mc=1234&tid=TXN123&tr=INV001&tn=Payment&am=${this.totalAmount}&cu=INR`;
  }

  initCall() {
    this.paymentService.paymentQrGenerate(this.totalAmount).subscribe(
      (res) => {
        console.log('API Response:', res); // Log response for debugging

        if (res.statusCode === 0 && res.responseContent) {
          this.qrCodeBase64 = 'data:image/png;base64,' + res.responseContent;
          console.log('QR Code Generated Successfully:', this.qrCodeBase64); // Confirm QR generation
        } else {
          this.alert.showCustomPopup('error', "QR Not Generated Properly");
        }
      },
      (error) => {
        console.error('API Error:', error); // Log error if API fails
        this.alert.showCustomPopup('error', "Failed to generate QR Code");
      }
    );
  }
}
