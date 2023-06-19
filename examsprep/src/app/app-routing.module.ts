import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { ExamsComponent } from './components/exams/exams.component';
import { AboutComponent } from './components/about/about.component';
import { AdminpaperComponent } from './components/adminpaper/adminpaper.component';
import { AdmloginComponent } from './components/admlogin/admlogin.component';
import { AdminhomeComponent } from './components/adminhome/adminhome.component';
import { AdminmanageuserComponent } from './components/adminmanageuser/adminmanageuser.component';

import { ContactComponent } from './components/contact/contact.component';
import { ExaminerComponent } from './components/examiner/examiner.component';
import { OldexamComponent } from './components/oldexam/oldexam.component';
import { NewexamComponent } from './components/newexam/newexam.component';
import { ProfileComponent } from './components/sm/profile/profile.component';
import { TimetableComponent } from './components/sm/timetable/timetable.component';
import { ExamComponent } from './components/sm/exam/exam.component';
import { ListComponent } from './components/sm/list/list.component';
import { ResultComponent } from './components/sm/result/result.component';
import { ExamviewComponent } from './components/sm/examview/examview.component';
import { ShowComponent } from './components/show/show.component';
import { EditorComponent } from './components/editor/editor.component';
import { ExampreviewComponent } from './components/sm/exampreview/exampreview.component';
import { FeedbackComponent } from './components/feedback/feedback.component';


const routes: Routes = [
 { path:'show', component: ShowComponent},
 { path:'ng/editor', component: EditorComponent},
 { path: '', redirectTo: 'ng/Index', pathMatch: 'full'},
 { path: 'ng/Index', component: IndexComponent },
 { path: 'ng/exams', component: ExamsComponent },
 { path: 'ng/feedback/:userId/:userName', component: FeedbackComponent },
 { path: 'ng/about', component: AboutComponent },
 { path: 'ng/contact', component: ContactComponent},
 { path: 'ng/examiner/:profileId', component: ExaminerComponent },
 { path: 'ng/oldexam', component:  OldexamComponent},
 { path: 'ng/oldexam/:examinerId/:examId', component: OldexamComponent },
 // school
 { path: 'ng/newexam/:examinerId', component:  NewexamComponent},
 { path: 'ng/sc/home', component:  ListComponent},
 { path: 'ng/sm/:schId', component:  ProfileComponent},
 { path: 'ng/sm/:schId/timetable', component:  TimetableComponent},
 { path: 'ng/sm/:schId/exam', component:  ExamComponent},
 { path: 'ng/sm/:schId/examview', component:  ExamviewComponent},
 { path: 'ng/sm/:schId/result', component:  ResultComponent},
 { path: 'ng/sm/exampreview/:examinerId/:examId',component:ExampreviewComponent},
// admin page
 { path: 'ng/admin/user', component: AdminmanageuserComponent},
 { path: 'ng/admin/paper', component: AdminpaperComponent},
 { path: 'ng/admin', component: AdmloginComponent},
 { path: 'ng/admin/home', component: AdminhomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
