import { Component, OnInit,ViewChild } from '@angular/core';
import { ExamService} from '../examService/exam.service';
import { Subscription } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  name='';
  mob='';
  email='';
  msg='';
  results:any;
  subscription: Subscription;
  @ViewChild('submitModal') submitModal: ModalDirective;
  constructor(private examService: ExamService){}


  ngOnInit(): void {
  }


  submit(){
    var feedbackData= {
       "name": this.name,
       "email":this.email,
       "phone":this.mob,
       "msg":this.msg
    }
    this.subscription = this.examService.submitMessage(feedbackData).subscribe(message => {
      console.log(message);
      this.results=message;
      this.submitModal.show();
    },err=>{throw err;});
  }
}
