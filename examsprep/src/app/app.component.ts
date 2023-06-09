import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'examsprep';
  showHeader: boolean = false;
  showFooter: boolean = false;
  header:true;
  footer:true;
  headlessURL = ["/ng/editor","/ng/sm/exampreview","/ng/admin"];
  ngOnInit() {

  }

  constructor(private router: Router) {

    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (this.isheadless(event['url'])) {
          console.log("Header and Footer false");
          this.showHeader = false;
          this.showFooter = false;
        } else {
          console.log("Header and Footer true");
          this.showHeader = true;
          this.showFooter = true;
        }
      }
    });
  }
  isheadless(url) {
      var result:boolean=false;
      this.headlessURL.forEach(s=> {
        if (url.indexOf(s) >= 0){
          result=true;
        }
      });
      return result;
  }
}
