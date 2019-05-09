import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Venue } from '../models/venue.model'
import { SongkickService } from '../service/songkick.service';
import { AuthService } from  '../service/auth.service';

@Component({
  selector: 'app-venue-search',
  templateUrl: './venue-search.component.html',
  styleUrls: ['./venue-search.component.css']
})
export class VenueSearchComponent implements OnInit {

  venues$: Observable<Venue[]>;
  private searchTerms = new Subject<string>();
  constructor(private songKickService: SongkickService, private  authService:  AuthService) { }

  ngOnInit() {
    this.venues$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.songKickService.searchVenue(term)),
    );
  }
  
  searchVenue(term: string): void{
    this.searchTerms.next(term);
  }
}
