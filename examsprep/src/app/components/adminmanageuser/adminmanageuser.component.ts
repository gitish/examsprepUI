import { Component, OnInit, ViewChild, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExamService} from '../examService/exam.service';
import { Router, Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { GlobalData } from '../../global';

@Component({
  selector: 'app-adminmanageuser',
  templateUrl: './adminmanageuser.component.html',
  styleUrls: ['./adminmanageuser.component.css']
})
export class AdminmanageuserComponent implements OnInit {
  users=[];
  isAvail=true;
  constructor(private modal: NgbModal,
    private examService: ExamService,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private globalData:GlobalData) { }

  ngOnInit(): void {
    if(this.globalData.adminLoginDetail==null){
      this.router.navigate(['/ng/admin']);
    } 
    this.getUserDetails()
  }
  
  getUserDetails() {
    this.examService.getUserDetails().subscribe(
      message=>this.render(message),err=>{throw err;}
    );
  }

  deleteUser(userId){
    console.log("deleting user: " + userId)
    this.manageUser("delete",userId)
  }
  
  checkValue(obj: any,userId ){
    this.manageUser(obj.currentTarget.checked?"active":"inactive",userId)
  }

  manageUser(operation,userId){
    var operatinData={
      "operation":operation,
      "userId":userId
    }
    this.examService.manageUser(operatinData).subscribe(
      message=>this.render(message),err=>{throw err;}
    );
  }
  render(message){
    if(message["status"]== "Failure"){
      this.isAvail=false;
    }else{
      this.users = message;
      this.users = this.users.sort((a, b) => (a.status === 'active') ? 1 : -1);
    }
  }

}


