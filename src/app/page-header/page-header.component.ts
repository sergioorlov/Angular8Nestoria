import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  @Input() title: string;
  curPath: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location) {
    this.curPath = this.location.path().length > 0 ? this.location.path().split('/')[1] : '';
  }

  getLocation() {
    return window.location.pathname;
  }

  ngOnInit() {}

}
