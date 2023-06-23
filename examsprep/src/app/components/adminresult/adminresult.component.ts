import { Component, OnInit, ViewChild, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExamService} from '../examService/exam.service';
import { Router, Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { GlobalData } from '../../global';


@Component({
  selector: 'app-adminresult',
  templateUrl: './adminresult.component.html',
  styleUrls: ['./adminresult.component.css']
})
export class AdminresultComponent implements OnInit {
  examTime=""
  examDate=""
  duration=15
  paperId=1
  examId=""
  examlist=[]
  exam_result={
    "total":0,
    "score":[]
  }
  constructor(private modal: NgbModal,
    private examService: ExamService,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private globalData:GlobalData) { }

  ngOnInit(): void {
    if(this.globalData.adminLoginDetail==null){
      this.router.navigate(['/ng/admin']);
    } 
    this.getExamList()
  }

  getExamList(){
    this.examService.getExamList().subscribe(
      message => {
        if(message["status"]== "Failure"){
        }else{
          this.examlist = message;
          this.examId=message[0]["id"]
          this.getExaResult()
        }
      },err=>{throw err;}
    );
  }

  getExaResult(){
    this.examService.getExaResult(this.examId).subscribe(res=>{
      if(res){
        this.exam_result=res
        this.exam_result.score = this.exam_result.score.sort((a, b) => (a.marks > b.marks) ? -1 : 1);
      }
    },err=>{
      console.log(err);
      throw err;
    })
  }
}
