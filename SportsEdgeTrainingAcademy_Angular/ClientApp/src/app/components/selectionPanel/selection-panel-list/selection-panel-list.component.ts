import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionPanel } from '../../models/data/selectionPanel';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionPanelService } from '../../services/data/selectionPanel.service';

@Component({
  selector: 'app-selection-panel-list',
  templateUrl: './selection-panel-list.component.html',
  styleUrls: ['./selection-panel-list.component.css']
})
export class SelectionPanelListComponent implements OnInit {

  dataSource = new MatTableDataSource<SelectionPanel>([]);
  displayedColumns: string[] = ['selectorName', 'coachName', 'medicalAdvisorName'];

  @ViewChild(MatPaginator) matpaginator!: MatPaginator;
  @ViewChild(MatSort) matsort!: MatSort;

  constructor(private selectionPanelService: SelectionPanelService) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.matpaginator;
    this.dataSource.sort = this.matsort;

    this.getSelectionPanels();
  }

  getSelectionPanels(): void {
    this.selectionPanelService.getSelectionPanels()
      .subscribe((data) => {
        this.dataSource.data = data;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}