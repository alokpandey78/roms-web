import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute, Data } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: [],
})
export class AppBreadcrumbComponent {
  // @Input() layout;
  pageInfo: Data = Object.create(null);
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
      )
      .pipe(filter((route) => route.outlet === 'primary'))
      .pipe(mergeMap((route) => route.data))
      // tslint:disable-next-line - Disables all
      .subscribe((event) => {
        // tslint:disable-next-line - Disables all
        this.titleService.setTitle(`${environment.server}${environment.server == 'UAT' ? '-' : ''}${event['title']}`);
        this.pageInfo = event;
      });
  }
}
