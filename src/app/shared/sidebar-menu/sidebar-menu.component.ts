import { Component, OnInit } from '@angular/core';
import { DataService } from './../../core/services/data.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {
  public functions: any[];
  constructor(private dataService: DataService) { }

  ngOnInit() {
     this.dataService.get('/api/function/getlisthierarchy').subscribe((response: any[]) => {
      this.functions = response.sort((n1, n2) => {
        if (n1.DisplayOrder > n2.DisplayOrder)
          return 1;
        else if (n1.DisplayOrder < n2.DisplayOrder)
          return -1;
        return 0;
      });
    }, error => this.dataService.handleError(error));
  }

}
