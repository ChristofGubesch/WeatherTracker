import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable, BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  authState: firebase.User = null;

  user: Observable<firebase.User> = null;

  private userToken;

  constructor(public fireAuth: AngularFireAuth) {
    if (localStorage.getItem('user')) {
      this.user = of(JSON.parse(localStorage.getItem('user')));
    }
    fireAuth.authState.subscribe((auth) => {
      this.authState = auth;
      if (this.authenticated) {
        localStorage.setItem('userToken', JSON.stringify(this.authState.uid));
      }
    });
  }

  // the function is a getter for a property
  get authenticated(): boolean {
    return this.authState !== null;
  }

  signIn(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.user));
        this.user = of(res.user);
      });
  }

  signUp(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    this.fireAuth.auth.signOut();
  }
}
