import { Component, OnInit, ViewChild } from '@angular/core';
import { SchoolService } from '../smService/sm.service';
import { Subscription } from 'rxjs';
import { Router, Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, Validator } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {MathContent} from '../../../math/math-content';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  token: any;
  schId: any;
  leftDuration: any;
  results: Iresults[];
  subTime: any;
  config: any;
  isAvail: boolean;
  examId= '0';
  timeLeft= '';
  blinkClass='';
  filtersForm: FormGroup;
  @ViewChild('submitModal') submitModal: ModalDirective;
  countDownTimer:any;
  modelMsg='';

  constructor(private router: Router,
              private activatedRoute : ActivatedRoute,
              private schoolService: SchoolService) {
                this.leftDuration = {
                  hours:0,
                  minutes:0,
                  seconds:0
                }
                this.activatedRoute.params.subscribe(params => {
                  if (params.schId) {
                    this.schId = params.schId;
                  }
                });
              }

  ngOnInit(): void {
   this.loadexam();
  }

  onSubmit() {
    this.submitQuestion();
  }

  loadexam() {
    this.activatedRoute.params.pipe(switchMap((p:Params)=> this.schoolService.getExamContent(p['schId']))).subscribe(
      message => {
        if(message["errorCode"]==10001){
          this.modelMsg="Invalid Credential OR Invalidated by Admin!!";
          this.submitModal.show();
        }
        if(message["errorCode"]==10002){
          this.modelMsg="Exam is not Set!! Please contact Admin.";
          this.submitModal.show();
        }

        console.log('Message: '+message);
        this.isAvail=message["status"];
        this.subTime = message["subTime"];
        if(this.isAvail){
          this.results = message["paper"].qnAs;


          this.results.map((obj) => {
              var que=obj["question"];
              if(this.isMath(que)){
                obj.question = this.getMathMl(que);
                obj.isMath=true;
              }else{
                obj.isMath=false;
              }

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

          this.config = {
            totalItems: this.results.length,
            timeLeft: message["subTime"].timeLeft,
            examId: message["subTime"].examId
          };
          this.timeLeft=this.config.timeLeft;
          this.startTimeCountDown(this.config.timeLeft,this.leftDuration,new Date().getTime(),this.finishedexam);
        }else{
          if(this.subTime!=null){
            this.startTimeCountDown(this.subTime.timeLeft-this.subTime.durationInMinute,this.leftDuration,new Date().getTime(),this.loadexam2);
          }else{
            this.router.navigate(['/ng/sm/' + this.schId+'/timetable']);
          }

        }
      },err=>{throw err;}
    );
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

  loadexam2()  {
    window.location.reload();
  }

  submitQuestion(){
    var total=this.config.totalItems;
    var data="";
    var count=0;
    var ans=[];
    for(var i=1;i<=total;i++){
        if(data!=""){
            data=data+",";
        }
        var optName='q'+i;
        var radioValues = document.getElementsByName(optName);
        var radioValue = this.getRadioVal(radioValues);
        ans.push({"qId":i,"ans":radioValue});
        if(radioValue!=undefined){
            count++;
        }
    }

    var formData={"answers" : ans,"examId":this.config.examId};
    var result = this.schoolService.postExam(this.schId,formData).subscribe(res=>{
      if(res){
        clearInterval(this.countDownTimer);
        this.submitModal.show();
      }
    },err=>{
      throw err;
    })
  }

  getRadioVal(radios){
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        return radios[i].value;
        break;
      }
    }
  }

  startTimeCountDown(timeleft,td,startTime,cb){
      if(timeleft<0){
        this.router.navigate(['/ng/sm/' + this.schId+'/timetable']);
      }
      var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = now-startTime;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        var rm=timeleft-(minutes+1);
        var hour = Math.floor(rm / 60);
        var rm = Math.floor(rm % 60);
        if(rm<2){
          if(this.blinkClass==''){
            this.blinkClass='red-border';
          }else{
            this.blinkClass='';
          }
        }
        if(rm<0) {
          clearInterval(x);
          cb(td);
        }else{
          td.minutes=rm<10?"0"+rm:rm;
          var sc=(60-seconds);
          td.seconds=sc<10?"0"+sc:sc;
          td.hours=hour;
        }
      },1000);
      this.countDownTimer=x;
    }

    finishedexam(td) {
          td.minutes="00";
          td.seconds="00";

          var offsetHeight = document.getElementById('dvExamQ').offsetHeight;
          offsetHeight = offsetHeight + 100;
          document.getElementById('dvOverlay').style.height=offsetHeight + 'px';
          let el = document.querySelector("#dvOverlay");
          el.classList.remove('hide');
          el.classList.add('show');
    }

    invalidAndRedirect(){
      localStorage.setItem("token",null);
      this.submitModal.hide();
      this.router.navigate(['/ng/sm/' + this.schId]);
    }
}


export interface Iresults {
  latex?: string;
  question: MathContent;
  isMath:boolean;
  options: IOptionsResult[];
  map(arg0: (obj: any) => any);
}

export interface IOptionsResult {
  latex?: string;
  value: MathContent;
  isMath:boolean;
  map(arg0: (obj: any) => any);
}
