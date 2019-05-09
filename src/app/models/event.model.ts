import { Artist } from './artist.model';
import { Venue } from './venue.model';

export class Event {
  constructor(
        public id: number,
        public name: string,
        public type: string,
        public venue: Venue,
        public date: Date,
        public artist: Artist) { }
}
