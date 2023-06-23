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

  getExamList(flag:boolean=true): Observable<any[]> {
    return this.getApiResponse(`web/exams/schedule?ex=${flag}`,"examList");
  }

  deleteExam(examId){
    return this.getApiResponse(`web/exam/delete/${examId}`,"examList");
  }

  getAllExamDetails(): Observable<any[]> {
    return this.getApiResponse(`web/exams/schedule`,"examList");
  }

  //this service is for admin
  getPaperList(): Observable<any[]> {
    return this.getApiResponse(`web/paper/list`,"paperList");
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

  getLastExam(){
    return this.getApiResponse(`web/exam/last`,"lastexam");
  }
  getExaResult(examId){
    return this.getApiResponse(`web/exam/result/${examId}`,"examResult");
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
    return this.postApiResponse(`web/exam`,data,"examList");
  }

  postValidateUserAdmin(data){
    return this.postApiResponse(`web/admin/login`,data,"loginResp");
  }

  postPaper(data){
    return this.postApiResponse(`web/paper`,data,"paperResp");
  }

  // remove this
  postExamResult(data,examId){
    return this.postApiResponse(`web/exams/saveAnswer?examId=${examId}`,data,"examAns");
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
    return this.postApiResponse(`web/user/message`,data,"message");
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
