import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MedicoComponent } from './pages/medico/medico.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'medico', component: MedicoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
