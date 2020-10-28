import { Component, OnInit } from '@angular/core';
import { flatMap } from 'rxjs/operators';
import { AgenthomeService } from "./agenthome.service";
import { AuthService } from "../auth.service"
import { AngularFireAuth } from "@angular/fire/auth";
import { HttpService } from "../http.service"
import { StrapiAuthService } from "../strapi-auth.service";
import { first } from 'rxjs/operators'
import { Router, ActivatedRoute } from "@angular/router";
import {
  VERSION,
  MatDialogRef,
  MatDialog,
  MatSnackBar,
  MAT_DIALOG_DATA,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatDialogConfig
} from "@angular/material";

import {AlertUserTypeComponent} from "../Misc/alert-user-type/alert-user-type.component"
@Component({
  selector: 'app-agenthome',
  templateUrl: './agenthome.component.html',
  styleUrls: ['./agenthome.component.css']
})
export class AgenthomeComponent implements OnInit {
  agents;

  user: any;
  uid: any;
  agentsBuyer = [];
  agentsSeller = [];
  agentNew = [];
  loggedIn: boolean = false
  signUp: any;
  password: any;
  name: any;
  email: any;
  userData: any;
  Companyname: any;
  Address: any;
  Postcode: any;
  Phonenumber: any;
  Jobtitle: any;
  SinglePercentage: any;
  Multipercentage: any;
  id: any;
  Image: any;
  BuyerDetail = [];
  emailField: boolean = false
  notValidEmail: boolean = false
  SignUp: boolean = false
  emailData;
  validity: any;
  Fullname: any;

  constructor(public AgenthomeService: AgenthomeService, public authService: AuthService, public afAuth: AngularFireAuth, public HttpService: HttpService, public StrapiAuthService: StrapiAuthService, private router: Router,private dialog: MatDialog,) { }

  ngOnInit() {
    this.userLogged()

    this.agentItem()

    this.items()



    this.HttpService.getValidityError().subscribe((validity)=>{
      this.validity = validity[0].SigininValidityError
    })


  }
  //SignIn Google
  googleLogin() {

    this.authService.GoogleAuth().then((data) => {
      this.loggedIn = true
      this.userLogged()
      this.items()
    });
  }

  //Signup Google
  googleSignup() {

    this.authService.GoogleAuthSignup().then((data) => {
      this.loggedIn = true
      this.items()
      this.userLogged()
    });
  }

  signIn(email, pass) {


    this.authService.SignIn(email, pass).then((data) => {

      this.items()

      this.userLogged()

    });
  }

  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.signUp(this.name, this.email, this.password);
    }
  }


  items() {
    this.HttpService.getdetailsToAgent().subscribe((agents) => {
      agents.forEach(agentData => {
        if (agentData.AgentUid == this.uid) {
          this.BuyerDetail.push((agentData))
        }
      });
    })


  }

  userLogged() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    if (this.user != null) {
      this.uid = this.user.id
      this.loggedIn = true
    }
  }
  agentItem() {
    this.HttpService.getAgentsProfile(this.uid).subscribe((data) => {
      console.log(this.agents)
      this.agents = data[0]
      this.Companyname = this.agents.Companyname
      this.Address = this.agents.Address
      this.Postcode = this.agents.Postcode
      this.Phonenumber = this.agents.Phonenumber
      this.Jobtitle = this.agents.Jobtitle
      this.SinglePercentage = this.agents.SinglePercentage
      this.Multipercentage = this.agents.Multipercentage
      this.id = this.agents.id
      this.Image = this.agents.Image
      this.Fullname = this.agents.Fullname

 
    })
  }
  login(username, password) {
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
        });
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(String(email).toLowerCase()) == true) {

        this.HttpService.getAllUsers(email).subscribe((data) => {
          this.emailData = data
          if (this.emailData.length == 1) 
          {
            this.emailField = true
            this.notValidEmail = false

            if (this.emailData[0].AgentType == null)
            {
    
    
              this.emailField = false
              this.notValidEmail = true
              const dialogRef = this.dialog.open(
                  AlertUserTypeComponent,
                  {
                    data: {
                      message: "Please Login as Agent",
    
                    }
                  }
              );
    
    
            }
          }
          else 
          {
            this.notValidEmail = true

          }
        })
      }

    else 
    {
        this.notValidEmail = true

      }

    }
  }
