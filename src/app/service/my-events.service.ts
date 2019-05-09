import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { User } from 'firebase';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class MyEventsService {

  user: User;
  eventList: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.user) this.eventList = this.db.list(`events/${this.user.uid}`);
  }

  getEvents() {
    if (!this.user) return;
    this.eventList = this.db.list(`events/${this.user.uid}`);
    return this.eventList;
  }

  addEvent(event : Event) {
    this.eventList.update(event.id.toString(), {
      id: event.id,
      name: event.name,
      type: event.type,
      venue: event.venue,
      date: event.date.toString(),
      artist: event.artist
    })
    
  }

  deleteEvent(event: Event) {
    this.eventList.remove(event.id.toString());
  }
}
