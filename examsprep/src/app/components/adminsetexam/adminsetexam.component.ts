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
  duration:""
  paperId:""
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
        this.paperId=res[0]["id"]
      }
    },err=>{
      console.log(err);
      throw err;
    })
  }
  getExamList(){
    this.examService.getExamList(false).subscribe(res=>{
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
        this.qnAs=res["qnAs"]
        this.previewModel.show();
      }
    },err=>{
      console.log(err);
      throw err;
    })
  }
  
  setExam(){
    var examId=this.examDate.split("/").join("")+this.examTime.replace(":","");
    console.log("ExamId:"+ examId)
    var data = {
      "id": examId, 
      "paperId":this.paperId,
      "duration":this.duration
    }
    
    console.log(data)
    this.examService.setExam(data).subscribe(res=>{
      if(res){
        this.examList=res
      }
    },err=>{
      console.log(err);
      throw err;
    })

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
