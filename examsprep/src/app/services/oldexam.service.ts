import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class OldexamService {

public httpOptions;
  constructor(private http: HttpClient) { }

  public Response(): Observable<any>
  {
    if (this.httpOptions !== null) {
      this.setHeaders();
    }
    //'http://examsprep.co.uk/question/202006110945AM-60'
    return this.http.get('http://localhost:3000/qnAs')
    .pipe(
      map(response => response),
      catchError(this.handleError<any>())
    );
  }
  private setHeaders(contentType?) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': contentType || 'application/json'
      })
    };
  }
  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.status === 401) {

      }
      throw error;
    };
  }
}
