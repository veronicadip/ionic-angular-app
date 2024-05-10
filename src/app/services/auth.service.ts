import { Injectable, signal } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private firebaseApp = initializeApp(environment.firebaseConfig);
  private isLogged = signal(false);
  auth = getAuth(this.firebaseApp);

  get isUserLoggedIn() {
    onAuthStateChanged(this.auth, user => {
      if(user !== null) {
        this.isLogged.set(true)
      } else {
        this.isLogged.set(false)
      }
    })
    return this.isLogged()
  }

  constructor() { }
}
