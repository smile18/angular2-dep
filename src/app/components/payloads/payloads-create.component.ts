import {Component} from "@angular/core";
import {Validators, FormControl, FormGroup} from "@angular/forms";

import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: 'payloads-create.component.html',
})
export class CreatePayloadsComponent {

  currentUser;
  showMessage;
  messageDetails;
  userRole;

  payloadForm: FormGroup;
  uploadUrl;
  uploadedFiles: any[] = [];


  constructor() {

    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.userRole = this.currentUser.roleId;

    this.payloadForm = new FormGroup({
      activity: new FormControl('', [Validators.required ,Validators.minLength(3)])
    });

    this.payloadForm.valueChanges.subscribe( (form: any) => {
      let user = this.currentUser.firstName + ' ' + this.currentUser.lastName;
      this.uploadUrl = environment.rulesUrl+'/fileUpload/upload/'+ form.activity+'/'+user;
    });
  }



  onUpload(event) {
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.showMessage = true;
    this.messageDetails = {severity: 'success-alert', summary: 'Uploaded file Successfully ...!', detail: ''};
    this.setTime();
  }


  onError(event) {
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }
    let errorJson = event.xhr.response;
    let errorMessage = JSON.parse(errorJson);
    let details = errorMessage.errorMessage   + "  |   " + errorMessage.messageDetails;
    this.showMessage = true;
    this.messageDetails = {severity: 'warn-alert', summary: 'Unable to upload file....', detail: details};
  }

  setTime(){
    setTimeout(function() {
      this.showMessage = false;
      this.uploadedFiles= [];
    }.bind(this), 1500);
  }

}
