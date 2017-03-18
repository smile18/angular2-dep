import {Component} from "@angular/core";
import {SelectItem} from "primeng/components/common/api";
import {PayloadsService} from "../../services/payloads.service";


@Component({
  selector: 'app-root',
  templateUrl: 'payloads-view.component.html',
})
export class ViewPayloadsComponent {

  currentUser;
  userRole: string;
  showMessage;
  messageDetails;
  isError;

  eventNames;
  evs: SelectItem[];
  eventPayload;
  genericPayload;
  combinedPayload;
  confirmOnPublish: boolean[] = [true, false];
  deliveryMode: string[] = ["PERSISTENT","NON_PERSISTENT"];
  swaggerEditorUrl: string;
  selectedEventName = 'Event Name';



  constructor(private payloadService: PayloadsService) {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.userRole = this.currentUser.roleId;
    this.showMessage = false;
    this.isError = false;
    this.getUniqueEventNames();

    this.swaggerEditorUrl = 'http://editor.swagger.io/#/';

  }

  getUniqueEventNames(){
    this.payloadService.getUniqueEventNames().subscribe(
      eventNames => {
        this.evs = [];
        this.eventNames = eventNames;
        this.eventNames.forEach(sd => { this.evs.push({label: sd, value: sd})});
      },
      error => {
        this.isError = true;
        this.messageDetails = {severity: 'warn-alert', summary: 'Unable to get Event Names', detail: error};
      }
    );
  }


  onChangeEventName(eventName) {
    this.isError = false;
    this.selectedEventName = eventName;

    this.payloadService.getEventNGenericPayload(eventName).subscribe(
      payload => {
        this.eventPayload = payload[0];
        this.genericPayload = payload[1];

        if(this.eventPayload.payload != null)
          this.genericPayload.definitions.Payload =  JSON.parse(this.eventPayload.payload);
        else
          this.genericPayload.definitions.Payload = {};

        this.combinedPayload = JSON.stringify(this.genericPayload,null, 4).replace(/\\/g, "");

      },
      error => {
        this.isError = true;
        this.messageDetails = {severity: 'warn-alert', summary: 'Unable to get Payload', detail: error};
      });


  }

  onChangePayloadData(event){
    this.messageDetails = '';
    try{
      this.showMessage = false;
      JSON.parse(event.target.value);
      this.combinedPayload = event.target.value;
    }catch(e){
      this.showMessage = true;
      this.messageDetails = {severity: 'warn-alert', summary: 'Not a Valid JSON', detail: ''};
    }
  }

  updatePayload(data){
    let payLoad = this.eventPayload;
    payLoad.payload = data;
    payLoad.modifiedBy = this.currentUser.firstName+' '+this.currentUser.lastName;
    payLoad.modifiedDate = Date.now();
    this.payloadService.updatePayload(payLoad).subscribe(
      result => {
        this.isError = true;
        this.messageDetails = {severity: 'success-alert', summary: 'Updated Payload Successfully', detail: ''};
        setTimeout(function() {
          this.isError = false;
          this.messageDetails = '';
        }.bind(this), 1500);
      },
      error => {
        this.isError = true;
        this.messageDetails = {severity: 'warn-alert', summary: 'Unable to Update Payload', detail: error};
        setTimeout(function() {
          this.isError = false;
          this.messageDetails = '';
        }.bind(this), 2500);
      }
    );

  }

  downloadPayload(eventName, data){

    let a = document.createElement("a");
    let fileName = eventName+'.json';
    let file = new Blob([data], { type: 'application/json' });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
      window.navigator.msSaveOrOpenBlob(file, fileName);
    else { // Others
      let url = URL.createObjectURL(file);
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }

  deletePayload(eventName){
    this.payloadService.deletePayload(eventName).subscribe(
      result =>{
        this.combinedPayload=null;
        this.selectedEventName=null;
        this.getUniqueEventNames();
      },
      error => {
        this.isError = true;
        this.messageDetails = {severity: 'warn-alert', summary: 'Unable to Delete Payload', detail: error};
      }
    );
  }

}
