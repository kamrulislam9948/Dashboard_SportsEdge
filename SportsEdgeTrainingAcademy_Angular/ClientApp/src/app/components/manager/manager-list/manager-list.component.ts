import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../services/data/manager.service';
import { Manager } from '../../models/data/manager';
import { apiBaseUrl } from '../../shared/app-constants';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDeleteComponent } from '../../dialog/confirmation-delete/confirmation-delete.component';

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.css']
})
export class ManagerListComponent implements OnInit {

  managers: Manager[] = [];
  filteredManagers: Manager[] = [];
  imagePath: string = apiBaseUrl + '/Pictures';
  expandedManagers: { [key: number]: boolean } = {};
  searchInput: string = '';

  constructor(
    private managerService: ManagerService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.managerService.getManagersWithEvents()
      .subscribe((data) => {
        this.managers = data;
        this.filteredManagers = data; // Initialize filtered data with all managers
      });
  }

  toggleEvents(managerId: number) {
    this.expandedManagers[managerId] = !this.expandedManagers[managerId];
  }

  filterManagers() {
    this.filteredManagers = this.managers.filter(x =>
      x.managerName?.toLowerCase().includes(this.searchInput.toLowerCase())
    );
  }

  openConfirmationDialog(managerId: number): void {
    const dialogRef = this.matDialog.open(ConfirmationDeleteComponent);
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User clicked confirm, proceed with the delete logic
        this.deleteManager(managerId);
      }
      // else, the user clicked cancel, do nothing
    });
  }

  deleteManager(managerId: number): void {
    // Call your service to delete the manager
    this.managerService.delete(managerId).subscribe(() => {
      // Successfully deleted, refresh the manager list
      this.refreshManagerList();
    });
  }

  private refreshManagerList(): void {
    // You can call this method to refresh the manager list after deletion
    this.managerService.getManagersWithEvents().subscribe((data) => {
      this.managers = data;
      this.filteredManagers = data;
    });
  }
}
