import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Manager } from '../../models/data/manager';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ManagerService } from '../../services/data/manager.service';
import { NotifyService } from '../../services/common/notify.service';
import { ActivatedRoute } from '@angular/router';
import { apiBaseUrl } from '../../shared/app-constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manager-edit',
  templateUrl: './manager-edit.component.html',
  styleUrls: ['./manager-edit.component.css']
})
export class ManagerEditComponent implements OnInit {

  manager: Manager = {};
  showNotification: boolean = false;


  managerForm: FormGroup = new FormGroup({
    managerName: new FormControl('', Validators.required),
    joinDate: new FormControl(undefined, Validators.required),
    email: new FormControl(undefined, Validators.required),
    phone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    picture: new FormControl('', ),

  });

  constructor(
    private managerService: ManagerService,
    private notifyService: NotifyService,
    private activatedRoute: ActivatedRoute
  ) { }

  image: File = null!;
  imagePath: string = apiBaseUrl + '/Pictures'


  getImageUrl(pictureFilename: string): string {
    return `${this.imagePath}/${pictureFilename}`;
  }


  get f() {
    return this.managerForm.controls;
  }

  upload(id: number) {
    const reader = new FileReader();
    reader.onload = (ev: any) => {
      // Upload the new picture to the server
      const formData = new FormData();
      formData.append('file', this.image);
  
      this.managerService.uploadImage(id, formData)
        .subscribe({
          next: r => {
            console.log(r);
  
            // Update the manager's picture after successful upload
            this.manager.picture = r.fileName;
            this.notifyService.message("Item updated", "DISMISS");
            this.image = null!; // Reset the selected image
          },
          error: err => {
            console.log(err.message || err);
            this.notifyService.message("Failed to update item", "DISMISS");
          }
        });
    };
    reader.readAsArrayBuffer(this.image);
  }
  
  save() {
    if (this.managerForm.invalid) return;
  
    this.manager.managerName = this.f["managerName"].value;
    this.manager.joinDate = this.f["joinDate"].value;
    this.manager.email = this.f["email"].value;
    this.manager.phone = this.f["phone"].value;
    this.manager.address = this.f["address"].value;
  
    // Submit the form without updating the picture
    this.submitForm();
  }
  
  submitForm() {
    this.managerService.update(this.manager)
      .subscribe({
        next: r => {
          this.notifyService.message("Manager updated", "DISMISS");
        },
        error: err => {
          console.log(err.message || err);
          this.notifyService.message("Failed to update Manager", "DISMISS");
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

  ngOnInit(): void {
    let id: number = this.activatedRoute.snapshot.params['id'];
    console.log(id);

    this.managerService.getManagerById(id)
      .subscribe({
        next: r => {
          this.manager = r;

          // Set all form controls except for the picture
          this.managerForm.patchValue({
            managerName: this.manager.managerName,
            joinDate: this.manager.joinDate,
            email: this.manager.email,
            phone: this.manager.phone,
            address: this.manager.address,
          });

          // Set the picture form control separately
          this.managerForm.get('picture')?.setValue(this.manager.picture);

          // Set the placeholder for the picture input
          const pictureInput = document.getElementById('customFile');
          if (pictureInput) {
            pictureInput.setAttribute('placeholder', this.manager.picture ?? '');
          }
        },
        error: err => {
          console.log(err.message || err);
          this.notifyService.message("Failed to load Manager", "DISMISS");
        }
      });
  }


  showSuccessNotification() {
    if (this.managerForm.valid) {
      Swal.fire({
        icon: 'success',
        title: 'Success! Data Updated'
      });
    }
  }
}
