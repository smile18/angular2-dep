import {Component, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "./models/user.model";
import {DOCUMENT} from "@angular/platform-browser";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'app works!';
  url: string = "";
  isLoggedIn: boolean;
  userRole: string;
  currentUser: User;
  constructor(private router:Router, @Inject(DOCUMENT) private document: any){

    // Get the deep-console host to generate the deep-rules url as both are deployed in same space
    let myUrl = this.document.location.hostname;
    if(!(myUrl=="localhost"))
      environment.rulesUrl = "http://deep-rules"+ myUrl.substring(myUrl.indexOf('console')+7,myUrl.length );
    router.events.subscribe(
      (url:any) => {
        if(sessionStorage.getItem("currentUser"))
        this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        this.userRole = sessionStorage.getItem("userRole");
        this.url = url.url;
        if (this.url.indexOf("/login") == 0) {
          this.isLoggedIn = false;
          sessionStorage.clear();
          this.currentUser=null;
        }
        else {
          this.isLoggedIn = true;
        }
      }
    );


  }

}
