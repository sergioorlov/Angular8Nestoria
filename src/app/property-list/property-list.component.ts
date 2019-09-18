import {Component, Input, OnInit} from '@angular/core';
import {ListingService} from '../shared/listing.service';
import {SinglePageService} from '../shared/single-page.service';
import {ActivatedRoute} from '@angular/router';
import {Property} from '../shared/property';
import {PagesService} from '../shared/pages.service';
import {Location} from '@angular/common';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-property-list',
  inputs: ['house', 'houseId'],
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  @Input() house: Property;
  houseId;

  place: string;
  data: any;
  pages: number;
  listings: Property[];
  loading: boolean;
  curPath: string;

  favorites: any;
  favoritesKeys: any;

  pager: any = {};
  pagedItems: any[];
  currentPage: number = 1;

  itemsPerPage: number = 24;

  constructor(
    private listingService: ListingService,
    private pagesService: PagesService,
    private singlePageService: SinglePageService,
    private route: ActivatedRoute,
    private location: Location,

  ) {

    let favAndKeys = this.listingService.getFavorites();
    this.favoritesKeys = favAndKeys[0];
    this.favorites = favAndKeys[1];
    this.curPath = this.location.path().split('/')[1];

    this.house = JSON.parse(this.singlePageService.getHouseInfo());
  }

  toggleFavorites(house) {
    let id = '' + this.getHouseId(house);

    let pos = this.favoritesKeys.indexOf(id);
    if (pos > -1) {
      this.favoritesKeys.splice(pos, 1);
      delete this.favorites[id];
    } else {
      this.favoritesKeys.push(id);
      this.favorites[id] = house;
    }
  }

  getHouseId(house: any) {
    return this.listingService.getId(house.lister_url);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagesService.getPager(this.data.response.total_results, page, this.itemsPerPage);
    this.pagedItems = this.listings.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.currentPage = this.pager.currentPage;
  }

  sendRequest(place?: string, itemsPerPage = 24, page = 1, ...arg) {
    this.loading = true;

    if (place) {
      if ((this.place && this.place !== place) || !this.place) {
        this.currentPage = 1;
      }
      this.place = place;
    }

    this.listingService.getListing(place, itemsPerPage, page).subscribe(
      data => {
        this.data = data;
        this.listings = this.data.response.listings;
        this.pages = this.data.response.total_pages;
        this.setPage(this.currentPage);
        this.setPage(page);
      },
      err => console.error(err),
      () => {
        this.loading = false;
      }
    );
    if (place) {
      this.location.go('/search/place/' + place + '/' + page);
    }
  }

  ngOnInit() {
    this.route.params.pipe(map(params => {
      if (params.place) {
        this.currentPage = +params.page;
        this.sendRequest(params.place, params.listing_type, this.itemsPerPage, +params.page);
      }})
      );
  }


}
