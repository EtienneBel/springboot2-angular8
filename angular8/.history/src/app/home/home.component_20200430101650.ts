import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../_services/employee.service';
import { Employee } from '../employee/employee';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
// content: any;
employees: Observable<Employee[]>;

constructor(
  private employeeService: EmployeeService,
  // private userService: UserService,
  private router: Router
) { }

ngOnInit() {
  this.reloadData();
}

updateEmployee(id: number) {
  this.router.navigate(["update", id]);
}

deleteEmployee(id: number) {
  this.employeeService.deleteEmployee(id).subscribe(
    (data) => {
      console.log(data);
      this.reloadData();
    },
    (error) => console.log(error)
  );
}

employeeDetails(id: number) {
  this.router.navigate(["details", id]);
}

reloadData() {
  // this.employees = this.employeeService.getEmployeesList();
  this.employeeService.getEmployeesList().subscribe(
    (data) => {
      this.employees = data;
    },
    (err) => {
      this.employees = JSON.parse(err.error).message;
    }
  );

}
}
