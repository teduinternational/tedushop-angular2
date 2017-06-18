import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../core/services/data.service';

import { NotificationService } from '../../../core/services/notification.service';
import { UtilityService } from '../../../core/services/utility.service';
import { MessageContstants } from '../../../core/common/message.constants';
import { SystemConstants } from '../../../core/common/system.constants';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  public orderDetails: any[];
  public entity: any;
  public totalAmount: number;
  public orderId: number;
  public baseFolder: string = SystemConstants.BASE_API;
  constructor(private utilityService: UtilityService,
    private _dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService) { }


  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.orderId = params['id'];
      this.loadOrder(this.orderId);

      this.loadOrderDetail(this.orderId);
    });

  }

  public goBack() {
    this.utilityService.navigate('/main/order/index');
  }

  public loadOrder(id: number) {
    this._dataService.get('/api/order/detail/' + id.toString()).subscribe((response: any) => {
      this.entity = response;
    }, error => this._dataService.handleError(error));
  }
  public exportToExcel() {
    this._dataService.get('/api/order/exportExcel/' + this.orderId.toString()).subscribe((response: any) => {
      console.log(response);
      window.open(this.baseFolder + response.Message);
    }, error => this._dataService.handleError(error));
  }
  public loadOrderDetail(id: number) {
    this._dataService.get('/api/order/getalldetails/' + id.toString()).subscribe((response: any[]) => {
      this.orderDetails = response;
      this.totalAmount = 0;
      for (var item of this.orderDetails) {
        this.totalAmount = this.totalAmount + (item.Quantity * item.Price);
      }
      console.log(this.totalAmount);
    }, error => this._dataService.handleError(error));
  }
}