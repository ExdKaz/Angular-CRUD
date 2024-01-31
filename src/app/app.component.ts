import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmpComponent } from './add-emp/add-emp.component';
import { EmployeeService } from './services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dob', 'gender', 'education', 'company', 'experience', 'package', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _dialog: MatDialog, private _empservice: EmployeeService, private _coreService: CoreService) {

  }
  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEmp() {
    const dialogRef = this._dialog.open(AddEmpComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      }
    })
  }

  getEmployeeList() {
    this._empservice.getEmployeeList().subscribe({

      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  deleteEmployee(id: number) {
    this._empservice.deleteEmployee(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Employee Deleted', 'Done')
        this.getEmployeeList();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  openEditEmp(data: any) {
    const dialogRef = this._dialog.open(AddEmpComponent, { data });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
