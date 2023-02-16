import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((x) => x.HomeModule),
  },
  {
    path: 'shooping',
    loadChildren: () =>
      import('./pages/shopping/shopping.module').then((x) => x.ShoppingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
