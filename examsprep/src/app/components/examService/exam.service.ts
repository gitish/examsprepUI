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
    return this.getApiResponse(`v1/examiner/profile`,"examinerProfiles");
  }

  getExaminer(examinerId): Observable<any[]> {
    return this.getApiResponse(`v1/examiner/${examinerId}`,"examiner");
  }

  getExamList(examinerId): Observable<any[]> {
    return this.getApiResponse(`v1/question/list/${examinerId}`,"queList");
  }

  getAllExamDetails(examinerId): Observable<any[]> {
    return this.getApiResponse(`v1/exam/${examinerId}`,"queList");
  }

  getPaperList(examinerId): Observable<any[]> {
    return this.getApiResponse(`v1/admin/${examinerId}/paperlist`,"paperlist");
  }
  getExamInProgress(examinerId): Observable<any[]> {
    return this.getApiResponse(`v1/question/examInProgress/${examinerId}`,"questions");
  }

  getExamFinished(examinerId,examId): Observable<any[]> {
    return this.getApiResponse(`v1/question/oldExam/${examinerId}/${examId}`,"questions");
  }

  setExam(examinerId,paperId,examId){
    console.log(examinerId+","+paperId+","+examId);
    return this.getApiResponse(`v1/admin/setExam/${examinerId}/${paperId}/${examId}`,"questions");
  }

  getPaperDetails(examinerId,paperId){
    return this.getApiResponse(`v1/exam/paper/${examinerId}/${paperId}`,"questions");
  }

  deleteExam(examinerId,examId){
    return this.getApiResponse(`v1/exam/delete/${examinerId}/${examId}`,"questions");
  }

  getApiResponse(url,mockFile){
    return this.httpService.getApi(url,mockFile)
    .pipe(
      tap(res => {
        if (res) {
          return res;
        }
      })
    );
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

  postValidateUser(data){
    return this.postApiResponse(`v1/admin/login`,data,"subq-req-resp");
  }

  postPaper(data,examinerId){
    console.log("examinerId:"+examinerId);
    return this.postApiResponse(`v1/admin/v1/previeworsave/${examinerId}`,data,"subq-req-resp");
  }

  postExam(data,examinerId,examId){
    console.log("questionId:"+examId);
    return this.postApiResponse(`v1/question/submitResult/${examinerId}/${examId}`,data,"subq-req-resp");
  }

  authenticateUser(examinerId,loginData) {
    console.log("loginData:"+JSON.stringify(loginData));
    return this.postApiResponse(`v1/exam/user/login/${examinerId}`,loginData,"userError");
  }
  createUser(examinerId,loginData) {
    console.log("loginData:"+JSON.stringify(loginData));
    return this.postApiResponse(`v1/exam/user/create/${examinerId}`,loginData,"userError");
  }

  submitMessage(data){
    return this.postApiResponse(`common/message`,data,"subq-req-resp");
  }

}
