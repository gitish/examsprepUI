import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpService } from '../../services/http.service';
import { map, catchError, tap, mergeMap } from 'rxjs/operators';
import { ServiceBuilder } from 'selenium-webdriver/edge';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(
    private httpService: HttpService
  ) { }

  getExaminerProfile(): Observable<any[]> {
    return this.getApiResponse(`web/examiners`,"examinerProfiles");
  }

  getExaminer(examinerId): Observable<any[]> {
    return this.getApiResponse(`web/examiner?id=${examinerId}`,"examiner");
  }

  getExamList(): Observable<any[]> {
    return this.getApiResponse(`web/exams/schedule`,"queList");
  }

  getAllExamDetails(): Observable<any[]> {
    return this.getApiResponse(`web/exams/schedule`,"queList");
  }

  //this service is for admin
  getPaperList(): Observable<any[]> {
    return this.getApiResponse(`/web/paper/list`,"paperlist");
  }
  getExamInProgress(): Observable<any[]> {
    return this.getApiResponse(`web/exams/current`,"questions_err");
  }

  getExamFinished(examId): Observable<any[]> {
    return this.getApiResponse(`web/exams/schedule/${examId}`,"questions");
  }

  getPaperDetails(paperId){
    return this.getApiResponse(`web/paper?id=${paperId}`,"questions");
  }

  getUserDetails(){
    return this.getApiResponse(`web/students`,"users");
  }

  deleteExam(examId){
    return this.getApiResponse(`web/exam/delete/${examId}`,"questions");
  }

  getApiResponse(url,mockFile){
    //this.httpService.httpOptions 
    return this.httpService.getApi(url,mockFile)
    .pipe(
      tap(res => {
        if (res) {
          return res;
        }
      })
    );
  }

  setExam(data){
    return this.postApiResponse(`web/exam`,data,"questions");
  }

  postValidateUserAdmin(data){
    return this.postApiResponse(`web/admin/login`,data,"subq-req-resp");
  }

  postPaper(data){
    return this.postApiResponse(`/web/paper`,data,"paperResp");
  }

  // remove this
  postExamResult(data,examId){
    return this.postApiResponse(`web/exams/saveAnswer?examId=${examId}`,data,"subq-req-resp");
  }

  authenticateUser(examinerId,loginData) {
    return this.postApiResponse(`web/user/login`,loginData,"user");
  }
  
  createUser(examinerId,loginData) {
    return this.postApiResponse(`web/user/register`,loginData,"user");
  }

  manageUser(userOperation) {
    return this.postApiResponse(`web/user/manage`,userOperation,"useractive");
  }

  submitMessage(data){
    return this.postApiResponse(`web/user/message`,data,"subq-req-resp");
  }

  postApiResponse(url,data,mockFile){
    return this.httpService.postApi(url,data,null,mockFile)
      .pipe(
        tap(res=>{
          if(res){
            return res;
          }
        })
      )
  }

}
