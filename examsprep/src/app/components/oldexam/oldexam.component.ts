import { Component, OnInit } from '@angular/core';
import { NewExamService } from 'src/app/services/newExam.service';
import { ExamService} from '../examService/exam.service';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { QnaResult } from 'src/app/model/qna-result.model';
import { ActivatedRoute, Router , Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-oldexam',
  templateUrl: './oldexam.component.html',
  styleUrls: ['./oldexam.component.css']
})
export class OldexamComponent{
  subscription: Subscription;
  results : any;
  config: any;
  examId: any;
  examinerId: any;
  isAvail: boolean;

  constructor(private dataservice: NewExamService,
              private activatedRoute : ActivatedRoute,
              private examService: ExamService) {
    this.activatedRoute.params.subscribe(params => {
      if (params.examId) {
        this.examId = params.examId;
      }
      if (params.examinerId) {
        this.examinerId = params.examinerId;
      }
    });
  }

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions(){
    this.activatedRoute.params.pipe(switchMap((p:Params) => this.examService.getExamFinished(p['examinerId'],p['examId']))).subscribe(
      message => {
        console.log(message);
        if(message["status"]== "Failure"){
          this.isAvail=false;
        }else{
          this.results = message["questions"];
          this.isAvail=true;
        }
      },err=>{throw err;}
    );
  }

  getRadioVal(radios){
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        // do whatever you want with the checked radio
        return radios[i].value;
        break;
      }
    }
  }
}

