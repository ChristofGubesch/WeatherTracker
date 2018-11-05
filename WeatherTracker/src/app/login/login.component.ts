import { AuthentificationService } from './../services/authentification.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: Observable<firebase.User>;
  authentificated = false;
  email: string;
  password: string;
  error: string;

  constructor(private router: Router, private authService: AuthentificationService) {}

   login() {
     this.authService.signIn(this.email, this.password)
     .catch((error) => {
      this.error = error;
    });
     this.router.navigate(['home']);
  }

  register() {
    console.log(this.email);
    this.authService.signUp(this.email, this.password)
    .catch((error) => {
      this.error = error;
    });
    // this.router.navigate(['home']);
  }

  ngOnInit() {
  }

}
