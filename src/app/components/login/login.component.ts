import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {AlertService} from "../../services/alert.service";
import {AppGlobals} from "../../services/app-globals.service";

@Component({
  selector: 'login-form',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  model: any = {};
  loading = false;
  returnUrl: string;
  isLoggedIn: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private appGlobals: AppGlobals) {
    //this.appGlobals.isUserLoggedIn.subscribe(value => this.isLoggedIn = value);
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          this.appGlobals.setLoginStatus(true);
          this.appGlobals.setIsCurrentUser(data);
          this.appGlobals.setIsAdminUser(data.roleId);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }



}
