import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";



@Injectable()
export class PayloadsService {
  private rulesUrl: string;
  constructor(private http: Http) {
    this.rulesUrl = environment.rulesUrl;
  }

  getUniqueEventNames(){
    return this.http.get(this.rulesUrl+'/payloadsConfig/getUniqueEventNames')
      .map(this.extractData)
      .catch(this.handleError);
  }

  getEventNGenericPayload(eventName){

    return Observable.forkJoin([
      this.http.get(this.rulesUrl+'/payloadsConfig/' + eventName + '/get')
        .map(res => {
        return res.json();})
        .catch( (error: any): any => {
          return {};
        }),
      this.http.get('../assets/resources/genericEventPayload.json')
        .map( genres => {
          return genres.json();
        }).catch((error: any):any => {
        return Observable.throw(error.json().error || 'Server error');
      }),
    ]);
  }

  updatePayload(payload){
    return this.http.post(this.rulesUrl+ '/fileUpload/validate/updatePayload', payload)
      .map(res => { return res.status;})
      .catch(this.handleUpdateError);
  }

  deletePayload(eventName){
    return this.http.delete(this.rulesUrl+'/payloadsConfig/'+eventName+'/deletePayload')
      .map(res => {
      return res.status;})
      .catch(this.handleError);
  }

  getAllPayloadsQos(){
    return this.http.get(this.rulesUrl+ '/payloadsConfig/getAll')
      .map(result => {
      return result.json();})
      .catch(this.handleError);
  }

  createQos(payload){
    return this.http.post(this.rulesUrl+ '/payloadsConfig/save', payload)
      .map(res => { return res.status;})
      .catch(this.handleError);
  }


  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.errorMessage ? error.errorMessage :
      error.status ? `${error.status} - ${error.statusText}` : 'ERR_CONNECTION_REFUSED';
    return Observable.throw(errMsg);
  }

  private handleUpdateError(error: any) {
    let errorMsg = error.json();
    let errMsg = (error.message) ? error.message : errorMsg.errorMessage ? errorMsg.errorMessage :
        error.status ? `${error.status} - ${error.statusText}` : 'ERR_CONNECTION_REFUSED';
    return Observable.throw(errMsg);
  }
}
