import { Component, OnInit, ViewChild} from '@angular/core';
import { SchoolService } from '../smService/sm.service';
import { Subscription } from 'rxjs';
import { Router, Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  subscription: Subscription;
  schoolDetails : any;
  schoolId: '0';
  @ViewChild('submitStudentModal') submitModal: ModalDirective;
  @ViewChild('profileMsgModel') profileMsgModel: ModalDirective;
  responsestudentauth:any;
  studentclazz = '';
  studentrollno = '';
  studentPassword = '';
  lstClass:any[]=[{}];
  urlToRedirect='';
  formData = {
    name:"",
    class:"",
    gender:"",
  }
  constructor(private router: Router,
              private activatedRoute : ActivatedRoute,
              private schoolService: SchoolService) {
                this.activatedRoute.params.subscribe(params => {
                  if (params.schId) {
                    this.schoolId = params.schId;
                  }
                });
              }

  ngOnInit(): void {
    this.schoolProfiles();
  }

  schoolProfiles(){
    this.activatedRoute.params.pipe(switchMap((p:Params)=> this.schoolService.getSchoolProfile(p['schId']))).subscribe(
      message => {
        this.schoolDetails = message;
        var classes = "I,II,III,IV,V,VI,VII,VIII,IX,X";
        Array.from(classes.split(','),child => {
          var id=child.replace(/\s/g, "-").toLowerCase();
          this.lstClass.push({"id":id,"name":child});
        })
      }
    );
  }

  getResult() {
    this.urlToRedirect='/ng/sm/' + this.schoolId+'/result';
    if(this.isValidUser()){
      this.router.navigate([this.urlToRedirect]);
    }else{
      this.submitModal.show();
    }
  }

  getExamTable() {
    this.urlToRedirect='/ng/sm/' + this.schoolId+'/timetable';
    if(this.isValidUser()){
      this.router.navigate([this.urlToRedirect]);
    }else{
      this.submitModal.show();
    }
  }

  isValidUser(){
    const token = localStorage.getItem("token");
    return token!=null && token!="null" && token.indexOf(this.schoolId)!=-1;
  }
  studentSubmit() {
     var studentdata= {
       "clazz": this.studentclazz,
       "rollNo":this.studentrollno,
       "pass":this.studentPassword
     }
     this.schoolService.postSchoolTimeTableUser(studentdata,this.schoolId).subscribe( message=>{
        this.responsestudentauth = message;
        if(this.responsestudentauth["token"]!=null) {
          localStorage.setItem("token",this.responsestudentauth["token"]);
          this.router.navigate([this.urlToRedirect]);
        } else {
          this.submitModal.hide();
          this.profileMsgModel.show();
        }
     });
  }

  invalidAndRedirect(){
    localStorage.setItem("token",null);
    this.profileMsgModel.hide();
    this.router.navigate(['/ng/sm/' + this.schoolId]);
  }

}
