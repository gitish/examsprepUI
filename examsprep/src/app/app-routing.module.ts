import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { ExamsComponent } from './components/exams/exams.component';
import { AboutComponent } from './components/about/about.component';
import { AdminpaperComponent } from './components/adminpaper/adminpaper.component';
import { AdmloginComponent } from './components/admlogin/admlogin.component';
import { AdminhomeComponent } from './components/adminhome/adminhome.component';
import { AdminmanageuserComponent } from './components/adminmanageuser/adminmanageuser.component';
import { AdminsetexamComponent } from './components/adminsetexam/adminsetexam.component';
import { AdminresultComponent } from './components/adminresult/adminresult.component';

import { ContactComponent } from './components/contact/contact.component';
import { ExaminerComponent } from './components/examiner/examiner.component';
import { OldexamComponent } from './components/oldexam/oldexam.component';
import { NewexamComponent } from './components/newexam/newexam.component';
import { ShowComponent } from './components/show/show.component';
import { EditorComponent } from './components/editor/editor.component';
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
 { path: 'ng/newexam/:examinerId', component:  NewexamComponent},
 
// admin page
 { path: 'ng/admin/user', component: AdminmanageuserComponent},
 { path: 'ng/admin/paper', component: AdminpaperComponent},
 { path: 'ng/admin', component: AdmloginComponent},
 { path: 'ng/admin/home', component: AdminhomeComponent},
 { path: 'ng/admin/exam', component: AdminsetexamComponent},
 { path: 'ng/admin/result', component: AdminresultComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }