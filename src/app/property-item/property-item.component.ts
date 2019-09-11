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

  private el: HTMLElement;
  imgWidth;
  imgHeight;
  @Input() house: Property;
  houseId;

  @Output() toggleFavs = new EventEmitter();


  constructor(
    el: ElementRef,
    private singlePageService: SinglePageService,
  ) {
    this.el = el.nativeElement;
  }

  toggleFavorites() {
    if (localStorage.getItem(this.houseId)) {
      localStorage.removeItem(this.houseId);
    } else {
      let stringified = JSON.stringify(this.house);
      localStorage.setItem(this.houseId, stringified);
    }
    this.house.isInFavorites = !this.house.isInFavorites;
    this.toggleFavs.emit(this.house);
    return false;
  }


  sendHouseInfo(info) {
    this.singlePageService.setHouseInfo(info);
  }

  ngOnInit() {
    if (localStorage.getItem(this.houseId)) {
      this.house.isInFavorites = true;
    }
    let imgContainer = this.el.querySelector('.img_container');
    this.imgWidth = imgContainer.clientWidth;
    this.imgHeight = this.imgWidth * 0.75;
  }

}
