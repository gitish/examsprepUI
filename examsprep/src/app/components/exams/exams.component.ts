import { Component, OnInit } from '@angular/core';
import { ExamService} from '../examService/exam.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {
  results: any;
  defaultuser: Object = {
    id: 0,
    name: "It Could Be You",
    status: "active",
    image: "assets/images/unknown_.png",
    quote: "Your quotation",
    designation: "Your Designation",
    link: "/ng/contact"
  }
  subscription: Subscription;
  constructor(private examService: ExamService,private router: Router) { }

  ngOnInit(): void {
    this.getExaminerProfiles();
  }

  getExaminerProfiles(){
    this.subscription = this.examService.getExaminerProfile().subscribe(message => {
      console.log("profile: " + message);
      this.results=message;
      this.results.push(this.defaultuser);
      localStorage.setItem("examinerId",message["profileId"]);
    },err=>{throw err;});
  }

}
