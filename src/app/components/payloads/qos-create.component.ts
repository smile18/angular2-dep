import {Component} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {Message} from "primeng/components/common/api";
import {Payload} from "../../models/payload.model";
import {PayloadsService} from "../../services/payloads.service";



@Component({
  selector: 'app-root',
  templateUrl: 'qos-create.component.html'
})
export class CreateQosComponent {

  currentUser;
  userRole: string;
  showMessage;
  messageDetails;

  qosForm: FormGroup;
  payload: Payload;
  deliveryMode;
  confirmOnPublish;

  constructor(private payloadService: PayloadsService,  private router:Router) {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.userRole = this.currentUser.roleId;
    this.showMessage = false;

    this.qosForm = new FormGroup({
      eventName: new FormControl('', [Validators.required,Validators.minLength(3)]),
      deliveryMode: new FormControl('',[]),
      confirmOnPublish: new FormControl('',[]),
      confirmationWaitTime: new FormControl('',[])
    });

    this.qosForm.valueChanges.subscribe( (form: any) => {});

  }

  setTime(){
    setTimeout(function() {
      this.showMessage = false;
      this.router.navigate(['/viewQos']);
    }.bind(this), 1500);
  }

  cancel(){
    this.router.navigate(['/viewQos']);
  }

  createQos(value: any) {
    this.payload = value;
    if(this.payload.deliveryMode== null)
      this.payload.deliveryMode = 'false';
    if(this.payload.deliveryMode!='true' )
      this.payload.deliveryMode = 'NON_PERSISTENT';
    else
      this.payload.deliveryMode = 'PERSISTENT';

    if(this.payload.confirmOnPublish==null)
      this.payload.confirmOnPublish=false;

    this.payload.createdBy = this.currentUser.firstName + ' ' + this.currentUser.lastName;

    this.payloadService.createQos(this.payload).subscribe(
      result => {
        this.showMessage = true;
        this.messageDetails = {severity: 'warn-alert', summary: 'QoS got created successfully', detail: ''};
        this.setTime();
      },
      error => {
        this.showMessage = true;
        this.messageDetails = {severity: 'warn-alert', summary: 'Unable to get Create Qos', detail: error};
      }
    );
  }



}
