import { Component, OnInit } from "@angular/core";
import { AuthService } from "../.././auth.service";
import { FormControl, Validators } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import {
  VERSION,
  MatDialogRef,
  MatDialog,
  MatSnackBar,
  MAT_DIALOG_DATA,
} from "@angular/material";
import * as firebase from "firebase";
import { StateServiceService } from "./../../state-service.service";
import { MyMatchesService } from "../myMatches/myMatches.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormsService } from "../../Home/Property/fillFormBuyer/fillFormBuyer.service";
import { User } from "../../shared/services/user";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from '@angular/forms';
import { couldStartTrivia } from "typescript";
import { NotificationService } from "../notification/notification.service";
import { HttpService } from "../../http.service"
import axios from 'axios';
import { first } from 'rxjs/operators'
import { StrapiAuthService } from "../../strapi-auth.service";
import {AlertLoginComponent} from "../../Misc/alert-login/alert-login.component";
import {AlertUserTypeComponent}  from "../../Misc/alert-user-type/alert-user-type.component"
@Component({
  selector: "app-nav",
  templateUrl: "./navigationBar.component.html",
  styleUrls: ["./navigationBar.component.css"]
})
export class NavigationBarComponent implements OnInit {
  uid: any;
  notificationoverlay: boolean = false;
  isLoggedIn: Boolean = true;
  userData: any;
  boolean: boolean;
  propertyDetails = [];
  propertyBuyer = [];
  matchedProperties: any;
  property: any;
  buyerProperty = [];
  sellerProperty = [];
  noBuyerMatches: any;
  noSellerOfMatche: any;
  matchStatus: any;
  matches: any;
  open: Boolean = true;
  close: Boolean = false;
  menuItem: Boolean = false;
  navLink: Boolean = true;
  plusMenu: boolean = false;
  plusOpenMenu: boolean = true;
  plusclose: boolean = false;
  navLogin: boolean = false;
  newUser: boolean = false;
  isLoading: boolean = false;
  return: any;
  user: any;
  useremail: any;
  DOB: string;
  age: any;
  formVar: FormGroup;
  Name: any;
  users: any;
  displayName: any;
  name: any;
  email: any;
  password: any;
  notifications: any;
  confirmInterest = [];
  now: Date = new Date();
  confirmInterests = [];
  bellicon = []
  docid: any;
  Lastseen: Date;

  Notification: any
  notificationRed: string;
  belliconone: boolean
  bellicontwo: boolean
  getUser: any;
  CheckUserType;
  agent: boolean = false
  emailField: boolean = false
  notValidEmail: boolean = false
  SignUp: boolean = false
  emailData;
  topLine: any;
  secondLine: any;
  validity: any;
  notify;
  bellShow:boolean = false
  constructor(
    public authService: AuthService,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth,
    private MatchesService: MyMatchesService,
    private stateService: StateServiceService,
    private _Activatedroute: ActivatedRoute,
    public _router: Router,
    private FormsService: FormsService,
    private fb: FormBuilder,
    private NotificationService: NotificationService,
    public HttpService: HttpService,
    public StrapiAuthService: StrapiAuthService,
    private dialog: MatDialog,
  ) {
    this.formVar = this.fb.group({
      Name: '',
      email: '',
      password: ''
    });
  }

  ngOnInit() {

    this.initProfile()
    new Date().getTime() / 1000
    document.getElementById("custom").style.overflowY = "overlay"

    this.userData = JSON.parse(sessionStorage.getItem('currentUser'));

    if (this.userData != null) {
      this.uid = this.userData.id
      this.isLoggedIn = true;
      this.LoggedIn()

      this.HttpService.getUsers(this.uid).subscribe((data) => {

        this.CheckUserType = data
        if (this.CheckUserType.AgentType == "True") {
          this.agent = true
        }
        else {
          this.agent = false
        }
       
      })


    }
    else {
      this.isLoggedIn = false;
    }
    

    this.HttpService.getSignupUpTerms().subscribe((data) => {
      this.topLine = data[0].TopLine
      this.secondLine = data[0].SecondSignup
    })

    this.HttpService.getValidityError().subscribe((validity)=>{
      this.validity = validity[0].SigininValidityError
    })
    this.HttpService.getNotification().subscribe((notifiaction) => {
      notifiaction.forEach(element => {
        if (element.UserId == this.uid) {
          this.bellShow = true
          this.belliconone = false
          this.bellicontwo= false
        }
      })
    })
  }

