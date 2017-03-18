import {Component} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";

import {JsonPathValidator} from "../../lib/customvalidators/jsonpath.validator";

import {DeepRule} from "../../models/rules.model";
import {RulesService} from "../../services/rules.service";


@Component({
  selector: 'app-root',
  templateUrl: 'rules-update.component.html'
})
export class UpdateRulesComponent {

  currentUser;
  showMessage;
  messageDetails;
  userRole;

  deepRuleForm: FormGroup;
  jsonPathError: string;
  deepRules: DeepRule[];
  selectedRule: DeepRule;

  constructor(private rulesService: RulesService,  private router:Router, private route: ActivatedRoute) {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.userRole = this.currentUser.roleId;

    let selectedRuleString = this.route.snapshot.params['currentRule'];
    if(selectedRuleString!=null)
      this.selectedRule = JSON.parse(selectedRuleString.toString());

    this.selectedRule = this.rulesService.getSelectedRule();

    this.deepRules = [];
    this.deepRuleForm = new FormGroup({
      activity: new FormControl( this.selectedRule.activity,[Validators.required,Validators.minLength(3)]),
      system: new FormControl(this.selectedRule.system, Validators.compose([Validators.required,Validators.minLength(8)])),
      condition: new FormControl(this.selectedRule.condition,[JsonPathValidator.getJsonPathValidator()]),
      compensatingFlow: new FormControl(this.selectedRule.compensatingFlow,[]),
      numberOfRetries: new FormControl(this.selectedRule.numberOfRetries,[]),
      retryDelay: new FormControl(this.selectedRule.retryDelay,[]),
      messageQos: new FormControl(this.selectedRule.messageQos,[]),
      createdBy: new FormControl(this.selectedRule.createdBy,[])
    });

    this.deepRuleForm.controls['activity'].disable();
    this.deepRuleForm.controls['system'].disable();
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
    }.bind(this), 2000);
  }

  cancel(){
    this.router.navigate(['/viewRules']);
  }

  updateRule(value: any){
    this.deepRules[0]= value;
    this.selectedRule.condition = value.condition;
    this.selectedRule.compensatingFlow = value.compensatingFlow;
    this.selectedRule.numberOfRetries = value.numberOfRetries;
    this.selectedRule.retryDelay = value.retryDelay;
    this.selectedRule.messageQos = value.messageQos;
    this.selectedRule.modifiedBy = this.currentUser.firstName + ' ' + this.currentUser.lastName;

    this.rulesService.updateRule(this.selectedRule).subscribe(
      result => {
        this.showMessage=true;
        this.messageDetails = {severity: 'success-alert', summary: 'Updated Rule Successfully', detail: ''};
        this.setTime();
      },
      error => {
        this.showMessage=true;
        this.messageDetails = {severity: 'warn-alert', summary: 'Unable to Update Rule', detail: error};
      }
    );
  }

}
