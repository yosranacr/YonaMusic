import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Artist } from '../models/artist.model';
import { SongkickService } from '../service/songkick.service';
import { AuthService } from  '../service/auth.service';


@Component({
  selector: 'app-artist-search',
  templateUrl: './artist-search.component.html',
  styleUrls: ['./artist-search.component.css']
})
export class ArtistSearchComponent implements OnInit {

  artists$: Observable<Artist[]>;
  private searchTerms  = new Subject<string>();
  constructor(private songKickService: SongkickService, private  authService:  AuthService) { }

  ngOnInit() {
    this.artists$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.songKickService.searchArtist(term))
    );
  }

  searchArtist(term: string): void{
    this.searchTerms.next(term);
  }
}
