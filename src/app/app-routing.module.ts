import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoffeeSelectorComponent } from './components/coffee-selector/coffee-selector.component';

const routes: Routes = [
  {
    path: 'coffee-selector',
    component: CoffeeSelectorComponent,
  },
  {
    path: '',
    redirectTo: '/coffee-selector',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
