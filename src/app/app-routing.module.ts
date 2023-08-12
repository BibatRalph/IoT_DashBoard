import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ThirdpageComponent } from './thirdpage/thirdpage.component';
const routes: Routes = [
  
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'analyze',
    component: SidenavComponent,
  },
  {
    path: 'Config',
    component: ThirdpageComponent,
  },

];
            


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
