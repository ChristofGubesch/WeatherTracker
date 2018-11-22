import { SettingComponent } from './setting/setting.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { OverviewComponent } from './overview/overview.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeatherService } from './services/weather.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OverviewComponent,
    SettingComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent],
})
export class AppModule { }
