import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subject } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  icon: string;
  children?: FoodNode[];
  is_active: boolean;
  route?: string;
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Giao doanh thu',
    icon: 'dashboard',
    is_active: false,
    route: '/month',
  },
  {
    name: 'Báo cáo doanh thu',
    icon: 'home',
    is_active: false,
    route: '/week',
  },
  // {
  //   name: 'Báo cáo',
  //   icon: 'assignment',
  //   is_active: false,
  //   children: [
  //     {
  //       name: 'Báo cáo NVVH',
  //       icon: 'person',
  //       is_active: false,
  //       route: '/report/operator',
  //     },
  //     {
  //       name: 'Báo cáo chi tiết',
  //       icon: 'text_snippet',
  //       is_active: false,
  //       route: '/report/overview',
  //     },
  //   ],
  // },
];
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  username?: string;
  ngOnInit(): void {
    this.isLoggedIn = this.tokenStorage.isAuthenticated();

    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      this.username = user.username;
    }
  }
  treeControl = new NestedTreeControl<FoodNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FoodNode) =>
    !!node.children && node.children.length > 0;

  isActive(name: string) {
    for (var data of TREE_DATA) {
      data.is_active = false;
      if (data.name == name) {
        data.is_active = true;
      }
      if (data.children?.length != undefined) {
        for (var child of data.children as FoodNode[]) {
          var cchild = child as unknown as FoodNode;

          cchild.is_active = false;
          if (cchild.name == name) {
            cchild.is_active = true;
          }
        }
      }
    }
  }

  navigate(route: any) {
    this.router.navigate([route]);
  }

  logOut() {
    this.tokenStorage.signOut();
    this.router.navigate(['/auth/login']);
  }

  isAdminOnly(name: any) {
    if (name == 'Báo cáo chi tiết') {
      // return this.authService.getDecodedToken().role == 'admin';
      return false;
    }
    return true;
  }
}
