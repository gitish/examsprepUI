import { Component, OnInit, Input } from '@angular/core';
import { ExamService} from '../examService/exam.service';
import { Subscription } from 'rxjs';
import { Router, Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import{ GlobalData } from '../../global';

@Component({
  selector: 'app-admlogin',
  templateUrl: './admlogin.component.html',
  styleUrls: ['./admlogin.component.css']
})
export class AdmloginComponent implements OnInit {
  subscription: Subscription;
  profiles : any;
  examinerDetail : any;
  examinerId = '';
  password='';
  loginDetail:any;
  constructor(private router: Router,
                private activatedRoute : ActivatedRoute,
                private examService: ExamService,
                private globalData:GlobalData)  { }

  ngOnInit(): void {
    this.getExaminerProfiles();
  }

  getExaminerProfiles(){
    this.subscription = this.examService.getExaminerProfile().subscribe(message => {
      console.log(message);
      this.profiles=message;
    },err=>{throw err;});
  }

  validate(){
    if(this.globalData.adminLoginDetail!=null){
      this.router.navigate(['/ng/admin/home']);
    } else{
      var formData= {
        "profileId":this.examinerId,
        "pwd":this.password
      } 
      this.subscription = this.examService.postValidateUserAdmin(formData).subscribe(message => {
        console.log(message);
        if(message["token"]!=undefined){
          this.globalData.adminLoginDetail=message;
          localStorage.setItem("authorization",message["token"]);
          this.router.navigate(['/ng/admin/home']);
        }
      },err=>{throw err;});
    }
  }

}
