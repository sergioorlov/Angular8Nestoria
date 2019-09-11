import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertySingleComponent } from './property-single/property-single.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PropertyItemComponent } from './property-item/property-item.component';
import { SearchFormComponent } from './search-form/search-form.component';
import {ListingService} from './shared/listing.service';
import {PagesService} from './shared/pages.service';
import {SinglePageService} from './shared/single-page.service';

@NgModule({
  declarations: [
    AppComponent,
    PropertyListComponent,
    PropertySingleComponent,
    PageHeaderComponent,
    PropertyItemComponent,
    SearchFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientJsonpModule,
    HttpClientModule

  ],
  providers: [
    ListingService,
    PagesService,
    SinglePageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
