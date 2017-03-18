import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {DeepRule} from "../models/rules.model";

@Injectable()
export class RulesService {
  private rulesUrl: string;
  private selectedRule: DeepRule;

  constructor(private http: Http) {
    this.rulesUrl = environment.rulesUrl;
  }

  getRules(){
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin','*');
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.rulesUrl+'/rulesConfig/getRulesIsNotDeleteFlagTrue' , {headers: headers})
      .map(res => res.json())
      .catch(this.handleError);
  }

  checkIfRuleCanInsert(deepRule){
    return this.http.post(this.rulesUrl+'/rulesConfig/'+deepRule.activity +'/' +deepRule.system +'/canInsert', deepRule)
      .map(res => {return res.text();})
      .catch(this.handleError);
  }

  createRule(deepRule){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    /*return this.http.post(this.rulesUrl+'/rulesConfig/saveRules', deepRule, options)
      .map(res => {return res.status;})
      .catch(this.handleError);*/

    return this.http.post(this.rulesUrl+'/rulesConfig/saveRule', deepRule, options)
      .map(res => {return res.status;})
      .catch(this.handleError);
  }

  updateRule(deepRule){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.rulesUrl+'/rulesConfig/updateRules', deepRule, options)
      .map(res => {return res.status;})
      .catch(this.handleError);
  }

  deleteRule(deepRule, userName) {
    return this.http.delete(this.rulesUrl +'/rulesConfig/'+ deepRule.activity +'/'+ deepRule.system +'/' +  userName + '/deleteRules')
      .map(res => {
        return res.status;})
      .catch(this.handleError);
  }

  refreshAllRules(){
    return this.http.get(this.rulesUrl + '/rulesConfig/refreshAll')
      .map(res => {
      return res.status})
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private extractCanInsert(res: Response) {
    let body = res.json();
    return body || {};
  }
  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? (error.status==409) ? 'Rule with the same event name and system name already exists.' : `${error.status} - ${error.statusText}` : 'ERR_CONNECTION_REFUSED';
    return Observable.throw(errMsg);
  }

  setSelectedRule(selectedRule){
    this.selectedRule = selectedRule;
  }

  getSelectedRule(){
    return this.selectedRule;
  }

}
