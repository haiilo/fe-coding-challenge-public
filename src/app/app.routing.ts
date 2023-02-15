import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('../modules/products/products.module').then(m => m.ProductsModule),

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    onSameUrlNavigation: 'reload'
  })]
})

export class AppRouting {}
