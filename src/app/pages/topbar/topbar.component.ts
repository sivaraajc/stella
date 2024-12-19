import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetdataService } from 'src/service/getdata.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  categoryList: any;

  constructor(private router: Router, private getData: GetdataService) { }

  ngOnInit(): void {
    this.cateogryList();
  }

  cateogryList() {
    const req = {
      "dataCode": "GET_ALL_CATEGORY"
    }
    this.getData.commonData(req).subscribe((res: any) => {
      if (res.statusCode == 0) {
        this.categoryList = res.responseContent;
      }
      else {
        console.log("Error");
      }
    });
  }


  profileImage: string = 'assets/dow.png';
  searchText: string = '';
  searchButtons: boolean = false;
  searchButton() {
    this.searchButtons = true;
  }
  searchTextChange() {

  }


  onLogin() {
    this.router.navigate(['/auth/auth/']);
  }
  isSearchVisible = false;
  searchQuery = '';
  search() {
    console.log('search called');
    this.isSearchVisible = !this.isSearchVisible;
    if (this.isSearchVisible) {
      this.searchQuery = '';
    }
  }
  navigateToCategory(categoryId: number): void {
    console.log('Navigating to category with ID:', categoryId);
    this.router.navigate(['/allcatogery', categoryId]); // Navigating to the category route
  }

}
