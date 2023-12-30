import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location, formatDate } from '@angular/common';
import { Manager } from '../../models/data/manager';
import { Event } from '../../models/data/event';
import { SelectionPanel } from '../../models/data/selectionPanel';
import { ManagerService } from '../../services/data/manager.service';
import { SelectionPanelEditComponent } from '../../selectionPanel/selection-panel-edit/selection-panel-edit.component';
import { SelectionPanelService } from '../../services/data/selectionPanel.service';
import { EventService } from '../../services/data/event.service';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit {

  events: Event[] = [];
  managers : Manager [] =[];
  selectionPanels : SelectionPanel[] =[];

  eventForm: FormGroup = new FormGroup({
    eventName: new FormControl('', Validators.required),
    startDate: new FormControl(undefined, Validators.required),
    endDate: new FormControl(undefined, Validators.required),
    picture: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    locations: new FormControl('', Validators.required),
    selectionPanelId: new FormControl(undefined, Validators.required),
    managerId: new FormControl(undefined, Validators.required),
  });
  notifyService: any;

  constructor(
    private location: Location,
    private eventService : EventService,
    private managerService : ManagerService,
    private selectionPanelService : SelectionPanelService
    ) {}

  goBack(): void {
    this.location.back();
  }

  get f() {
    return this.eventForm.controls;
  }

  image: File = null!;

  upload(id: number) {
    const reader = new FileReader();
    reader.onload = (ev: any) => {
      this.eventService.uploadImage(id, this.image)
        .subscribe({
          next: r => {
            console.log(r);
            this.notifyService.message("Data Saved");
            this.eventForm.reset({});
            this.events = [];
            this.eventForm.markAsPristine();
            this.eventForm.markAsUntouched();
          },
          error: err => {
            this.notifyService.message("Cannot upload picture");
            console.log(err.message || err);
          }
        });
    }
    reader.readAsArrayBuffer(this.image);
  }
  onFileSelect(event: any) {
    if (event.target.files.length) {
      this.image = event.target.files[0];
      console.log(this.image);
      this.eventForm.patchValue({
        picture: this.image.name
      });
    }
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      this.eventService.create(this.eventForm.value).subscribe(
        (response) => {
          console.log('Form submitted:', this.eventForm.value);
          console.log('Response from server:', response);
          // You might also want to navigate to the event list or perform other actions here
        },
        (error) => {
          console.error('Error saving event:', error);
        }
      );
    } else {
      console.error('Form is invalid. Please check the fields.');
    }
  }
  
  

  ngOnInit(): void {
    forkJoin({
      managers: this.managerService.getManagers(),
      selectionPanels: this.selectionPanelService.getSelectionPanels()
    }).subscribe({
      next: (result) => {
        this.managers = result.managers;
        this.selectionPanels = result.selectionPanels;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }  
  showSuccessNotification() {
    if (this.eventForm.valid) {
      Swal.fire({
        icon: 'success',
        title: 'Success! Data saved'
      });
    }
  } 
}