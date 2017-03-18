import {FormControl} from "@angular/forms";

export class JsonPathValidator {
  static getJsonPathValidator() {
    return function conditionValidator(control: FormControl): { [s: string]: boolean} {
      let jsonExpression = control.value;
      let jp = require('jsonpath');
      if(jsonExpression!=null)
      if(jsonExpression!=''){
        try {
          jp.parse(jsonExpression);
        }
        catch(e){
          return {invalidExpression: true};
        }
      }
    }
  }

  static getJsonDataValidator() {
    return function jsonDataValidator(control: FormControl): { [s: string]: boolean} {
      let jsonExpression = control.value;
      if(jsonExpression!=null)
        if(jsonExpression!=''){
          try {
            JSON.parse(jsonExpression);
          }
          catch(e){
            return {invalidExpression: true};
          }
        }
    }
  }
}
