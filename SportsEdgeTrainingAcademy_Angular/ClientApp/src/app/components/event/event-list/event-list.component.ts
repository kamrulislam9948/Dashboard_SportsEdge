import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EventService } from '../../services/data/event.service';
import { Event } from '../../models/data/event';
import { apiBaseUrl } from '../../shared/app-constants';
import { SelectionPanelService } from '../../services/data/selectionPanel.service';
import { ManagerService } from '../../services/data/manager.service';

declare var $: any; // Declare $ globally

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent  implements OnInit{
  events: Event[] = [];
  filteredEvents: Event[] = [];
  imagePath: string = apiBaseUrl + '/Pictures';
  searchInput: string = '';

  constructor(
    private eventService: EventService,
    private selectionPanel : SelectionPanelService,
    private managerService : ManagerService
    ) {}

  ngOnInit(): void {
    this.eventService.getEvents()
      .subscribe((data) => {
        this.events = data;
        this.filteredEvents = data; // Initialize filtered data with all managers
      });
  }
  
  filterEvents() {
    this.filteredEvents = this.events.filter(x =>
      x.eventName?.toLowerCase().includes(this.searchInput.toLowerCase())
    );
  }

}
