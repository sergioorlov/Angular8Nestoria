import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PropertyListComponent} from './property-list/property-list.component';
import {PropertySingleComponent} from './property-single/property-single.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'search/place/:place/:page', component: PropertyListComponent},
  { path: 'search', component: PropertyListComponent, pathMatch: 'full'},
  { path: 'favorites', component: PropertyListComponent},
  { path: 'single', component: PropertySingleComponent},
  { path: '**', redirectTo: '/search' },

];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
