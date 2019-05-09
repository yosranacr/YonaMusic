import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Artist } from '../models/artist.model';
import { Event } from '../models/event.model';
import { Venue } from '../models/venue.model';
import { MessageService } from './message.service';
@Injectable({
  providedIn: 'root'
})
export class SongkickService {

  urlArtist = 'http://api.songkick.com/api/3.0/search/artists.json';
  urlVenue = 'http://api.songkick.com/api/3.0/search/venues.json';
  urlEventsByArtist = 'http://api.songkick.com/api/3.0/artists/${id}/calendar.json';
  urlEventsByVenue = 'http://api.songkick.com/api/3.0/venues/${id}/calendar.json';
  apiKey = 'io09K9l3ebJxmxe2'

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }

  searchArtist(term: string): Observable<Artist[]> {
    if(!term.trim()){
      return of([]);
    } else {
      const httpOptions = {
        params: new HttpParams().set('query', `${term}`).set('apikey', `${this.apiKey}`)
      };
      return this.http.get<Artist[]>(`${this.urlArtist}`, httpOptions)
        .pipe(
          map(res => {
            if( Object.entries(res['resultsPage'].results).length === 0 &&
                  res['resultsPage'].results.constructor === Object ){
                    return new Array<Artist>();
            } else {
              return res['resultsPage'].results.artist.map(item => {
                return new Artist(item.id, item.displayName);
              }).slice(0, 4);
            }
          }),
          catchError(this.handleError('searchArtist', []))
        )
    }
  }

  searchVenue(term: string): Observable<Venue[]> {
    if(!term.trim()){
      return of([]);
    } else {
      const httpOptions = {
        params: new HttpParams().set('query', `${term}`).set('apikey', `${this.apiKey}`)
      };
      return this.http.get<Venue[]>(`${this.urlVenue}`, httpOptions)
        .pipe(
          map(res => {
            if( Object.entries(res['resultsPage'].results).length === 0 &&
                  res['resultsPage'].results.constructor === Object ){
                    return new Array<Venue>();
            } else {
              return res['resultsPage'].results.venue.map(item => {
                return new Venue(item.id, item.displayName, item.city.displayName, item.city.country, item.lat, item.lng);
              }).slice(0, 4)
            }
          }),
          catchError(this.handleError('searchVenue', []))
        )
    }
  }

  getEventsByArtist(id: number): Observable<Event[]> {
    const url = this.urlEventsByArtist.replace('${id}', `${id}`);

    const httpOptions = {
      params: new HttpParams().set('apikey', `${this.apiKey}`)
    };
    return this.http.get<Event[]>(`${url}`, httpOptions)
      .pipe(
        map(res => {
          if ( Object.entries(res['resultsPage'].results).length === 0 &&
                res['resultsPage'].results.constructor === Object ) {
            return new Array<Event>();
          } else {
            return res['resultsPage'].results.event.map(item => {
              let eventArtist: Artist;
              for (const art of item.performance) {
                  if (art.artist.id === id) {
                    eventArtist = new Artist(art.artist.id, art.artist.displayName);
                    break;
                  }
              }
              let eventDate: Date;
              if (item.type === 'Festival') {
                eventDate = new Date(item.start.date);
              } else {
                eventDate = new Date(item.start.datetime);
              }
              return new Event(
                item.id,
                item.displayName,
                item.type,
                new Venue(item.venue.id,
                  item.venue.displayName,
                  item.venue.metroArea.displayName,
                  item.venue.metroArea.country.displayName,
                  item.venue.lat, item.venue.lng
                ),
                eventDate,
                eventArtist
              );
            });
          }

        }),
        catchError(this.handleError('getEventsByArtist', []))
      );
  }

  getEventsByVenue(id: number): Observable<Event[]> {
    const url = this.urlEventsByVenue.replace('${id}', `${id}`);

    const httpOptions = {
      params: new HttpParams().set('apikey', `${this.apiKey}`)
    };
    return this.http.get<Event[]>(`${url}`, httpOptions)
      .pipe(
        map(res => {
          if ( Object.entries(res['resultsPage'].results).length === 0 &&
                res['resultsPage'].results.constructor === Object ) {
            return new Array<Event>();
          } else {
            return res['resultsPage'].results.event.map(item => {
              let eventArtist: Artist;
              for (const art of item.performance) {
                    eventArtist = new Artist(art.artist.id, art.artist.displayName);
              }
              let eventDate: Date;
              if (item.type === 'Festival') {
                eventDate = new Date(item.start.date);
              } else {
                eventDate = new Date(item.start.datetime);
              }
              return new Event(
                item.id,
                item.displayName,
                item.type,
                new Venue(item.venue.id,
                  item.venue.displayName,
                  item.venue.metroArea.displayName,
                  item.venue.metroArea.country.displayName,
                  item.venue.lat, item.venue.lng
                ),
                eventDate,
                eventArtist
              );
            });
          }

        }),
        catchError(this.handleError('getEventsByVenue', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(message);
  }
}
