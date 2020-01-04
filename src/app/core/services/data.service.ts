import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SystemConstants } from './../common/system.constants';
import { AuthenService } from './authen.service';
import { NotificationService } from './notification.service';
import { UtilityService } from './utility.service';
import { MessageContstants } from './../common/message.constants';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable()
export class DataService {
  private headers = new HttpHeaders();

  constructor(private _http: HttpClient,
    private _authenService: AuthenService,
    private _notificationService: NotificationService,
    private _utilityService: UtilityService) {
      this.headers = this.headers.set('Content-Type', 'application/json');
      this.headers = this.headers.set("Authorization", "Bearer " + _authenService.getLoggedInUser().access_token);
  }

  get(uri: string) {
  
    return this._http.get(environment.BASE_API + uri, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }
  post(uri: string, data?: any) {
   
    return this._http.post(environment.BASE_API + uri, data, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }
  put(uri: string, data?: any) {
    
    return this._http.put(environment.BASE_API + uri, data, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }
  delete(uri: string, key: string, id: string) {
  
    return this._http.delete(environment.BASE_API + uri + "/?" + key + "=" + id, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }
  deleteWithMultiParams(uri: string, params) {
    var paramStr: string = '';
    for (let param in params) {
      paramStr += param + "=" + params[param] + '&';
    }
    return this._http.delete(environment.BASE_API + uri + "/?" + paramStr, { headers: this.headers })
      .pipe(catchError(this.handleError));

  }
  postFile(uri: string, data?: any) {
    let newHeader = new HttpHeaders();
    newHeader.set("Authorization", "Bearer " + this._authenService.getLoggedInUser().access_token);
    return this._http.post(environment.BASE_API + uri, data, { headers: newHeader })
      .pipe(catchError(this.handleError));
  }
  public handleError(error: any) {
    if (error.status == 401) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._notificationService.printErrorMessage(MessageContstants.LOGIN_AGAIN_MSG);
      this._utilityService.navigateToLogin();
    }
    else if (error.status == 403) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._notificationService.printErrorMessage(MessageContstants.FORBIDDEN);
      this._utilityService.navigateToLogin();
    }
    else {
      let errMsg = JSON.parse(error._body).Message;
      this._notificationService.printErrorMessage(errMsg);

      return Observable.throw(errMsg);
    }


  }
}
