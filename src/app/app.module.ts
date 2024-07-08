import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ContainerComponent } from './shared/container/container.component';
import { HomeComponent } from './pages/home/home.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { provideHttpClient } from '@angular/common/http';
import { MedicoCreateComponent } from './pages/medico/medico-create/medico-create.component';
import { FormsModule } from '@angular/forms';
import { MedicoEditComponent } from './pages/medico/medico-edit/medico-edit.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AlertComponent } from './shared/dialogs/alert/alert.component';
import { MatButtonModule} from '@angular/material/button';
import { MatDialogModule} from '@angular/material/dialog';
import { ConfirmComponent } from './shared/dialogs/confirm/confirm.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    ContainerComponent,
    HomeComponent,
    MedicoComponent,
    MedicoCreateComponent,
    MedicoEditComponent,
    PacienteComponent,
    AlertComponent,
    ConfirmComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [
    provideHttpClient(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
