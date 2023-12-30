import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Manager } from '../../models/data/manager';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ManagerService } from '../../services/data/manager.service';
import { NotifyService } from '../../services/common/notify.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manager-add',
  templateUrl: './manager-add.component.html',
  styleUrls: ['./manager-add.component.css']
})
export class ManagerAddComponent implements OnInit {

  manager: Manager = {};
  showNotification: boolean = false;
  //Toast : boolean  = false;

  managerForm: FormGroup = new FormGroup({
    managerName: new FormControl('', Validators.required),
    joinDate: new FormControl(undefined, Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    picture: new FormControl('', Validators.required),
    events: new FormArray([])
  });

  constructor(
    private location: Location,
    private managerService: ManagerService,
    private notifyService: NotifyService,
  ) { }

  goBack(): void {
    this.location.back();
  }

  image: File = null!;

  // get events(): FormArray {
  //   return this.managerForm.get('events') as FormArray;
  // }

  // addEvents() {
  //   this.events.push(
  //     new FormGroup({
  //       eventName: new FormControl('', Validators.required),
  //       startDate: new FormControl(undefined, Validators.required),
  //       endDate: new FormControl(undefined, Validators.required),
  //       description: new FormControl('', Validators.required),
  //       locations: new FormControl('', Validators.required),
  //       address: new FormControl('', Validators.required),
  //       selectionPanelId: new FormControl('', Validators.required),
  //       managerId: new FormControl('', Validators.required),
  //       manager: new FormArray([])
  //     })
  //   );
  // }

  onSave() {
    this.managerForm.markAllAsTouched();
    if (this.managerForm.invalid) return;
    Object.assign(this.manager, this.managerForm.value);
    this.managerService.create(this.manager)
      .subscribe({
        next: (r: any) => {
          this.notifyService.message("Data Saved");
          this.managerForm.reset();
          this.upload(<number>r.managerId);
        },
        error: err => {
          this.notifyService.message("Failed to save manager");
        }
      });
  }

  onFileSelect(event: any) {
    if (event.target.files.length) {
      this.image = event.target.files[0];
      console.log(this.image);
      this.managerForm.patchValue({
        picture: this.image.name
      });
    }
  }
  upload(id: number) {
    const formData = new FormData();
    formData.append('file', this.image);
  
    this.managerService.uploadImage(id, formData)
      .subscribe({
        next: r => {
          console.log(r);
          this.manager.picture = r.fileName;
          this.notifyService.message("Item updated", "DISMISS");
  
          // Fetch the updated manager details after the image upload is completed
          this.managerService.getManagerById(id).subscribe({
            next: updatedManager => {
              this.manager = updatedManager;
            },
            error: err => {
              console.log(err.message || err);
            }
          });
  
          this.image = null!;
        },
        error: err => {
          console.log(err.message || err);
          this.notifyService.message("Failed to update item", "DISMISS");
        }
      });
  }
  
  
  showSuccessNotification() {
    if (this.managerForm.valid) {
      Swal.fire({
        icon: 'success',
        title: 'Success! Data saved'
      });
    }
  }  

  
  ngOnInit(): void {
    // Your initialization logic goes here
  }
}
