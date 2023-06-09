import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  header:boolean;
  footer:boolean;
  constructor(){
    this.header=true;
    this.footer=true;
  }
  toggleHeader(){
    this.header=!this.header;
  }
  toggleFooter(){
    this.footer=!this.footer;
  }
  toggle(){
    this.toggleHeader();
    this.toggleFooter();
  }
  setHeader(x){
    x= this.header;
  }
  setFooter(x){
    x=this.footer;
  }
}
