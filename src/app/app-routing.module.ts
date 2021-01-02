import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  // Fallback when no prior route is matched
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // lazy loaded routes
  { path: 'cases', loadChildren: () => import('./cases/cases.module').then(m => m.CasesModule) }, // './cases/cases.module#CasesModule' },
  { path: 'employees', loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: false })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule { }
