import {Component} from "@angular/core";

@Component({
  selector: 'side-menu',
  templateUrl: 'side-menu.component.html',
})
export class SideMenuComponent {

  isLoggedIn: boolean;
  userRole: string;
  user;
  constructor(){
    this.user = sessionStorage.getItem('currentUser');
    this.userRole = sessionStorage.getItem('userRole');
    if(this.user)
      this.isLoggedIn = this.user.isLoggedIn;
  }
}
