import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NewExamService } from 'src/app/services/newExam.service';
import { ExamService} from '../examService/exam.service';
import { Subscription } from 'rxjs';
import { Router, Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient  } from '@angular/common/http';
import { ModalDirective } from 'ngx-bootstrap/modal';
import{ GlobalData } from '../../global';

@Component({
  selector: 'app-examiner',
  templateUrl: './examiner.component.html',
  styleUrls: ['./examiner.component.css']
})
export class ExaminerComponent implements OnInit {
  subscription: Subscription;
  result : any;
  examinerDetail : any;
  data:any;
  isAvail: boolean;
  examId = '0';
  examinerId = '0';
  deviceInfo = null;
  ipAddress = '';
  personName='';
  personMobile='';
  personPassword='';
  createUserMsg='';
  loginUserMsg='';
  redirectUrl='';
  msgType="btn-danger"

  @ViewChild('loginModal') loginModal: ModalDirective;
  @ViewChild('newUserModal') newUserModal: ModalDirective;
  constructor(private dataservice: NewExamService,private router: Router,
              private activatedRoute : ActivatedRoute,
              private examService: ExamService,
              private deviceService: DeviceDetectorService,
              private cookeService: CookieService,
              private http:HttpClient,
              private globalData:GlobalData) {
              this.getIPAddress();
              this.epicFunction();
    this.activatedRoute.params.subscribe(params => {
      //do something
    });
  }
  epicFunction() {
    console.log('getting device info');
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
    this.cookeService.set("test", "test application1");
  }
  ngOnInit(){
    this.getExaminerDetails();
    console.log(this.cookeService.get("test"));
  }

  getIPAddress(){
    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress = res.ip;
    });
  }

  getExaminerDetails(){

    this.activatedRoute.params.pipe(switchMap((p:Params)=> this.examService.getExaminer(p['profileId']))).subscribe(
      message=>{
        this.examinerDetail = {
          profileId:message["profileId"],
          image:message["image"],
          quote:message["quote"],
          signature : message["signatue"],
          socials:message["socials"],
          examtime:message["examtime"],
          liveClass:message["liveClass"],
          isValidLivelink:message["liveClass"]!=''?true:false
        },
        this.getQuestionsList(this.examinerDetail.profileId);
      }
      
    );
  }

  getQuestionsList(profileId){
    this.subscription = this.examService.getExamList(profileId).subscribe(
      message => {
        if(message["status"]== "Failure"){
          this.isAvail=false;
        }else{
          this.data = message;
        }
      },err=>{throw err;}
    );
  }

  getCurrentExam() {
      this.validateUserAndRedirect('/ng/newexam/'+this.examinerDetail.profileId);
  }

  getOldExam() {
      this.validateUserAndRedirect('/ng/oldexam/'+this.examinerDetail.profileId+"/"+this.examId);
  }

  validateUserAndRedirect(redirectUrl){
      if(this.globalData.loginDetail!=null){
        this.router.navigate([redirectUrl]);
      } else{
        this.redirectUrl=redirectUrl;
        this.showLoginPage();
      }
    }

    login(){
      if(this.personMobile=='' || this.personPassword==''){
        this.loginUserMsg="Invalid input";
        return;
      }

      var loginDeta={
        "mobile":this.personMobile,
        "pass":this.personPassword,
        "ip" : this.ipAddress,
        "deviceType": this.deviceInfo.deviceType
      };
      this.subscription = this.examService.authenticateUser(this.examinerDetail.profileId,loginDeta).subscribe(
        message => {
          this.msgType="btn-danger";
          if(message["status"]== "active"){
            this.globalData.loginDetail=message;
            this.loginModal.hide();
            this.router.navigate([this.redirectUrl]);
          }else{
            this.loginUserMsg=message["error"].errorMsg;
          }
        },err=>{throw err;}
      );

    }
    createNewUser(){
      if(this.personMobile=='' || this.personPassword=='' || this.personPassword==''||this.personName==''){
        this.createUserMsg="Invalid input";
        return;
      }
      var loginDeta={
        "mobile":this.personMobile,
        "name":this.personName,
        "pass":this.personPassword,
        "ip" : this.ipAddress,
        "deviceType": this.deviceInfo.deviceType
      };
      this.subscription = this.examService.createUser(this.examinerDetail.profileId,loginDeta).subscribe(
        message => {
          this.msgType="btn-danger";
          if(message["status"]=="created" || message["status"]=="added"){
            this.msgType="btn-success";
            this.createUserMsg="User created. Check with admin to activate!!"
          }else{
            this.createUserMsg=message["error"].errorMsg;
          }
        },err=>{throw err;}
      );

    }
    showNewUserPage(){
      this.loginModal.hide();
      this.createUserMsg="";
      this.newUserModal.show();
    }
    showLoginPage() {
      this.loginUserMsg="";
      this.newUserModal.hide();
      this.loginModal.show();
    }

    keyPress(event: any) {
      const pattern = /[0-9\+\-\ ]/;

      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
}
