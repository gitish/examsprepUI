import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageHeaderComponent } from './core/page-header/page-header.component';
import { PageFooterComponent } from './core/page-footer/page-footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { IndexComponent } from './components/index/index.component';
import { MatMenuModule, MatCardModule, MatButtonModule, MatIconModule,
        MatCheckboxModule, MatRippleModule, MatInputModule, MatFormFieldModule,
        MatToolbarModule, MatSidenavModule, MatListModule ,
        MatStepperModule,
        MatRadioModule,
        MatSelectModule,
        MatSnackBarModule, MatTabsModule} from '@angular/material';

import { ExamsComponent } from './components/exams/exams.component';
import { AdminComponent } from './components/admin/admin.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ExaminerComponent } from './components/examiner/examiner.component';
import { OldexamComponent } from './components/oldexam/oldexam.component';
import { NewexamComponent } from './components/newexam/newexam.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProfileComponent } from './components/sm/profile/profile.component';
import { TimetableComponent } from './components/sm/timetable/timetable.component';
import { ExamComponent } from './components/sm/exam/exam.component';
import { ListComponent } from './components/sm/list/list.component';
import { ResultComponent } from './components/sm/result/result.component';
import { ExamviewComponent } from './components/sm/examview/examview.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { KatexModule } from 'ng-katex';
import { MathModule } from './math/math.module';
import { MathServiceImpl } from './math/math.service';
import { ShowComponent } from './components/show/show.component';
import { EditorComponent } from './components/editor/editor.component';
import { ExampreviewComponent } from './components/sm/exampreview/exampreview.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { GlobalData } from './global';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AdmloginComponent } from './components/admlogin/admlogin.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    PageFooterComponent,
    HomeComponent,
    IndexComponent,
    ExamsComponent,
    AdminComponent,
    AboutComponent,
    ContactComponent,
    ExaminerComponent,
    OldexamComponent,
    NewexamComponent,
    ProfileComponent,
    TimetableComponent,
    ExamComponent,
    ListComponent,
    ResultComponent,
    ExamviewComponent,
    ShowComponent,
    EditorComponent,
    ExampreviewComponent,
    FeedbackComponent,
    AdmloginComponent
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatMenuModule,
    MatListModule,
    MatSelectModule,
    MatRadioModule,
    MatSnackBarModule,
    MatTabsModule
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatToolbarModule, MatSidenavModule, MatListModule ,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTabsModule,
    KatexModule,
    CKEditorModule,
    MathModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    ModalModule.forRoot()
    // NgxPaginationModule
  ],
  providers: [MathServiceImpl,GlobalData],
  bootstrap: [AppComponent]
})
export class AppModule { }
