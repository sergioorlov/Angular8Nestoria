import {Component, Input, OnInit} from '@angular/core';
import {SinglePageService} from '../shared/single-page.service';

@Component({
  selector: 'app-property-single',
  templateUrl: './property-single.component.html',
  styleUrls: ['./property-single.component.css']
})
export class PropertySingleComponent implements OnInit {

  @Input() house;

  constructor(
    private singlePageService: SinglePageService
  ) {
    this.house = JSON.parse(this.singlePageService.getHouseInfo());
  }

  ngOnInit() {
  }

}
