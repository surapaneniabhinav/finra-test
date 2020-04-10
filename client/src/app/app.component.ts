import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PhoneService } from './phone.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showGrid: boolean = false;
  loading: boolean = false;
  mainForm: FormGroup;
  serverData = [];
  length: number;
  pageSize:number = 25;
  pageSizeOptions: number[] = [10, 25, 50, 100];

  constructor(private phoneService: PhoneService){}

  ngOnInit(){
    this.mainForm = new FormGroup({
      phoneNumber: new FormControl(null,[Validators.required, Validators.pattern('^(([0-9]{7})|([0-9]{10}))$')])
    });
  }

  submit(){
    this.showGrid = false;
    this.loading = true;
    this.phoneService.getPhoneNumbers(this.mainForm.value.phoneNumber, 1, this.pageSize)
    .subscribe((res) => {
      this.serverData = res.data;
      this.length = res.total;
      this.showGrid = true;
      this.loading = false;
    },(err) => {
      console.log(err);
      this.loading = false;
    });
  }

  resetForm(){
    this.showGrid = false;
    this.mainForm.reset();
  }

  changePage(event){
    this.loading = true;
    this.phoneService.getPhoneNumbers(this.mainForm.value.phoneNumber, event.pageIndex+1, event.pageSize)
    .subscribe((res) => {
      this.serverData = res.data;
      this.loading = false;
    },(err) => {
      console.log(err);
      this.loading = false;
    });
  }

}
