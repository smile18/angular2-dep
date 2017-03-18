import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";
import {User} from "../models/user.model";


@Injectable()
export class AppGlobals {
// use this property for property binding
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public isCurrentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public isAdminUser: BehaviorSubject<string> = new BehaviorSubject<string>('');

  setLoginStatus(isLoggedIn) {
    this.isUserLoggedIn.next(isLoggedIn);
  }

  setIsCurrentUser(currentUser) {
    this.isCurrentUser.next(currentUser);
  }

  setIsAdminUser(userRole) {
    this.isAdminUser.next(userRole);
  }
}
