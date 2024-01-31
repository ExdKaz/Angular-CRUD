
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent implements OnInit {

  empForm: FormGroup;

  education: string[] = [
    'matric',
    'diploma',
    'intermediate',
    'graduation',
    'post graduate'
  ];

  constructor(private _formbuilder: FormBuilder, private _employeeService: EmployeeService, private _dialogref: MatDialogRef<AddEmpComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _coreService: CoreService) {
    this.empForm = this._formbuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: ''
    })
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._employeeService.editEmployee(this.data.id, this.empForm.value).subscribe({

          next: (value: any) => {
            this._coreService.openSnackBar('Employee Updated Sucessfully');
            this._dialogref.close(true);
          },

          error: (err: any) => {
            console.error(err);
          }
        })
      } else {
        this._employeeService.addEmployee(this.empForm.value).subscribe({

          next: (value: any) => {
            this._coreService.openSnackBar('Employee Added Sucessfully');
            this._dialogref.close(true);
          },

          error: (err: any) => {
            console.error(err);
          }
        })
      }

    }
  }
}
