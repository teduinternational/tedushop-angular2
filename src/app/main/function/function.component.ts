import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeComponent } from 'angular-tree-component';
import { DataService } from '../../core/services/data.service';

import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service';
import { MessageContstants } from '../../core/common/message.constants';
import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.css']
})
export class FunctionComponent implements OnInit {
  @ViewChild('addEditModal') public addEditModal: ModalDirective;
  @ViewChild('permissionModal') public permissionModal: ModalDirective;
  @ViewChild(TreeComponent)
  private treeFunction: TreeComponent;

  public _functionHierachy: any[];
  public _functions: any[];
  public entity: any;
  public editFlag: boolean;
  public filter: string = '';
  public functionId : string;
  public _permission: any[];

  constructor(private _dataService: DataService,
    private notificationService: NotificationService,
    private utilityService: UtilityService) { }

  ngOnInit() {
    this.search();
  }
public showPermission(id: any) {
    this._dataService.get('/api/appRole/getAllPermission?functionId=' + id).subscribe((response: any[]) => {
      this.functionId = id;
      this._permission = response;
      this.permissionModal.show();
    }, error => this._dataService.handleError(error));

  }

  public savePermission(valid: boolean, _permission: any[]) {
    if (valid) {
      var data = {
        Permissions: this._permission,
        FunctionId: this.functionId
      }
      this._dataService.post('/api/appRole/savePermission', JSON.stringify(data)).subscribe((response: any) => {
        this.notificationService.printSuccessMessage(response);
        this.permissionModal.hide();
      }, error => this._dataService.handleError(error));
    }
  }
  //Show add form
  public showAddModal() {
    this.entity = {};
    this.addEditModal.show();
    this.editFlag = false;
  }
  //Load data
  public search() {
    this._dataService.get('/api/function/getall?filter=' + this.filter)
      .subscribe((response: any[]) => {
        this._functions = response.filter(x => x.ParentId == null);
        this._functionHierachy = this.utilityService.Unflatten(response);
      }, error => this._dataService.handleError(error));
  }

  //Save change for modal popup
  public saveChanges(valid: boolean) {
    if (valid) {
      if (this.editFlag == false) {
        this._dataService.post('/api/function/add', JSON.stringify(this.entity)).subscribe((response: any) => {
          this.search();
          this.addEditModal.hide();
          this.notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
        }, error => this._dataService.handleError(error));
      }
      else {
        this._dataService.put('/api/function/update', JSON.stringify(this.entity)).subscribe((response: any) => {
          this.search();
          this.addEditModal.hide();
          this.notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
        }, error => this._dataService.handleError(error));

      }
    }

  }
  //Show edit form
  public showEdit(id: string) {
    this._dataService.get('/api/function/detail/' + id).subscribe((response: any) => {
      this.entity = response;
      this.editFlag = true;
      this.addEditModal.show();
    }, error => this._dataService.handleError(error));
  }

  //Action delete
  public deleteConfirm(id: string): void {
    this._dataService.delete('/api/function/delete', 'id', id).subscribe((response: any) => {
      this.notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.search();
    }, error => this._dataService.handleError(error));
  }
  //Click button delete turn on confirm
  public delete(id: string) {
    this.notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => this.deleteConfirm(id));
  }
}
