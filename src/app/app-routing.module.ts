import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { MedicoCreateComponent } from './pages/medico/medico-create/medico-create.component';
import { MedicoEditComponent } from './pages/medico/medico-edit/medico-edit.component';
import { PacienteComponent } from './pages/paciente/paciente.component';


const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'medico', component: MedicoComponent},
  {path: 'medico/create', component:MedicoCreateComponent},
  {path: 'medico/edit/:id', component:MedicoEditComponent},
  {path: 'paciente', component: PacienteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
