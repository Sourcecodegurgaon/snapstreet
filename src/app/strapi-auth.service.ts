import { Injectable , NgZone } from '@angular/core';
import {StrapiUser} from "./strapiUser"

import { auth } from 'firebase/app';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StrapiAuthService {

  userData: any; // Save logged in user data
  public authToken: string;

  private authApiBase: string = 'http://134.209.93.8';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private httpClient: HttpClient,
    public router: Router,  
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {    

    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    if (sessionStorage.getItem('currentUser')) {
      this.userData = JSON.parse(sessionStorage.getItem('currentUser'));
      this.authToken = sessionStorage.getItem('currentJwt');
    }    
  }

  // Sign in with email/password
  login(username, password) {
    return this.httpClient.post<any>(`${this.authApiBase}/auth/local`, { identifier: username, password: password })
      .pipe(map(response => {
        console.log(response.user.blocked)
          // login successful if there's a jwt token in the response
          if (response.jwt && response.user ) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('updatedUser', JSON.stringify(response.user));
              sessionStorage.setItem('currentUser', JSON.stringify(response.user));
              sessionStorage.setItem('currentJwt', response.jwt);
              this.userData = response.user;
              this.authToken = sessionStorage.getItem('currentJwt');
              this.currentUserSubject.next(response.user);
          }

          return response.user;
      }));

  }


  componentDidMount() {

   
    return this.httpClient.get<any>(`${this.authApiBase}/auth/google/callback`)
    .pipe(map(response => {
      console.log(response.user.blocked)
        // login successful if there's a jwt token in the response
        if (response.jwt && response.user ) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
           
            localStorage.setItem('updatedUser', JSON.stringify(response.user));

            sessionStorage.setItem('currentUser', JSON.stringify(response.user));
            sessionStorage.setItem('currentJwt', response.jwt);
            this.userData = response.user;
            this.authToken = sessionStorage.getItem('currentJwt');
            this.currentUserSubject.next(response.user);
        }

        return response.user;
    }));

  }
  Googlelogin() {
    return this.httpClient.get<any>(`http://localhost:1337/connect/google`).pipe(map(response => {
          // login successful if there's a jwt token in the response
          if (response.jwt && response.user ) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('updatedUser', JSON.stringify(response.user));
              sessionStorage.setItem('currentUser', JSON.stringify(response.user));
              sessionStorage.setItem('currentJwt', response.jwt);
              this.userData = response.user;
              this.authToken = sessionStorage.getItem('currentJwt');
              this.currentUserSubject.next(response.user);
          }

          return response.user;
      }));

  }

  logout() {
    // remove user from local storage to log user out
    console.log("check")
    this.router.navigate(['/homenew']);
    this.router.navigateByUrl('/', { skipLocationChange: false    }).then(() => {
      this.router.navigate(["/homenew"]);
      location.reload()
    });
    localStorage.removeItem('updatedUser')
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentJwt');
  
    this.currentUserSubject.next(null);
  
  }

/*
  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        // Call the SendVerificaitonMail() function when new user sign        up and returns promise 
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email-address']);
    })
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }
*/

  forgotPassword(email) {
    console.log('forgotPassword', email)
    return this.httpClient.post<any>(`${this.authApiBase}/auth/forgot-password`, { email: email })
      .pipe(map(response => {
          return response;
      }));
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

}
