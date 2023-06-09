import { Component, OnInit, ViewChild, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExamService} from '../examService/exam.service';
import { Router, Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { GlobalData } from '../../global';
@Component({
  selector: 'app-adminpaper',
  templateUrl: './adminpaper.component.html',
  styleUrls: ['./adminpaper.component.css']
})
export class AdminpaperComponent implements OnInit {
  qnAs=[];
  paperData:any;
  paperDetails:any;
  paperId='';
  rawquestion='';

  @ViewChild('previewModel') previewModel: ModalDirective;

  constructor(private modal: NgbModal,
    private examService: ExamService,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private globalData:GlobalData) { }

  ngOnInit(): void {
    console.log("init call" + this.globalData.adminLoginDetail)
    if(this.globalData.adminLoginDetail==null){
      this.router.navigate(['/ng/admin']);
    } 
  }

  parseData(){
    var qno=0;
    var question='';
    var options="";
    var ans="";
    var remark;
    
    this.rawquestion.split("\n").forEach(line => {
      line=line.trim();
      if(line!=""){
        if(line.toLowerCase().indexOf("que:")==0||line.toLowerCase().indexOf("q:")==0){
          if(qno>0){
            this.pushQnA(qno,question,options,ans,remark)
            question=""
            options=""
            ans=""
            remark=""
          }
          question = line.substring(line.indexOf(":")+1).trim();
          qno++;
        } else if(line.toLowerCase().indexOf("opt:")==0||line.toLowerCase().indexOf("o:")==0){
          options=line.substring(line.indexOf(":")+1).trim();
        } else if(line.toLowerCase().indexOf("ans:")==0||line.toLowerCase().indexOf("a:")==0){
          ans=line.substring(line.indexOf(":")+1).trim();
        } else if(line.toLowerCase().indexOf("rem:")==0||line.toLowerCase().indexOf("r:")==0){
          remark=line.substring(line.indexOf(":")+1).trim();
        } else{
          question=question+"\n"+line
        }
      }
    });
    if(question!=""){
      this.pushQnA(qno,question,options,ans,remark)
    }
    console.log(this.qnAs);
  }
  pushQnA(qno,que,options,ans,remark){
    var optionchar=["a","b","c","d","e"]
    var oindx=0;
    var qna={
      "qNo": 0,
      "question": "",
      "options":[],
      "ans":[],
      "remarks":""
    }

    qna.qNo=qno
    qna.question=que
    oindx=0
    options.split(",").forEach(o => {
      qna.options.push({"id":optionchar[oindx],"value":o})
      oindx++;
    });
    ans.split(",").forEach(a =>{
      qna.ans.push(a);
    })
    qna.remarks=remark
    console.log(qna);
    this.qnAs.push(qna);
  }

  previewQuestions(){
    this.qnAs=[];
    this.parseData()
    console.log("qna Length:" + this.qnAs.length)
    if(this.qnAs.length>0){
      this.previewModel.show();
    }
  }

  submit(){
    var data = JSON.stringify({"qnAs":this.qnAs},undefined, 2)
    var obj = JSON.parse(data);
    this.examService.postPaper(obj).subscribe(res=>{
      if(res){
        console.log(res);
        this.qnAs=[];
        var paperId=res["id"];
        alert("Paper Saved with Id: " + paperId);
        this.previewModel.hide();
      }
    },err=>{
      console.log(err);
      throw err;
    })
  }
  clear(){ 
    this.rawquestion=''
  }

  cancelPreview(){
    this.qnAs=[]
    this.previewModel.hide()
  }

}
