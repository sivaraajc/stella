import { Component } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  searchText: string = '';
  searchButtons:boolean=false;
  searchButton() {
    this.searchButtons=true;
  }
  searchTextChange() {

  }
}
