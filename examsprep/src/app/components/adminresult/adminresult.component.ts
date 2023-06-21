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
    this.getLastExam()
  }

  getLastExam(){
    this.examService.getLastExam().subscribe(res=>{
      if(res){
        this.examId=res["examId"]
        this.getExaResult()
      }
    },err=>{
      console.log(err);
      throw err;
    })
  }

  getExaResult(){
    this.examService.getExaResult().subscribe(res=>{
      if(res){
        this.exam_result=res
        this.exam_result.score = this.exam_result.score.sort((a, b) => (a.marks > b.marks) ? -1 : 1);
      }
    },err=>{
      console.log(err);
      throw err;
    })
  }
  setExam(){
    console.log("" + this.examDate + this.examTime + this.duration)
  }
  deleteExam(e){
    console.log("Delete Exam: " + e)
  }
}
