import { Component, OnInit, NgZone } from '@angular/core';
import { LoggedInUser } from '../../core/domain/loggedin.user';
import { AuthenService } from '../../core/services/authen.service';
import { SystemConstants } from '../../core/common/system.constants';
import { UrlConstants } from '../../core/common/url.constants';

import { SignalrService } from '../../core/services/signalr.service';
import { DataService } from '../../core/services/data.service';
import { UtilityService } from '../../core/services/utility.service';
@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  public user: LoggedInUser;
  public baseFolder: string = SystemConstants.BASE_API;
  public canSendMessage: Boolean;
  public announcements: any[];
  constructor(private _authenService: AuthenService,
    private utilityService: UtilityService,
    private _signalRService: SignalrService,
    private _dataService: DataService,
    private _ngZone: NgZone) {
    // this can subscribe for events  
    this.subscribeToEvents();
    // this can check for conenction exist or not.  
    this.canSendMessage = _signalRService.connectionExists;
  }

  ngOnInit() {
    this.user = this._authenService.getLoggedInUser();
    this.loadAnnouncements();
  }
  logout() {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
    this.utilityService.navigate(UrlConstants.LOGIN);
  }
  private subscribeToEvents(): void {

    var self = this;
    self.announcements = [];

    // if connection exists it can call of method.  
    this._signalRService.connectionEstablished.subscribe(() => {
      this.canSendMessage = true;
    });

    // finally our service method to call when response received from server event and transfer response to some variable to be shwon on the browser.  
    this._signalRService.announcementReceived.subscribe((announcement: any) => {
      this._ngZone.run(() => {
        console.log(announcement);
        moment.locale('vi');
        announcement.CreatedDate = moment(announcement.CreatedDate).fromNow();
        self.announcements.push(announcement);
      });
    });
  }

  markAsRead(id: number) {
    var body = { announId: id };
    this._dataService.get('/api/Announcement/markAsRead?announId=' + id.toString()).subscribe((response: any) => {
      if (response) {
        this.loadAnnouncements();
      }
    });
  }

  private loadAnnouncements() {
    this._dataService.get('/api/Announcement/getTopMyAnnouncement').subscribe((response: any) => {
      this.announcements = [];
       moment.locale('vi');
      for (let item of response) {
        item.CreatedDate = moment(item.CreatedDate).fromNow();
        this.announcements.push(item);
      }

    });
  }
}
