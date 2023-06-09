import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpService } from '../../../services/http.service';
import { map, catchError, tap, mergeMap } from 'rxjs/operators';
import { ServiceBuilder } from 'selenium-webdriver/edge';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(
    private httpService: HttpService
  ) { }

  getSchoolList(): Observable<any[]> {
    return this.httpService.getApi(`sm/api/list`,"sm-list")
      .pipe(
        tap(res => {
          if (res) {
            return res;
          }

        })
      );
  }

  getSchoolProfile(schId): Observable<any[]> {
    return this.httpService.getApi(`sm/${schId}/profile`,"sm-profile")
      .pipe(
        tap(res => {
          if (res) {
            return res;
          }

        })
      );
  }

  getSchoolTimeTable(schId): Observable<any[]> {
    return this.httpService.getApi(`sm/api/${schId}/timetable`,"sm-timetable")
      .pipe(
        tap(res => {
          if (res) {
            return res;
          }

        })
      );
  }

  getExamView(schId,examId): Observable<any[]> {
    return this.httpService.getApi(`sm/api/${schId}/${examId}/examview`,"sm-exam")
      .pipe(
        tap(res => {
          if (res) {
            return res;
          }

        })
      );
  }
  getExamPreView(examinerId,examId): Observable<any[]> {
    return this.httpService.getApi(`sm/admin/paper/preview/${examinerId}/${examId}`,"sm-exam")
      .pipe(
        tap(res => {
          if (res) {
            return res;
          }

        })
      );
  }

  getExamContent(schId): Observable<any[]> {
    return this.httpService.getApi(`sm/api/${schId}/exam`,"sm-exam")
      .pipe(
        tap(res => {
          if (res) {
            return res;
          }

        })
      );
  }

  postExam(schId,data){
    return this.httpService.postApi(`sm/api/${schId}/exam`,data,null,"subq-req-resp")
      .pipe(
        tap(res=>{
          if(res){
            return res;
          }
        })
      );
  }

  postSchoolTimeTableUser(data,schId){
    return this.httpService.postApi(`sm/api/${schId}/stud-auth`,data,null,"sm-student")
      .pipe(
        tap(res=>{
          if(res){
            return res;
          }
        })
      )
  }

  getExamResult(schId): Observable<any[]> {
    return this.httpService.getApi(`sm/api/${schId}/result`,"sm-result")
      .pipe(
        tap(res => {
          if (res) {
            return res;
          }

        })
      );
  }


}
