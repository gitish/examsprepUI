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
          this.results = message["paper"].qnAs;
          this.isAvail=true;
          this.config = {
            totalItems: message["paper"].qnAs.length
          };
        }
      },err=>{throw err;}
    );
  }

  showAnswer(){
    var total=this.config.totalItems;
    var data="";
    var count=0;
    for(var i=1;i<=total;i++){
      var optName='q'+i;
      var radioValues = document.getElementsByName(optName);
      var radioValue = this.getRadioVal(radioValues);
      if(radioValue===undefined)continue;
      var id='#divQ'+i;
      let el = document.querySelector(id);
      el.classList.remove('bg-primary', 'bg-success', 'bg-danger');
      if(this.results[i-1].ans==radioValue){
        el.classList.add('bg-success');
      }else{
        el.classList.add('bg-danger');
      }
    }
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
