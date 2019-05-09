import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyEventsService } from '../service/my-events.service';
import { Event } from '../models/event.model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from  '../service/auth.service';

@Component({
  selector: 'app-my-events-details',
  templateUrl: './my-events-details.component.html',
  styleUrls: ['./my-events-details.component.css']
})
export class MyEventsDetailsComponent implements OnInit {

  events: Event[] = [];
  constructor(
    private myEventsService: MyEventsService,
    private toastr: ToastrService,
    private  authService:  AuthService
  ) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.myEventsService.getEvents().valueChanges()
      .subscribe(events => this.events = events);
  }

  deleteEvent(event : Event): void {
    this.myEventsService.deleteEvent(event);
  }


}
