import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Property} from '../shared/property';
import {SinglePageService} from '../shared/single-page.service';

@Component({
  selector: 'app-property-item',
  inputs: ['house', 'houseId'],
  templateUrl: './property-item.component.html',
  styleUrls: ['./property-item.component.css']
})
export class PropertyItemComponent implements OnInit {

  @Input() house: Property;
           houseId;

  @Output() toggleFavs = new EventEmitter();


  constructor( private singlePageService: SinglePageService ) {}

  toggleFavorites() {
    if (localStorage.getItem(this.houseId)) {
      localStorage.removeItem(this.houseId);
    } else {
      const strify = JSON.stringify(this.house);
      localStorage.setItem(this.houseId, strify);
    }
    this.house.isInFavorites = !this.house.isInFavorites;
    this.toggleFavs.emit(this.house);
    return true;
  }


  sendHouseInfo(info) {
    this.singlePageService.setHouseInfo(info);
  }

  ngOnInit() {
    if (localStorage.getItem(this.houseId)) {
      this.house.isInFavorites = true;
    }
  }

}
