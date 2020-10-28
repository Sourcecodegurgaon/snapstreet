import { Component, OnInit } from "@angular/core";
import { AuthService } from ".././auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router, ActivatedRoute } from "@angular/router";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { FormsService } from "../Home/Property/fillFormBuyer/fillFormBuyer.service";
import axios from 'axios';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { StrapiAuthService } from "../strapi-auth.service";
import { first, elementAt } from 'rxjs/operators';
import { HttpService } from "../http.service";
import {AlertLoginComponent} from "./../Misc/alert-login/alert-login.component";
import {AlertUserTypeComponent} from "./../Misc/alert-user-type/alert-user-type.component"


import {
  VERSION,
  MatDialogRef,
  MatDialog,
  MatSnackBar,
  MAT_DIALOG_DATA
} from "@angular/material";
@Component({
  selector: "app-template",
  templateUrl: "./template.component.html",
  styleUrls: ["./template.component.css"],
})
export class TemplateComponent implements OnInit {
  uid: any;
  selectedIndex = 0;
  maxNumberOfTabs = 2;
  isLoggedIn: Boolean = true;
  userData: any;
  boolean: boolean;
  isLoading: boolean = false;
  newUser: boolean = false;
  return: any;
  user: any;
  useremail: any;
  DOB: string;
  age: any;
  name: any;
  userPasswordRegister: any;
  model: any = {};
  loading = false;
  returnUrl: string;
  overlay: boolean = false;
  email: any;
  pass: any;
  displayName: any;
  userEmailRegister: any;
  password;
  emails: any;
  passs: any;
  now: Date = new Date();
  getUser: any;
  notificationOverlay: Object;
  notificationContent: any;
  emailField: boolean = false
  notValidEmail: boolean = false
  SignUp: boolean = false
  emailData;
  topLine: any;
  secondLine: any;
  validity: any;
  constructor(
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private FormService: FormsService,
    public HttpClient: HttpClient,
    public StrapiAuthService: StrapiAuthService,
    public HttpService: HttpService,

    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.userData = JSON.parse(sessionStorage.getItem('currentUser'));

    if (this.userData != null) {

      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }
    this.HttpService.getBlueNotificationContent().subscribe((data) => {
      this.notificationOverlay = data
      this.notificationContent = this.notificationOverlay[0].SignUpFromMenuAndTop
    })


    this.HttpService.getSignupUpTerms().subscribe((data)=>{
      this.topLine = data[0].TopLine
      this.secondLine = data[0].SecondSignup
    })

    this.HttpService.getValidityError().subscribe((validity)=>{
      this.validity = validity[0].SigininValidityError
    })



  }
  private LoggedIn() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid;
    this.isLoggedIn = true;
  }
  private LoggedOut() {
    this.isLoggedIn = false;
  }

  facebookLogin() {
    this.isLoading = true;
    this.authService.FacebookAuth().then((data) => {
      this.user.Lastseen = this.now
      this.return = this.FormService.createUserTime(this.user)
        .then(data => {
        });
      this.isLoading = false;
    });
  }

  //SignIn Google
  googleLogin() {
    this.isLoading = true;
    this.authService.GoogleAuth().then((data) => {

    });
  }


  //Signup Google
  googleSignup() {
  this.StrapiAuthService.Googlelogin().subscribe((data)=>{
    console.log(data)
  })
  }



  signIn(email, pass) {
    console.log(email + pass);
    this.isLoading = true;
    this.authService.SignIn(email, pass).then((data) => {
      this.isLoading = false;
      this.user.Lastseen = this.now
      this.return = this.FormService.createUserTime(this.user)
        .then(data => {
        });
      this.isLoading = false;
    });
  }

  NewUser() {
    this.newUser = true;
  }

  OldUser() {
    this.newUser = false;
  }
  close() {
    this.newUser = false;
    this.newUser = false;
  }

  signUp(displayName, email, pass) {
    console.log(displayName)
    this.overlay = true;
    this.authService.SignUp(email, pass).then((data) => {
      this.isLoading = false;
      this.user.Name = displayName;
      this.user.DOB = null;
      this.user.Phone = null;
      this.return = this.FormService.createUserCustomer(this.user).then(
        (data) => {
          this.user.Lastseen = this.now
          this.return = this.FormService.createUserTime(this.user)
            .then(data => {
            });

        }
      );
    });
  }

  userNew() {
    this.user.DOB = null;
    this.user.Phone = null;
    this.user.name;
    this.return = this.FormService.createUserCustomer(this.user).then(
      (data) => {

      }
    );
  }
  continueClose() {
    this.overlay = false;
  }

  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.signUp(this.name, this.email, this.password);
    }
  }

  saves() {

    this.signIn(this.emails, this.passs);

  }

  newUsers(displayName, email, pass) {
    axios
      .post('http://134.209.93.8/auth/local/register', {
        username: displayName,
        email: email,
        password: pass,
      })
      .then(response => {
        // Handle success.
        this.login(displayName, pass)

      })
      .catch(error => {
        // Handle error.
        const dialogRef = this.dialog.open(
          AlertLoginComponent,
          {
            data: {
              message: error.response.data.message[0].messages[0].message,
            }
          }
        );
      });
  }




  loggein(email, password) {
    console.log(email, password)
    this.isLoading = true;
    const data = axios.post('http://134.209.93.8/auth/local', {
      identifier: email,
      password: password
    }).then(response => {
      console.log(response)
      sessionStorage.setItem("user", JSON.stringify(response.data));
    }).catch(error => { console.log('An error occurred:', error.response); });
    this.isLoading = false
  }

  login(username, password) {
    this.loading = true;
    this.StrapiAuthService.login(username, password)
      .pipe(first())
      .subscribe(
        data => {
    
        
          location.reload()
       
        },
        error => {
          if (error && error.error && error.error.message && error.error.message.length > 0) {
            alert(error.error.message[0].messages[0].message);
          }
          else {
            alert('error');
          }

          //this.alertService.error(error);
          this.loading = false;
        });
  }


  Googlelogin() {
    this.loading = true;
    this.StrapiAuthService.Googlelogin()
      .pipe(first())
      .subscribe(
        data => {
          location.reload()

        },
        error => {
          if (error && error.error && error.error.message && error.error.message.length > 0) {
            alert(error.error.message[0].messages[0].message);
          }
          else {
            alert('error');
          }

          //this.alertService.error(error);
          this.loading = false;
        });
  }






  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(String(email).toLowerCase()) == true) {
      this.HttpService.getAllUsers(email).subscribe((data) => {
        this.emailData = data
        console.log(this.emailData)

        if (this.emailData.length == 1) {
          this.emailField = true
          this.notValidEmail = false


          if (this.emailData[0].AgentType != null)
          {
  
  
            this.emailField = false
            this.notValidEmail = true
            const dialogRef = this.dialog.open(
                AlertUserTypeComponent,
                {
                  data: {
                    message: "Please Login as User",
  
                  }
                }
            );
  
  
          }
        }
      
        else {
          this.notValidEmail = true

        }
    

      });

    }
    else {
      this.notValidEmail = true

    }


  }
  alreadyUser() {
    this.SignUp = false
  }
  newCustomeer() {
    this.SignUp = true

  }
}