  private LoggedIn() {

    this.isLoggedIn = true;

    this.navLogin = false;
    this._router.navigate["/"]
  }
  private LoggedOut() {
    this.isLoggedIn = false;
    this.navLogin = false;
    this.initProfile()
    this._router.navigate["/"]
  }
  getMatchCases() {
    // Fetch details Seller
    this.MatchesService.getMatchesSellerProperties(this.uid).then((res) => {
      res.forEach((element) => {
        if (element.data().matchStatus == 'confirm_interest') {
          this.sellerProperty.push(element.data())
        }
      });

      this.noSellerOfMatche = this.sellerProperty.length;
      this.matches = this.buyerProperty.length + this.sellerProperty.length

    });

    // Fetch details Seller
    this.MatchesService.getMatchesBuyerProperties(this.uid).then((res) => {
      res.forEach((element) => {
        this.buyerProperty.push(element.data());
      });
      this.noBuyerMatches = this.buyerProperty.length;
      this.matches = this.buyerProperty.length + this.sellerProperty.length
    });



  }

  getNotification() {
    this.HttpService.getNotification().subscribe((data) => {
      data.forEach(element => {
        this.bellicon.push(element)
        if (element.UserId == this.uid) {
          if (element.Lastseen == null) {
            this.confirmInterest.push(element)
            this.notifications = this.confirmInterest.length
          }
          else {
            this.notifications = 0
          }
          this.confirmInterests = null
        }
      });

    });
  }


  openMenu() {
    this.open = false;
    this.close = true;
    this.menuItem = true;
    this.plusCloseMenu()
  }
  closeMenu() {
    this.open = true;
    this.close = false;
    this.menuItem = false;
    this.navLogin = false;
    this.notificationoverlay = false
  }
  Itemmenu() {
    this.navLink = false;
    this.close = false;
    this.open = true;
    this.menuItem = false;
  }


  plusmenu() {
    this.plusMenu = true;
    this.plusclose = true;
    this.plusOpenMenu = false;
    this.closeMenu()
  }
  plusCloseMenu() {
    this.plusMenu = false;
    this.plusclose = false;
    this.plusOpenMenu = true;
  }
  plusMenuContainer() {
    this.plusMenu = false;
    this.plusclose = false;
    this.plusOpenMenu = true;
  }
  openLogIn() {
    this.navLogin = true;
  }
  facebookLogin() {
    this.isLoading = true;

    this.authService.FacebookAuth().then(data => {
      this.isLoading = false;
    });
  }
  //SignIn Google
  googleLogin() {
    this.isLoading = true;
    this.authService.GoogleAuth().then(data => {
      this.user.Lastseen = this.now
      this.return = this.FormsService.createUserTime(this.user)
        .then(data => {
        });
      this.isLoading = false;
      window.location.reload()
    });
  }


  //Signup Google
  googleSignup() {
    this.isLoading = true;
    this.authService.GoogleAuthSignup().then(data => {
      this.user.Lastseen = this.now
      this.return = this.FormsService.createUserTime(this.user)
        .then(data => {
        });
      this.isLoading = false;
      this.initProfile()
      window.location.reload()
    });
  }



  signIn(email, pass) {
    this.isLoading = true;
    this.authService.SignIn(email, pass).then(data => {
      this.isLoading = false;
      this.user.Lastseen = this.now
      this.return = this.FormsService.createUserTime(this.user)
        .then(data => {
        });
      this.isLoading = false;
      this.initProfile()
      window.location.reload()
    });

  }



  NewUser() {
    this.newUser = true;
  }

  OldUser() {
    this.newUser = false;
  }
  newclose() {
    this.newUser = false;
    this.newUser = false;
    this.navLogin = false;
  }

  signUp(displayName, email, pass) {
    this.authService.SignUp(email, pass).then(data => {
      this.user.Name = displayName
      this.user.DOB = null
      this.user.Phone = null
      this.isLoading = true;
      this.return = this.FormsService.createUserCustomer(this.user)
        .then(data => {
          this.user.Lastseen = this.now
          this.return = this.FormsService.createUserTime(this.user)
            .then(data => {
            });
          if (this.user != null) {
            this.isLoading = false;
            this.initProfile()
            window.location.reload()
          }
          else {
            this.isLoading = false
          }
        });
    });
  }


