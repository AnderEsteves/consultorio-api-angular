import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { MedicoCreateComponent } from './pages/medico/medico-create/medico-create.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'medico', component: MedicoComponent},
  {path: 'medico/create', component:MedicoCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
