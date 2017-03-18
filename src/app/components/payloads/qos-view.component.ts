import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {ConfirmationService} from "primeng/components/common/api";

import {Payload} from "../../models/payload.model";
import {User} from "../../models/user.model";
import {PayloadsService} from "../../services/payloads.service";

@Component({
  templateUrl: 'qos-view.component.html'
})
export class ViewQosComponent {

  currentUser;
  userRole: string;
  showMessage;
  messageDetails;

  items: any[];
  selectedQos;
  payloads: Payload[];


  constructor(private payloadsService: PayloadsService, private router:Router) {

    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.userRole = this.currentUser.roleId;
    this.showMessage = false;
    this.items = [
      { label: 'Edit', icon: 'fa-edit', command: (event) => this.editQos(this.selectedQos) },
      { label: 'Remove', icon: 'fa-trash', command: (event) => this.deleteQos(this.selectedQos)}
    ];

    this.getQosData();

  }

  createQos(){
    this.router.navigate(['/createQos']);
  }

  getQosData(){
    this.payloadsService.getAllPayloadsQos().subscribe(
      payloadsQos => {
        this.payloads = payloadsQos;
      },
      error => {
        this.showMessage = true;
        this.messageDetails = {severity: 'warn-alert', summary: 'Unable to get Qos Data', detail: error};
      }
    );
  }

  editQos(selectedQos){}
  deleteQos(selectedQos){}

}
