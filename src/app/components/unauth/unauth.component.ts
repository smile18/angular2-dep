import {Component} from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: 'unauth.component.html',
})
export class UnAuthorizedComponent{

  messageDetails = {severity: 'error-alert', summary: 'Sorry, You are not Authorized to view this page ...!', detail: ''};
}
