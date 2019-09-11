import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SinglePageService {

  houseInfo: any;

  setHouseInfo(info) {
    this.houseInfo = JSON.stringify(info);
    localStorage.setItem('lastSeen', JSON.stringify(info));
  }

  getHouseInfo() {
    console.log('houseInfo: ', this.houseInfo);
    return this.houseInfo ? this.houseInfo : localStorage.getItem('lastSeen');
  }

}
