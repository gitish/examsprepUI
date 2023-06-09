import { Component, OnInit, ViewChild } from '@angular/core';
import { SchoolService } from '../smService/sm.service';
import { Subscription } from 'rxjs';
import { Router, Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
  subscription: Subscription;
  timeTableDetails: any;
  schoolId: any;
  @ViewChild('submitModal') submitModal: ModalDirective;
  studentclazz = '';
  studentrollno = '';
  studentPassword = '';
  classesselected='';
  subjectselected ='';
  modelMsg='';
  responsestudentauth:any;
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
    this.getTimeTable();
  }

  getTimeTable(){
    this.activatedRoute.params.pipe(switchMap((p:Params)=> this.schoolService.getSchoolTimeTable(p['schId']))).subscribe(
      message=>{
        this.timeTableDetails = message
        if(this.timeTableDetails["errorCode"]==10001){
          this.modelMsg="Invalid Credential OR Invalidated by Admin!!";
          this.submitModal.show();
        }
        if(this.timeTableDetails["errorCode"]==10002){
          this.modelMsg="Exam is not Set!! Please contact Admin.";
          this.submitModal.show();
        }
      }
    );
  }

  invalidAndRedirect(){
    localStorage.setItem("token",null);
    this.submitModal.hide();
    this.router.navigate(['/ng/sm/' + this.schoolId]);
  }

  showExam(clazz, subj,action) {
    if(action=="view"){
      localStorage.setItem("viewSub",subj);
      console.log("show view");
      this.router.navigate(['/ng/sm/' + this.schoolId+'/examview']);
    }else{
      this.router.navigate(['/ng/sm/' + this.schoolId+'/exam']);
    }
  }

}
