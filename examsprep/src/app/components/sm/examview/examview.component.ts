import { Component, OnInit, ViewChild } from '@angular/core';
import { SchoolService } from '../smService/sm.service';
import { Subscription } from 'rxjs';
import { Router, Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {MathContent} from '../../../math/math-content';

@Component({
  selector: 'app-examview',
  templateUrl: './examview.component.html',
  styleUrls: ['./examview.component.css']
})
export class ExamviewComponent implements OnInit {
  schId: any;
  results: Iresults[];
  ansMap:any;
  examId: any;
  constructor(private router: Router,
              private activatedRoute : ActivatedRoute,
              private schoolService: SchoolService) {
                this.activatedRoute.params.subscribe(params => {
                  if (params.schId) {
                    this.schId = params.schId;
                  }
                });
              }

  ngOnInit(): void {
    this.getExamView();
  }


  getExamView(){
    this.examId=localStorage.getItem("viewSub");

    this.activatedRoute.params.pipe(switchMap((p:Params)=> this.schoolService.getExamView(p['schId'],this.examId))).subscribe(
      message => {
        console.log(message);
        if(message["errorCode"]==10001||message["errorCode"]==10002){
          this.invalidAndRedirect();
          return;
        }

        this.results = message["paper"].qnAs;
        this.ansMap = message["answerMap"];

        this.results.map((obj) => {
            var que=obj["question"];
            var qno=obj["qNo"];
            console.log(qno);
            if(this.isMath(que)){
              obj.question = this.getMathMl(que);
              obj.isMath=true;
            }else{
              obj.isMath=false;
            }
            var usrAns=this.ansMap[obj["qNo"]];
            var crctAns=obj["ans"];
            if(usrAns.ans=="undefined" || usrAns.ans==undefined){
              obj.scheme="bg-primary";
            } else if(usrAns.ans==obj["ans"]){
              obj.scheme="bg-success";
            }else {
              obj.scheme="bg-danger";
            }
            obj.options.map((opt) => {
              var op=opt["value"];
              if(this.isMath(op)){
                opt.isMath=true;
                opt.value = this.getMathMl(op);
              }else{
                opt.isMath=false;
              }
              if(opt["id"]==usrAns.ans){
                opt.color="gray";
              }
              return opt;
            });
            return obj;
        })
      },err=>{throw err;});
  }

  invalidAndRedirect(){
    localStorage.setItem("token",null);
    this.router.navigate(['/ng/sm/' + this.schId]);
  }

  isMath(data){
    return data.indexOf("<math")>-1;
  }

  getMathMl(data){
    var mathMl: MathContent = {
      mathml: ''
    };
    mathMl.mathml = data;
    return mathMl;
  }
  getMathMlForQuestion(data){
    // tslint:disable-next-line:no-unused-expression
   let optionsitem: IOptionsResult;
    data.map((obj) => {
      console.log(obj);
      obj.value = this.getMathMl(obj.value);
      return obj;
    })
  }

}

export interface Iresults {
  latex?: string;
  question: MathContent;
  isMath:boolean;
  scheme:string;
  opr:string;
  options: IOptionsResult[];
  map(arg0: (obj: any) => any);
}

export interface IOptionsResult {
  latex?: string;
  value: MathContent;
  isMath:boolean;
  color:string;
  map(arg0: (obj: any) => any);
}
