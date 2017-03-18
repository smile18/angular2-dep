import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {User} from "../models/user.model";


@Injectable()
export class AuthenticationService {

  private errMsg: string;
  public currentUser: User;

  constructor(private http: Http) {}

  getUserRole(username: string) {
    return this.http.get(environment.rulesUrl + '/userConfig/' + username.toLowerCase() + '/getRole')
      .map(result => {
        return result.text();
      })
      .catch((error: any): any => {
        return Observable.throw(error);
      });
  }

  login(username: string, password: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin','*');
    let options = new RequestOptions({ headers: headers });

    return this.http.get(environment.rulesUrl+'/authenticate/' + username + '/' + password)
      .map( (result: Response) => {
        let user = result.json();
        if(user && user.roleId){
          this.currentUser = user;
          this.currentUser.isLoggedIn = true;
          sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          sessionStorage.setItem('userRole', this.currentUser.roleId);
          return user;
        }
      })
      .catch(this.handleError)
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    sessionStorage.clear();
    this.currentUser=null;
  }


  private handleError(error: any) {
    if(error.status==0)
      this.errMsg = 'ERR_CONNECTION_REFUSED';
    else if(error.status>=500)
      this.errMsg = 'INTERNAL_SERVER_ERROR';
    else if(error.status==404)
      this.errMsg = 'Invalid Username or Password';
    error.message = this.errMsg;
    return Observable.throw(this.errMsg);
  }

}


