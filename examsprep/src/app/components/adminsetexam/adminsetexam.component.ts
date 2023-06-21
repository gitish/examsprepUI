import { Component, OnInit, ViewChild, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExamService} from '../examService/exam.service';
import { Router, Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { GlobalData } from '../../global';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-adminsetexam',
  templateUrl: './adminsetexam.component.html',
  styleUrls: ['./adminsetexam.component.css']
})
export class AdminsetexamComponent implements OnInit {
  examTime=""
  examDate=""
  duration=15
  paperId=1
  qnAs=[]
  examList=[]
  paperList=[]
   
  @ViewChild('previewModel') previewModel: ModalDirective;
  constructor(private modal: NgbModal,
    private examService: ExamService,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private globalData:GlobalData) { }

  ngOnInit(): void {
    if(this.globalData.adminLoginDetail==null){
      this.router.navigate(['/ng/admin']);
    } 
    this.getPaperList()
    this.getExamList()
  }
  getPaperList(){
    this.examService.getPaperList().subscribe(res=>{
      if(res){
        this.paperList=res
      }
    },err=>{
      console.log(err);
      throw err;
    })
  }
  getExamList(){
    this.examService.getExamList().subscribe(res=>{
      if(res){
        this.examList=res
      }
    },err=>{
      console.log(err);
      throw err;
    })
  }
  previewPaper(){
    this.qnAs=[];
    this.examService.getPaperDetails(this.paperId).subscribe(res=>{
      if(res){
        this.qnAs=res["questions"]
        this.previewModel.show();
      }
    },err=>{
      console.log(err);
      throw err;
    })
  }
  
  setExam(){
    console.log("" + this.examDate + this.examTime + this.duration)
    //TODO implement this

  }
  deleteExam(e){
    console.log("Delete Exam: " +e);
    this.examService.deleteExam(e).subscribe(res=>{
      if(res){
        this.examList=res
      }
    },err=>{
      console.log(err);
      throw err;
    })
  }
}
