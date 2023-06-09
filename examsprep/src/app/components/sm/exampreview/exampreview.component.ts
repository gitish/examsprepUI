import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../smService/sm.service';
import { Subscription } from 'rxjs';
import { Router, Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {MathContent} from '../../../math/math-content';

@Component({
  selector: 'app-exampreview',
  templateUrl: './exampreview.component.html',
  styleUrls: ['./exampreview.component.css']
})
export class ExampreviewComponent implements OnInit {

  examinerId:any;
  schId: any;
  ansMap: any;
  examId: any;
  results: Iresults[];
constructor(private router: Router,
            private activatedRoute: ActivatedRoute,
            private schoolService: SchoolService) {
    this.activatedRoute.params.subscribe(params => {
      if (params.examinerId) {
        this.examinerId = params.examinerId;
        console.log(this.examinerId);
      }
      if (params.examId) {
        this.examId = params.examId;
        console.log(this.examId);

      }
    });
  }

  ngOnInit(): void {
    this.getExamView();
  }


  getExamView(){


    this.activatedRoute.params.pipe(switchMap((p:Params)=> this.schoolService.getExamPreView(this.examinerId,this.examId))).subscribe(
      message => {
        console.log(message);
        if(message["errorCode"]==10001||message["errorCode"]==10002){
          this.invalidAndRedirect();
          return;
        }
        this.results = message["paper"].qnAs;

        this.results.map((obj) => {
            var que=obj["question"];
            if(this.isMath(que)){
              obj.question = this.getMathMl(que);
              obj.isMath=true;
            }else{
              obj.isMath=false;
            }
            obj.scheme="bg-primary";

            obj.options.map((opt) => {
              var op=opt["value"];
              if(this.isMath(op)){
                opt.isMath=true;
                opt.value = this.getMathMl(op);
              }else{
                opt.isMath=false;
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

