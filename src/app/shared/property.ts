export class Property {
  id: number;
  thumb_url: string;
  title: string;
  price_formatted: string;
  constructor(public isInFavorites: boolean = false) {
    console.log('Property object created');
  }
}
