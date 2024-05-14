import { Injectable, signal } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import {getAuth, onAuthStateChanged, FacebookAuthProvider, signInWithRedirect, signOut, GoogleAuthProvider} from 'firebase/auth';
import { Observable } from 'rxjs';
import { User } from './interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private firebaseApp = initializeApp(environment.firebaseConfig);
  private isLogged = signal(false);
  private auth = getAuth(this.firebaseApp);
  private facebookProvider = new FacebookAuthProvider();
  private googleProvider = new GoogleAuthProvider();

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

  logWithFacebook() {
    signInWithRedirect(this.auth, this.facebookProvider);
  }

  logWithGoogle() {
    signInWithRedirect(this.auth, this.googleProvider);
  }

  signOutUser() {
    signOut(this.auth).then(() => {
      console.log("done")
    }).catch((error) => {
      console.error("error", error)
    });
  }

  getUser() {
    return this.auth.currentUser
  }

  constructor() { 
  }
}
