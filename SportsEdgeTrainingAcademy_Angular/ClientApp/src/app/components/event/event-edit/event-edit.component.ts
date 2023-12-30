import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { apiBaseUrl } from '../../shared/app-constants';
import { EventService } from '../../services/data/event.service';
import { ManagerService } from '../../services/data/manager.service';
import { SelectionPanelService } from '../../services/data/selectionPanel.service';
import { NotifyService } from '../../services/common/notify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Manager } from '../../models/data/manager';
import { Event } from "../../models/data/event";
import { SelectionPanel } from '../../models/data/selectionPanel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {

  event: Event = { selectionPanel: {}, manager: {} } ;
  manager: Manager [] = [];
  selectionPanels: SelectionPanel[] = [];
  
  eventForm: FormGroup = new FormGroup({
    eventName: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    picture: new FormControl(''),
    selectionPanelId: new FormControl('', Validators.required),
    managerId: new FormControl('', Validators.required),
    
  });
  

  image: File = null!;
  imagePath:string = apiBaseUrl+'/Pictures'
  
  getImageUrl(pictureFilename: string): string {
    return `${this.imagePath}/${pictureFilename}`;
  }

  constructor(
    private eventService: EventService,
    private managerService:ManagerService,
    private selectionPanelService : SelectionPanelService,
    private notifyService: NotifyService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  goBackToList() {
    this.router.navigate(['/events']);
  }
  get f() {
    return this.eventForm.controls;
  }

  upload(id:number){
    const reader = new FileReader();
    reader.onload = (ev:any)=>{
      this.eventService.uploadImage(id, this.image)
      .subscribe({
        next:r=>{
          console.log(r);
          
         this.event.picture =r.fileName
          this.notifyService.message("Event updated", "DISMISS");
          this.image=null!;
        },
        error:err=>{
          console.log(err.message || err);
          this.notifyService.message("Failed to update Event", "DISMISS")
        }
      })
    }
    reader.readAsArrayBuffer(this.image);
  }

  save() {
    if (this.eventForm.invalid) return;
    
    // Update the properties of the single event object
    this.event.eventName = this.f["eventName"].value;
    this.event.startDate = this.f["startDate"].value;
    this.event.endDate = this.f["endDate"].value;
    this.event.description = this.f["description"].value;
    this.event.location = this.f["location"].value;
    this.event.picture = this.f["picture"].value;

    this.eventService.update(this.event).subscribe({
      next: (r) => {
        if (this.image != null) {
          this.upload(this.event.eventId!); // Assuming eventId is defined on your Event interface
        } else {
          this.notifyService.message("Event updated", "DISMISS");
        }
      },
      error: (err) => {
        console.log(err.message || err);
        this.notifyService.message("Failed to update Event", "DISMISS");
      },
    });
  }

  ngOnInit(): void {
    let id: number = this.activateRoute.snapshot.params['id'];
    console.log(id);
  
    this.eventService.getEventById(id)
      .subscribe({
        next: r => {
          this.event = r;
  
          // Set all form controls except for the picture
          this.eventForm.setValue({
            managerId: this.event.managerId,
            selectionPanelId: this.event.selectionPanelId,
            eventName: this.event.eventName,
            startDate: this.event.startDate,
            endDate: this.event.endDate,
            location: this.event.location,
            description: this.event.description,
            picture: this.event.picture,
          });
  
          // Set the picture form control separately
          this.eventForm.get('picture')?.setValue(this.event.picture);
  
          // Set the placeholder for the picture input
          const pictureInput = document.getElementById('customFile');
          if (pictureInput) {
            pictureInput.setAttribute('placeholder', this.event.picture ?? '');
          }
        },
        error: err => {
          console.log(err.message || err);
          this.notifyService.message("Failed to load Event", "DISMISS");
        }
      });
  }
  

  onFileSelect(event:any){
    if(event.target.files.length){
      this.image =event.target.files[0];
      console.log(this.image);
      this.eventForm.patchValue({
        picture:this.image.name
      });
    }
  }
  showSuccessNotification() {
    if (this.eventForm.valid) {
      Swal.fire({
        icon: 'success',
        title: 'Success! Data Updated'
      });
    }
  } 
}
