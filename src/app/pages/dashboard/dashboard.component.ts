import { Component, HostListener, OnInit } from '@angular/core';
import { GetdataService } from 'src/service/getdata.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  sideImages: any;
  showScrollButton: boolean = false; // State for scroll-to-top button visibility
  carouselItems: any[] = [];
  getAllImagesValue: any;

  constructor(private getService: GetdataService) { }

  // Listen to the scroll event
  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

    // Show the scroll-to-top button after scrolling 200px
    this.showScrollButton = scrollTop > 200;
  }

  // Smooth scroll to the top
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  ngOnInit() {
    this.slideImageCall();
    this.getAllImages();
  }
styles:any;
  getAllImages() {
    this.getService.getData().subscribe(res => {
      if (res.statusCode === 0) {
        this.getAllImagesValue = res.responseContent;
        console.log(this.getAllImagesValue);
      } else {
        console.log("No data found");
      }
    })
  }

  slideImageCall() {
    const req = {
      "dataCode": "GET_ALL_PRODUCT_DETAILS_PD"
    };
    this.getService.commonData(req).subscribe((res: any) => {
      if (res.statusCode === 0) {
        this.sideImages = res.responseContent;
        console.log(this.sideImages);
        this.chunkProducts();
      } else {
        console.log("No data found");
      }
    });
  }

  chunkProducts() {
    this.carouselItems = [];
    const chunkSize = 4;

    for (let i = 0; i < this.sideImages.length; i += chunkSize) {
      this.carouselItems.push(this.sideImages.slice(i, i + chunkSize));
    }

    console.log(this.carouselItems);
  }

  shopAll() {
    console.log("shop all");
  }


}
