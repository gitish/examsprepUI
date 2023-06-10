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

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  qnAs=[];
  paperData:any;
  paperDetails:any;
  paperId='';
  question='';
  opt1='';
  opt2='';
  opt3='';
  opt4='';
  opt5='';
  ans='';
  remarks='';
  qna='';
  count=0;
  result='';
  duration='';
  lstExams=[];
  examinerId = '';
  isPreviewOnly=false;
  @ViewChild('previewModel') previewModel: ModalDirective;
  @ViewChild('editModel') editModel: ModalDirective;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
    view: CalendarView = CalendarView.Month;

    CalendarView = CalendarView;

    viewDate: Date = new Date();

    modalData: {
      action: string;
      event: CalendarEvent;
    };

    actions: CalendarEventAction[] = [
      {
        label: '<i class="fas fa-fw fa-pencil-alt"></i>',
        a11yLabel: 'Edit',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.handleEvent('Edited', event);
        },
      }
    ];

    refresh: Subject<any> = new Subject();

    events: CalendarEvent = {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    };

    activeDayIsOpen: boolean = true;

    constructor(private modal: NgbModal,
                private examService: ExamService,
                private router: Router,
                private activatedRoute : ActivatedRoute,
                private globalData:GlobalData) {}

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
      if (isSameMonth(date, this.viewDate)) {
        if (
          (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
          events.length === 0
        ) {
          this.activeDayIsOpen = false;
        } else {
          this.activeDayIsOpen = true;
        }
        this.viewDate = date;
      }
    }

    handleEvent(action: string, event: CalendarEvent): void {
      this.modalData = { event, action };
      this.modal.open(this.modalContent, { size: 'lg' });
    }

    setView(view: CalendarView) {
      this.view = view;
    }

    closeOpenMonthViewDay() {
      this.activeDayIsOpen = false;
    }
  ngOnInit(): void {
    console.log("init call" + this.globalData.adminLoginDetail)
    if(this.globalData.adminLoginDetail==null){
      this.router.navigate(['/ng/admin']);
    } else{
      this.examinerId=this.globalData.adminLoginDetail.profileId;
      this.getPaperList();
      this.getExamList();
    }
  }
  add(){
    if(this.question.trim()==""){
      return;
    }
    this.count++;
    var qna={
      "qNo": this.count,
      "question": this.question,
      "options":[
        {"id":"a","value":this.opt1},
        {"id":"b","value":this.opt2},
        {"id":"c","value":this.opt3},
        {"id":"d","value":this.opt4},
        {"id":"e","value":this.opt5}
      ],
      "ans":this.ans,
      "remarks":this.remarks
    }
    this.qnAs.push(qna);
    this.question='';
    this.opt1='';
    this.opt2='';
    this.opt3='';
    this.opt4='';
    this.opt5='';
    this.remarks='';
    this.ans='';
    this.result=JSON.stringify(this.qnAs,undefined, 2)
    console.log(this.qnAs);
  }

  previewQuestions(){
    if(this.qnAs.length>0){
      this.previewModel.show();
    }
  }
  getPaperList(){
    var result = this.examService.getPaperList(this.examinerId).subscribe(res=>{
      if(res){
        this.paperData=res;
      }
    },err=>{
      console.log(err);
      throw err;
    })
  }

  getExamList(){
    var result = this.examService.getAllExamDetails(this.examinerId).subscribe(res=>{
      if(res){
        this.lstExams=res;
        console.log(this.lstExams);
      }
    },err=>{
      console.log(err);
      throw err;
    })
  }

  deleteExam(examId){
    console.log("delete exam : " + examId);
    var result = this.examService.deleteExam(this.examinerId,examId).subscribe(res=>{
      if(res){
        console.log(res);
        if(res.result=='Success'){
          var el = document.getElementById('div_'+examId)
          el.remove();
        }

      }
    },err=>{
      console.log(err);
      throw err;
    })
  }
  showPreviewModel(){
    this.qnAs=JSON.parse(this.result);
    console.log(this.qnAs);
    this.editModel.hide();
    this.isPreviewOnly=false;
    this.previewModel.show();
  }
  showEditModel(){
    this.previewModel.hide();
    this.editModel.show();
  }
  clear(){
    this.result='';
    this.qnAs=[];
  }
  Save(){
    var data = JSON.stringify({"qnAs":this.qnAs},undefined, 2)
    var obj = JSON.parse(data);
    var result = this.examService.postPaper(obj,this.examinerId).subscribe(res=>{
      if(res){
        console.log(res);
        this.result='';
        this.qnAs=[];
        var paperId=res.paperId;
        this.paperData.push({"id":paperId,"name":paperId});
        alert("Paper Saved with Id: " + paperId);
        this.previewModel.hide();
      }
    },err=>{
      console.log(err);
      throw err;
    })
  }

  preview(){
    var result = this.examService.getPaperDetails(this.examinerId,this.paperId).subscribe(res=>{
      if(res){
        this.paperDetails=res;
        console.log(this.paperDetails);
        this.isPreviewOnly=true;
        this.qnAs=this.paperDetails.qnAs;
        this.previewModel.show();
      }
    },err=>{
      console.log(err);
      throw err;
    })
    console.log("show preview")
  }
  cancelPreview(){
    this.isPreviewOnly=false;
    this.qnAs=[]
    this.previewModel.hide()
  }
  scheduleExam(){
    var data = JSON.stringify({"id":this.getScheduledExamTime(),"paperId":this.paperId,"duration":this.duration},undefined, 2)
    var obj = JSON.parse(data);
    var result = this.examService.setExam(obj).subscribe(res=>{
      if(res){
        this.lstExams.push(res);
        console.log(this.lstExams);
      }
    },err=>{
      console.log(err);
      throw err;
    })
  }

  getScheduledExamTime(){
    var d = this.events.end;
    var sMonth = this.padValue(d.getMonth() + 1);
    var sDay = this.padValue(d.getDate());
    var sYear = d.getFullYear();
    var sHour = d.getHours();
    var sMinute = this.padValue(d.getMinutes());
    var sAMPM = "AM";
    var iHourCheck = parseInt(sHour+'');

    if (iHourCheck > 12) {
        sAMPM = "PM";
        sHour = iHourCheck - 12;
    }else if (iHourCheck === 0) {
        sHour = 12;
    }
    sHour = this.padValue(sHour);

    var dformat =  [sYear,sMonth,sDay,sHour,sMinute,sAMPM].join('');
    return dformat;
  }

  padValue(value) {
      return (value < 10) ? "0" + value : value;
  }

}
