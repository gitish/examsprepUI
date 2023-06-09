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
  subscription: Subscription;
  constructor(private examService: ExamService,private router: Router) { }

  ngOnInit(): void {
    this.getExaminerProfiles();
  }

  getExaminerProfiles(){
    this.subscription = this.examService.getExaminerProfile().subscribe(message => {
      console.log(message);
      this.results=message["examiners"];
    },err=>{throw err;});
  }

}