  userNew() {
    this.user.DOB = null
    this.user.Phone = null
    this.user.displayName
    this.return = this.FormsService.createUserCustomer(this.user)
      .then(data => {

      });
  }
  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.signUp(this.name, this.email, this.password);
    }
  }
  keyDownSign(events) {
    if (events.keyCode == 13) {
      this.signIn(this.email, this.password);
    }
  }
  save() {
    this.signIn(this.email, this.password);
  }


  notificationoverlayopen() {

    if (this.notificationoverlay == false) {
      this.user = JSON.parse(sessionStorage.getItem("currentUser"));
      this.uid = this.user.uid;
      this.NotificationService.getnotifications(this.uid).subscribe((ref) => {
        ref.forEach((item) => {
          this.confirmInterests.push({ Detail: item.data(), id: item.id });
        });
      });

      this.notificationoverlay = true

    }
    else if (this.notificationoverlay == true) {
      this.notificationoverlay = false


    }

  }
  closenotifiation() {
    this.notificationoverlay = false
  }
  initProfile() {
    this.getUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (this.getUser != null) {
      this.userData = this.getUser.user;
      this.getNotification();
      this.LoggedIn()
    }

  }



  getDocid(id, propertyId, time, userId, viewed, now, Type) {
    this.HttpService.postNotification(id, time, Type, userId, now).subscribe((data) => {
      this.notificationoverlay = false
      this.getNotification()

      if (this.getUser.AgentType == "True") {
        this._router.navigate(["/Agenthome"])
      }
      else {
        this._router.navigate(["/mymatches"])
      }

      document.getElementById("custom").style.overflowY = "overlay"
    })
  }
  notificationItems() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.id;
    this.NotificationService.getnotifications(this.uid).subscribe((ref) => {
      ref.forEach((item) => {
        this.confirmInterests.push({ Detail: item.data(), id: item.id });
      });
    });
  }
  bellone() {

    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.uid = this.user.id;
    this.confirmInterests = []
    this.HttpService.getNotification().subscribe((data) => {
      data.forEach(element => {
        if (element.UserId == this.uid) {
          this.confirmInterests.push({ Detail: element, id: element.id })

          if(this.confirmInterests.length > 0 )
          {
            document.getElementById("custom").style.overflowY = "hidden"

            this.notificationoverlay = true
            this.bellicontwo = true;
          }
        }
      });

    })
  }
  belltwo() {

    this.notificationoverlay = false
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));;
    this.uid = this.user.id;
    this.confirmInterests = null
    this.HttpService.getNotification().subscribe((data) => {
      data.forEach(element => {
        if (element.UserId == this.uid) {
          document.getElementById("custom").style.overflowY = "overlay"
          this.confirmInterests = null
        }
      });

    })
    this.bellicontwo = false
  }

  signOut() {
    this._router.navigate(["/welcome"]);
    sessionStorage.removeItem("user");
    window.location.reload()
  }

  newUsers(displayName, email, pass) {
    axios
      .post('http://134.209.93.8/auth/local/register', {
        username: displayName,
        email: email,
        password: pass,
      })
      .then(response => {
        this.login(email, pass)

      })
      .catch(error => {
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



  login(username, password) {
    this.isLoading = true;

    this.StrapiAuthService.login(username, password)
      .pipe(first())
      .subscribe(
        data => {
       
            this.navLogin = false
            this.isLoading = false
            this.initProfile()
            location.reload()
            this.LoggedIn()
          

        },
        error => {
          if (error && error.error && error.error.message && error.error.message.length > 0) {
            alert(error.error.message[0].messages[0].message);
            this.isLoading = false
          }
          else {
            alert('error');
            this.isLoading = false
          }

          //this.alertService.error(error);

        });
  }
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(String(email).toLowerCase()) == true) {
      this.HttpService.getAllUsers(email).subscribe((data) => {
        this.emailData = data

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
  getAllUser(email) {
    this.HttpService.getAllUsers(email).subscribe((data) => {

      console.log(data)
    })
  }

}
