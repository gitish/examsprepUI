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
  userId = '';
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
    
  }
  onSubmit() {
    if(this.globalData.loginDetail) {
      this.personName= this.globalData.loginDetail?.name;
      this.personMobile= this.globalData.loginDetail?.phone;
      this.userId=this.globalData.loginDetail?.id
      this.submitQuestion();
    } else {
      this.messageforpopupinfo = 'Seems You are logged out. Login again to submit your answers';
      this.messgeModal.show();
    }
  }

  getQuestionsList(){
    this.examService.getExamList().subscribe(
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
    this.examService.getExamInProgress().subscribe(
      message => {
        if(message["status"]== "Failure"){
          this.isAvail=false;
          this.getQuestionsList();
        }else{
          this.results = message["questions"];
          this.isAvail=true;
          this.config = {
            totalItems: message["questions"].length,
            timeLeft: message["timeDetails"]?.leftTime,
            examId: message["id"]
          };
          this.startTimeCountDown(this.config.timeLeft,new Date().getTime());
        }
      },err=>{
        this.getQuestionsList();
        throw err;
      }
    );
  }

  submitQuestion(){
    var total=this.config.totalItems;
    var data="";
    var count=0;
    for(var i=1;i<=total;i++){
        if(data!=""){
            data=data+";";
        }
        var optName='q'+i;
        var options = document.getElementsByName(optName);
        var radioValue = this.getRadioVal(options);
        data=data+i+":"+radioValue;
        if(radioValue!=undefined){
            count++;
        }
    }
    console.log("ans: " + data);
    var formData={"userId":this.userId,"ans" : data};
    console.log(formData);
    var result = this.examService.postExamResult(formData,this.config.examId).subscribe(res=>{
      if(res){
        this.submitModal.show();
      }
    },err=>{
      this.messageforpopupinfo = 'Error! Please contact with Administrator';
      this.messgeModal.show();
      throw err;
    })
  }

  getRadioVal(radios){
    var result="";
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        if(result==""){
          result=radios[i].value
        }else{
          result=result+","+radios[i].value
        }
      }
    }
    return result;
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

 
  submitFeedback(){
    this.submitModal.hide()
    console.log("/ng/feedback/"+this.personMobile+"/"+this.personName)
    this.router.navigate(['/ng/feedback/'+this.personMobile+"/"+this.personName]);
  }

  getOption(){
    this.router.navigate(['/ng/oldexam/'+this.examinerId+"/"+this.examId]);
  }
}
