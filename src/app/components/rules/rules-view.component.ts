import {Component} from "@angular/core";
import {Router} from "@angular/router";

import {ConfirmationService} from "primeng/components/common/api";
import {OverlayPanel} from "primeng/components/overlaypanel/overlaypanel";

import {DeepRule} from "../../models/rules.model";
import {User} from "../../models/user.model";
import {AuthenticationService} from "../../services/authentication.service";
import {AppGlobals} from "../../services/app-globals.service";
import {RulesService} from "../../services/rules.service";



@Component({
  templateUrl: 'rules-view.component.html'
})
export class ViewRulesComponent {

  currentUser: User;
  showMessage;
  messageDetails;
  userRole;
  isLoggedIn: boolean;

  deeprules: DeepRule[];
  cols: any[];
  items: any[];
  selectedRule: DeepRule;
  display: boolean = false;
  message;
  content;



  constructor(private rulesService: RulesService, private router:Router,
              private confirmationService: ConfirmationService,
              private auth: AuthenticationService,
              private appGlobal: AppGlobals) {

    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.isLoggedIn = this.currentUser.isLoggedIn;
    this.getUserRole();
    this.getRules();

    this.cols = [
      {field:"activity" , header:"Event Name"},
      {field:"condition" , header:"Filter Condition"},
      {field:"system" , header:"Consumer Name"},
      {field:"compensatingFlow" , header:"Error handler"},
      {field:"numberOfRetries" , header:"No.of Retries"},
      {field:"retryDelay" , header:"Retry Delay(seconds)"},
      {field:"createdBy" , header:"Created BY"},
      {field:"messageQos" , header:"Message QOS"}
    ];
    this.items = [
      { label: 'Edit', icon: 'fa-edit', command: (event) => this.editRule(this.selectedRule) },
      { label: 'Remove', icon: 'fa-trash', command: (event) => this.deleteRule(this.selectedRule)}
    ];

  }

  showMenu(event,selectedRule: DeepRule, overlaypanel: OverlayPanel){
    this.selectedRule=selectedRule;
    overlaypanel.toggle(event);
  }


  public getUserRole(){
    if(this.currentUser!=null) {
      this.auth.getUserRole(this.currentUser.ntId).subscribe(
        result => {
          this.userRole = result;
          sessionStorage.setItem('userRole', this.userRole);
          this.currentUser.roleId = this.userRole;
          sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        },
        error => {
          //console.log(error);
        }
      );
    }
  }

  getRules(){
    this.rulesService.getRules().subscribe(
      deeprules => {
        deeprules.forEach(rule => {
          rule.retryDelay = rule.retryDelay * 0.001
        });
        this.deeprules = deeprules;
      },
      error => {
        this.showMessage = true;
        this.messageDetails = {severity: 'warn-alert', summary: 'Unable to get Rules ... ', detail: error};
      }
    );
  }

  createRule(){
    this.router.navigate(['/createRules']);
  }

  editRule(selectedRule){
    this.rulesService.setSelectedRule(selectedRule);
    this.router.navigate(['/updateRules']);
  }


  deleteRule(selectedRule){
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        let userName = this.currentUser.firstName + ' ' + this.currentUser.lastName;
        this.rulesService.deleteRule(selectedRule, userName).subscribe(
          result => {
            this.messageDetails = {severity: 'success-alert', summary: 'Deleted Rule', detail: '' };
            this.getRules();
          },
          error => {
            this.showMessage = true;
            this.messageDetails = {severity: 'warn-alert', summary: 'Unable to Delete Rule', detail: error };
          }
        );
      }
    });

  }

  refreshRules(){
    this.rulesService.refreshAllRules().subscribe(
      result => {
        this.showMessage = true;
        this.messageDetails = {severity: 'success-alert', summary: 'Rules got refreshed', detail: ''};
      },
      error => {
        this.showMessage = true;
        this.messageDetails = {severity: 'warn-alert', summary: 'Unable to Refresh Rules ...! ', detail: ' StatusCode: '+error};
      }
    );
  }

}
