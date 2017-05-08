import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { UrlConstants } from '../../core/common/url.constants';
import { AuthenService } from './authen.service';

@Injectable()
export class UtilityService {
  private _router: Router;

  constructor(router: Router, private http: Http, private authenService: AuthenService) {
    this._router = router;
  }

  convertDateTime(date: Date) {
    var _formattedDate = new Date(date.toString());
    return _formattedDate.toDateString();
  }

  navigate(path: string) {
    this._router.navigate([path]);
  }
  navigateToLogin() {
    this._router.navigate([UrlConstants.LOGIN]);
  }
  Unflatten = (arr: any[]): any[] => {
    let map = {};
    let roots: any[] = [];
    for (var i = 0; i < arr.length; i += 1) {
      let node = arr[i];
      node.children = [];
      map[node.Id] = i; // use map to look-up the parents
      if (node.ParentId !== null) {
        arr[map[node.ParentId]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }
  

  MakeSeoTitle(input: string) {
    if (input == undefined || input == '')
      return '';
    //Đổi chữ hoa thành chữ thường
    var slug = input.toLowerCase();

    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, "-");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');

    return slug;
  }
}