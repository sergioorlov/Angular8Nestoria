import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  private apiUrl = 'https://cors-anywhere.herokuapp.com/https://api.nestoria.co.uk/api';

  constructor(private http: HttpClient) { }

  getListing(place?: string, numres = 24, page = 1) {

    let params = new URLSearchParams();
    params.set('country', 'uk');
    params.set('pretty', '1');
    params.set('action', 'search_listings');
    params.set('encoding', 'json');
    params.set('listing_type', 'rent');
    params.set('number_of_results', numres.toString());
    params.set('page', page.toString());

    if (place) {
      params.set('place_name', place);
    }

    let jsonUrl = this.apiUrl + '?' + params.toString();

    return this.http.get(jsonUrl)
      .pipe(res => res);
  }

  getId(url: string) {
    const ref = new URL(url);
    const id = parseInt(ref.pathname.split('/')[2]);
    return id;
  }

  getFavorites() {
    let favorites = {};
    let keys = [];
    if (localStorage.length > 0) {
      for (let id in localStorage) {
        if (!isNaN(+id)) {
          keys.push(id);
          favorites[id] = JSON.parse(localStorage[id]);
        }
      }
    }
    return [keys, favorites];
  }
}
