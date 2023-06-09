import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../smService/sm.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  results: any;
  isEmpty:boolean;
  subscription: Subscription;
  constructor(private schoolService: SchoolService,private router: Router) { }

  ngOnInit(): void {
    this.getSchoolList();
  }

  getSchoolList(){
    this.subscription = this.schoolService.getSchoolList().subscribe(message => {
      console.log(message);
      if(message.length==0){
        this.isEmpty=true;
      };
      this.results=message;

    },err=>{throw err;});
  }


}
