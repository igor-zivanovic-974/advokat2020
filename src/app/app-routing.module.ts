import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  // Fallback when no prior route is matched
  { path: '**', redirectTo: 'clients', pathMatch: 'full' },
];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
