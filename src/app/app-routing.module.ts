import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistSearchComponent } from './artist-search/artist-search.component';
import { VenueSearchComponent } from './venue-search/venue-search.component';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { VenueDetailsComponent } from './venue-details/venue-details.component';
import { LoginComponent } from './login/login.component';
import { MyEventsDetailsComponent } from './my-events-details/my-events-details.component';
import { AuthGuard } from './auth.guard';
import { NoAuthGuard } from './no-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/artist/search', pathMatch: 'full'},
  { path: 'artist/search', component: ArtistSearchComponent},
  { path: 'artist/:id', component: ArtistDetailsComponent},
  { path: 'venue/search', component: VenueSearchComponent},
  { path: 'venue/:id', component: VenueDetailsComponent},
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard]},
  { path: 'my-events', component: MyEventsDetailsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
