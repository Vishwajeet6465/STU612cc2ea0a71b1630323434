import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
  { path: 'admin', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      { path: 'bills', loadChildren: () => import('./bills/bills.module').then(m => m.BillsModule) },
      { path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) },
      { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
      { path: 'order', loadChildren: () => import('./order/order.module').then(m => m.OrderModule) },
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [ {provide: LocationStrategy, useClass: PathLocationStrategy} ]

})
export class AppRoutingModule {
}
