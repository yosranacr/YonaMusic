import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtistSearchComponent } from './artist-search/artist-search.component';
import { HttpClientModule } from '@angular/common/http';
import { MessagesComponent } from './messages/messages.component';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { VenueSearchComponent } from './venue-search/venue-search.component';
import { VenueDetailsComponent } from './venue-details/venue-details.component';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { MyEventsDetailsComponent } from './my-events-details/my-events-details.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './auth.guard';
import { NoAuthGuard } from './no-auth.guard';


var config = {
  apiKey: "AIzaSyBPHbuL4U1QxG8crTgQhacpOpxafS1qTdo",
  authDomain: "yona-music.firebaseapp.com",
  databaseURL: "https://yona-music.firebaseio.com",
  projectId: "yona-music",
  storageBucket: "yona-music.appspot.com",
  messagingSenderId: "584418987041"
};

@NgModule({
  declarations: [
    AppComponent,
    ArtistSearchComponent,
    MessagesComponent,
    ArtistDetailsComponent,
    VenueSearchComponent,
    VenueDetailsComponent,
    LoginComponent,
    MyEventsDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthGuard,
    NoAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
