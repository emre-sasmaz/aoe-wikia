import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then((module) => module.HomeModule),
  },
  {
    path: 'units',
    loadChildren: () => import('./features/units/pages/units-page/units-page.module').then((module) => module.UnitsPageModule),
  },
  {
    path: 'units/:id',
    loadChildren: () => import('./features/units/pages/units-detail-page/units-details-page.module').then((module) => module.UnitsDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
