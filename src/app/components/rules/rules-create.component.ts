import {Component} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {JsonPathValidator} from "../../lib/customvalidators/jsonpath.validator";

import {DeepRule} from "../../models/rules.model";
import {RulesService} from "../../services/rules.service";

@Component({
  selector: 'app-root',
  templateUrl: 'rules-create.component.html'
})
export class CreateRulesComponent {

  currentUser;
  showMessage;
  messageDetails;
  userRole;
  isClicked;

  deepRuleForm: FormGroup;
  jsonPathError: string;
  deepRules: DeepRule[];
  deepRule: DeepRule;

  canInsert: string;

  constructor(private rulesService: RulesService,  private router:Router) {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.userRole = this.currentUser.roleId;

    //this.deepRules = [];
    this.deepRuleForm = new FormGroup({
      activity: new FormControl('', [Validators.required,Validators.minLength(3)]),
      system: new FormControl('',Validators.compose([Validators.required,Validators.minLength(8)])),
      condition: new FormControl('',[JsonPathValidator.getJsonPathValidator()]),
      compensatingFlow: new FormControl('',[]),
      numberOfRetries: new FormControl('',[]),
      retryDelay: new FormControl('',[]),
      messageQos: new FormControl('10',[]),
      createdBy: new FormControl('',[])
    });
    this.showMessage = false;
    this.deepRuleForm.valueChanges.subscribe( (form: any) => {});

  }

  private validateCondition(condition) {
    this.jsonPathError = '';
    if(condition!=''){
      let jp = require('jsonpath');
      try {
        jp.parse(condition);
      }catch(e){
        this.jsonPathError = e.message;
      }
    }
  }

  setTime(){
    setTimeout(function() {
      this.showMessage = false;
      this.router.navigate(['/viewRules']);
    }.bind(this), 1500);
  }

  cancel(){
    this.router.navigate(['/viewRules']);
  }

  createRules(value: any){
    this.isClicked = true;
    this.deepRule = value;
    this.deepRule.createdBy = this.currentUser.firstName + ' ' + this.currentUser.lastName;
    this.rulesService.createRule(this.deepRule).subscribe(
      result => {
        //if(result)
        this.showMessage = true;
        this.messageDetails = {severity: 'success-alert', summary: 'Created Rule Successfully', detail: ''};
        this.setTime();
      },
      error => {
        this.isClicked = false;
        this.showMessage = true;
        this.messageDetails = {severity: 'warn-alert', summary: 'Unable to Create Rule ... | ', detail: error};
      }
    );
  }

  /*createRules(value: any){
    this.deepRules[0]= value;
    this.rulesService.checkIfRuleCanInsert(this.deepRules).subscribe(
      result => {
        this.canInsert = result;
        if(this.canInsert=='0'){
          this.deepRules[0].createdBy = this.currentUser.firstName + ' ' + this.currentUser.lastName;
          this.rulesService.createRule(this.deepRules).subscribe(
            result => {
              this.showMessage = true;
              this.messageDetails = {severity: 'success-alert', summary: 'Created Rule Successfully', detail: ''};
              this.setTime();
            },
            error => {
              this.showMessage = true;
              this.messageDetails = {severity: 'warn-alert', summary: 'Unable to Create Rule', detail: error};
            }
          );
        }
      },
      error => {
        this.canInsert = '1';
        this.showMessage = true;
        this.messageDetails = {severity: 'warn-alert', summary: '', detail: error};
      }
    );
  }*/

}
