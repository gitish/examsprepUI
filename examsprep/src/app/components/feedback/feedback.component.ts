import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router , Params, ActivatedRoute } from '@angular/router';
import { ExamService} from '../examService/exam.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  subscription: Subscription;
  userId='0';
  userName='';
  msg='';
  constructor(private router: Router,
        private examService: ExamService,
        private activatedRoute : ActivatedRoute) {
        this.activatedRoute.params.subscribe(params => {
          if (params.userId) {
            this.userId = params.userId;
          }
          if (params.userName) {
            this.userName = params.userName;
          }
        });
  }

  ngOnInit(): void {
  }

  back(){
  }
  onSubmit() {
    var data="";
    for(var i=1;i<=2;i++){
      if(data!=""){
          data=data+",";
      }
      var optName='q'+i;
      var radioValues = document.getElementsByName(optName);
      var radioValue = this.getRadioVal(radioValues);
      data=data+optName+":"+radioValue;
    }
    data=data+",text:"+this.msg;
    var feedbackData= {
       "name": this.userName,
       "email":'',
       "phone":this.userId,
       "msg":data
    }
    this.subscription = this.examService.submitMessage(feedbackData).subscribe(message => {
      console.log("Thanks");
      this.router.navigate(['/ng/exams']);
    },err=>{throw err;});
  }

  getRadioVal(radios){
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        return radios[i].value;
        break;
      }
    }
  }
}
