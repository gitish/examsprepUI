import { Component, OnInit,ViewChild } from '@angular/core';
import { SchoolService } from '../smService/sm.service';
import { Subscription } from 'rxjs';
import { Router, Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  subscription: Subscription;
  schoolId: any;
  result:any;
  modelMsg='';
  @ViewChild('submitModal') submitModal: ModalDirective;
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
    this.getResult();
  }

  getResult(){
    this.activatedRoute.params.pipe(switchMap((p:Params)=> this.schoolService.getExamResult(p['schId']))).subscribe(
      message=>{
        if(message["errorCode"]==10001){
          this.modelMsg="Invalid Credential OR Invalidated by Admin!!";
          this.submitModal.show();
        }
        this.result = message
      }
    );
  }

  invalidAndRedirect(){
    localStorage.setItem("token",null);
    this.submitModal.hide();
    this.router.navigate(['/ng/sm/' + this.schoolId]);
  }
}
