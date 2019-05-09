import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SongkickService } from '../service/songkick.service';
import { Event } from '../models/event.model';
import { MyEventsService } from '../service/my-events.service';
import { AuthService } from  '../service/auth.service';

@Component({
  selector: 'app-venue-details',
  templateUrl: './venue-details.component.html',
  styleUrls: ['./venue-details.component.css']
})
export class VenueDetailsComponent implements OnInit {

  events: Event[] = [];
  constructor(
    private route: ActivatedRoute,
    private songKickService: SongkickService,
    private location: Location,
    private myEventsService: MyEventsService,
    private  authService:  AuthService
  ) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.songKickService.getEventsByVenue(id)
      .subscribe(events => this.events = events)
  }

  addEvent(event: Event): void {
    this.myEventsService.addEvent(event);
  }
}
