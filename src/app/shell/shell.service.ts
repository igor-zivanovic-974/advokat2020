import { Routes, Route } from '@angular/router';

import { AuthenticationGuard } from '@app/@core/auth';
import { GlobalService } from './global.service';
import { ShellComponent } from './shell.component';

/**
 * Provides helper methods to create routes.
 */
export class Shell {
  // isMobileScreen: boolean;
  // hasSideMenu: boolean;
  // private _globalService: GlobalService;

  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return The new route using shell as the base.
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: ShellComponent,
      children: routes,
      canActivate: [AuthenticationGuard],
      // Reuse ShellComponent instance when navigating between child views
      data: { reuse: true },
    };
  }

  // public toggleSideMenu() {
  //   this.hasSideMenu = !this.hasSideMenu;
  //   this._globalService.hasSideMenu$.next(this.hasSideMenu);
  // }
}
