import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { QnaResult } from 'src/app/model/qna-result.model';
import { element } from 'protractor';
import { FormBuilder, FormGroup, FormControl, Validators, Validator } from '@angular/forms';
import { ExamService} from '../examService/exam.service';
import { Router , Params, ActivatedRoute} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NewExamService } from 'src/app/services/newExam.service';
import{ GlobalData } from '../../global';

@Component({
  selector: 'app-newexam',
  templateUrl: './newexam.component.html',
  styleUrls: ['./newexam.component.css']
})
export class NewexamComponent
{
  subscription: Subscription;
  results: [];
  config: any;
  isAvail: boolean;
  personName = '';
  personMobile = '';
  timeleft= '';
  @Input() name: string;
  filtersForm: FormGroup;
  @ViewChild('submitModal') submitModal: ModalDirective;
  @ViewChild('messgeModal') messgeModal: ModalDirective;
  result: any;
  data: any;
  examId= '0';
  examinerId='0';
  messageforpopupinfo= '';
  constructor(private fBuilder: FormBuilder,
              private examService: ExamService,
              private router: Router,
              private dataservice: NewExamService,
              private activatedRoute : ActivatedRoute,
              private globalData:GlobalData) {

    this.filtersForm = this.fBuilder.group({
      'cifName': new FormControl('', [ Validators.required, Validators.maxLength(30) ]),
      'cifMobile': new FormControl('', [ Validators.required, Validators.maxLength(30) ])
    });

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
    this.getQuestionsList();
  }
  onSubmit() {
    if(this.globalData.loginDetail) {
      this.personName= this.globalData.loginDetail.name;
      this.personMobile= this.globalData.loginDetail.mobile;
      this.submitQuestion();
    } else {
      this.messageforpopupinfo = 'Seems You are logged out. Login again to submit your answers';
      this.messgeModal.show();
    }
  }

  getQuestionsList(){
    this.activatedRoute.params.pipe(switchMap((p:Params)=> this.examService.getExamList(p['examinerId']))).subscribe(
      message => {
        if(message["status"]== "Failure"){
          this.isAvail=false;
        }else{
          this.data = message;
        }
      },err=>{throw err;}
    );
  }

  get hasMobileErrorRequired() {
    const controller = this.filtersForm.get('cifMobile');
    return controller.touched && controller.errors && controller.errors.required;
  }

  get hasNameErrorRequired() {
    const controller = this.filtersForm.get('cifName');
    return controller.touched && controller.errors && controller.errors.required;
  }

  getQuestions(){
    this.activatedRoute.params.pipe(switchMap((p:Params)=> this.examService.getExamInProgress(p['examinerId']))).subscribe(
      message => {
        if(message["status"]== "Failure"){
          this.isAvail=false;
        }else{
          this.results = message["paper"].qnAs;
          this.isAvail=true;
          this.config = {
            totalItems: this.results.length,
            timeLeft: message["timeDetails"].leftTime,
            examId: message["examId"]
          };
          this.startTimeCountDown(this.config.timeLeft,new Date().getTime());
        }
      },err=>{throw err;}
    );
  }

  submitQuestion(){
    var total=this.config.totalItems;
    var data="";
    var count=0;
    for(var i=1;i<=total;i++){
        if(data!=""){
            data=data+",";
        }
        var optName='q'+i;
        var radioValues = document.getElementsByName(optName);
        var radioValue = this.getRadioVal(radioValues);
        data=data+optName+":"+radioValue;
        if(radioValue!=undefined){
            count++;
        }
    }

    var formData={"name":this.personName,"mobile":this.personMobile,"answers" : data};
    var result = this.examService.postExam(formData,this.examinerId,this.config.examId).subscribe(res=>{
      if(res){
        console.log(res);
        this.submitModal.show();
      }
    },err=>{
      this.messageforpopupinfo = 'Error! Please contact with Administrator';
      this.messgeModal.show();
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

  startTimeCountDown(timeLeft,startTime){
    var x = setInterval(function() {
      var now = new Date().getTime();
      var distance = now-startTime;
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      var rm=timeLeft-minutes-1;
      this.timeleft=rm+ 'm & '+ (60-seconds) +'s';
      if(null!=document.getElementById("dvTime")){
        document.getElementById("dvTime").innerHTML=this.timeleft;
        if (rm<0) {
          clearInterval(x);
          document.getElementById("dvTime").innerHTML="expired!!";
          var offsetHeight = document.getElementById('dvExamQ').offsetHeight;
          offsetHeight = offsetHeight + 100;
          document.getElementById('dvOverlay').style.height=offsetHeight + 'px';
          let el = document.querySelector("#dvOverlay");
          el.classList.remove('hide');
          el.classList.add('show');
        }
      }else{
        clearInterval(x);
      }
    },1000);
  }

  getOption(){
    this.router.navigate(['/ng/oldexam/'+this.examinerId+"/"+this.examId]);
  }
}
