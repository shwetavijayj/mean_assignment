import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadersComponent } from './headers/headers.component';
import { LoginComponent } from './login/login.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { PersonalInfoDisplayComponent } from './personal-info-display/personal-info-display.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { HeaderUserComponent } from './header-user/header-user.component';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    HeadersComponent,
    LoginComponent,
    PersonalInfoComponent,
    PersonalInfoDisplayComponent,
    CreateUserComponent,
    CreateRoleComponent,
    HeaderUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
