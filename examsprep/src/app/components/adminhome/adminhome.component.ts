import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ExamService} from '../examService/exam.service';
import{ GlobalData } from '../../global';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute : ActivatedRoute,
    private examService: ExamService,
    private globalData:GlobalData) { }

  ngOnInit(): void {
    if(this.globalData.adminLoginDetail==null){
      this.router.navigate(['/ng/admin']);
    } 
  }

  routerLink(url): void {
    this.router.navigate([url]);
  }
}
