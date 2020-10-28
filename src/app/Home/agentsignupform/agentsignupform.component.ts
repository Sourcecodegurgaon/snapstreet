import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from "../../auth.service";
import { agentSignup } from '../../Model/agentSignup';
import { AlertDialogAgentComponent } from "./alertDialogagent.component";
import { MatDialog } from "@angular/material";
import { from, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import axios from 'axios';
import { StrapiAuthService } from "../../strapi-auth.service";
import { first } from 'rxjs/operators';
import { HttpService } from "../../http.service";
import { Subscription } from 'rxjs';
import { timer } from 'rxjs'
import { AlertLoginComponent } from "../../Misc/alert-login/alert-login.component"
import { AgenthttpService } from "./agenthttp.service"

@Component({
  selector: 'app-agentsignupform',
  templateUrl: './agentsignupform.component.html',
  styleUrls: ['./agentsignupform.component.css']
})

export class AgentsignupformComponent implements OnInit {
  @ViewChild('form', { static: false }) form;

  @ViewChild('Names', { static: false }) NameView: ElementRef
  @ViewChild('Company', { static: false }) CompanyView: ElementRef
  @ViewChild('postcodes', { static: false }) PostcodeView: ElementRef
  @ViewChild('Address', { static: false }) AddressView: ElementRef
  @ViewChild('Jobs', { static: false }) JobView: ElementRef
  @ViewChild('Phone', { static: false }) PhoneView: ElementRef
  @ViewChild('Emails', { static: false }) EmailView: ElementRef
  @ViewChild('Password', { static: false }) PasswordView: ElementRef
  @ViewChild('Sole', { static: false }) SoleView: ElementRef
  @ViewChild('MultiFees', { static: false }) MultiFeesView: ElementRef
  @ViewChild('file', { static: false }) FileView: ElementRef


  loggedIn: boolean = true
  userData: any;
  isLoading: boolean = false
  isRegister : boolean = false
  return: any;
  user: any;
  uid: any;
  newUser: boolean = true
  agentSignup: agentSignup = new agentSignup();
  users: any;
  ref: any;
  bytesTransferred: any
  uploadProgress: Observable<number>;
  image: any;
  hide = true;
  Type: string;
  verified: boolean = false;
  basePath = '/images';                       //  <<<<<<<
  downloadableURL: any;                      //  <<<<<<<
  task: any
  name: any;
  Name: any;
  filed: any;
  filles: any;
  requests;
  formsData: FormData;
  responseStrapi: any;
  userid: any;
  disable: boolean = false
  emailField: boolean = false
  notValidEmail: boolean = false
  SignUp: boolean = false

  //Forms variable
  fullname: any;
  company;
  postcode;
  address;
  jobtitle;
  phone;
  email;
  password;
  solefees;
  multiplefees;
  files:any;
  imageUploaded: boolean = false
  private timer: Observable<any>;
  private subscription: Subscription
  AgentCheck;
  ImageUrl: any;
  status: string;


  constructor(public authService: AuthService,
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    public StrapiAuthService: StrapiAuthService,
    public HttpService: HttpService,
    public AgenthttpService: AgenthttpService

  ) { }

  ngOnInit() {


  }



  Validation() {

    if (this.fullname == null) {
      const dialogRef = this.dialog.open(AlertLoginComponent, {
        data: { message: "Enter Full Name" }
      });
      this.NameView.nativeElement.focus()
      document.getElementById("FullName").style.color="red"

    }

    else if (this.company == null) {
      const dialogRef = this.dialog.open(AlertLoginComponent, {
        data: { message: "Enter Company Name" }
      });
      this.CompanyView.nativeElement.focus()
      document.getElementById("FullName").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("CompanyName").style.color = "red"

    }
    else if (this.postcode == null) {
      const dialogRef = this.dialog.open(AlertLoginComponent, {
        data: { message: "Enter Postcode" }
      });
      this.PostcodeView.nativeElement.focus()
      document.getElementById("FullName").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("CompanyName").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Postcode").style.color = "red"

    }
    else if (this.address == null) {
      const dialogRef = this.dialog.open(AlertLoginComponent, {
        data: { message: "Enter Address" }
      });
      this.AddressView.nativeElement.focus()
      document.getElementById("FullName").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("CompanyName").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Postcode").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Address").style.color = "red"

    }
    else if (this.jobtitle == null) {
      const dialogRef = this.dialog.open(AlertLoginComponent, {
        data: { message: "Enter Job Titile" }
      });
      this.JobView.nativeElement.focus()
      document.getElementById("FullName").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("CompanyName").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Postcode").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Address").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Job").style.color = "red"
    }
    else if (this.phone == null) {
      const dialogRef = this.dialog.open(AlertLoginComponent, {
        data: { message: "Enter Phone Number" }
      });
      this.PhoneView.nativeElement.focus()
      document.getElementById("FullName").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("CompanyName").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Postcode").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Address").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Job").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Number").style.color = "red"

    }
    else if (this.email == null) {
      const dialogRef = this.dialog.open(AlertLoginComponent, {
        data: { message: "Enter Email" }
      });
      this.EmailView.nativeElement.focus()
      document.getElementById("FullName").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("CompanyName").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Postcode").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Address").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Job").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Number").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Email").style.color = "red"

    }
    else if (this.password == null) {
      const dialogRef = this.dialog.open(AlertLoginComponent, {
        data: { message: "Enter Password" }
      });
      this.PasswordView.nativeElement.focus()
      document.getElementById("FullName").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("CompanyName").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Postcode").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Address").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Job").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Number").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Email").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Password").style.color = "red"


    }
    else if (this.solefees == null) {
      const dialogRef = this.dialog.open(AlertLoginComponent, {
        data: { message: "Enter Sole Agency Fees" }
      });
      this.SoleView.nativeElement.focus()
      document.getElementById("FullName").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("CompanyName").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Postcode").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Address").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Job").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Number").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Email").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Password").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Soleagency").style.color = "red"


    }
    else if (this.multiplefees == null) {
      const dialogRef = this.dialog.open(AlertLoginComponent, {
        data: { message: "Enter Multiple Agency Fees" }
      });
      this.MultiFeesView.nativeElement.focus()
      document.getElementById("FullName").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("CompanyName").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Postcode").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Address").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Job").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Number").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Email").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Password").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Soleagency").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Multiagency").style.color = "red"
    }
    else if (this.files == null) {
      const dialogRef = this.dialog.open(AlertLoginComponent, {
        data: { message: "Upload Image" }
      });
      this.FileView.nativeElement.focus()


      document.getElementById("FullName").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("CompanyName").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Postcode").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Address").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Job").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Number").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Email").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Password").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Soleagency").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Multiagency").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Image").style.color = "red"

    }
    else {
      document.getElementById("FullName").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("CompanyName").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Postcode").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Address").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Job").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Number").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Email").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Password").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Soleagency").style.color = "var(--DARK-BLUE-COLOR)"
      document.getElementById("Multiagency").style.color = "var(--DARK-BLUE-COLOR)"

      this.registerNewUser(this.fullname, this.company, this.postcode, this.address, this.jobtitle, this.phone, this.email, this.password, this.solefees, this.multiplefees)
    }














  }




  registerNewUser(fullname, company, postcode, address, jobtitle, phone, email, password, solefees, multiplefees) {
    this.isRegister = true
    axios.post('http://134.209.93.8/auth/local/register', { username: email, email: email, password: password })
      .then(response => {
        this.status= "Creating Account"
        // Test if response status not equal to 200 Then It will show catch error
        if (response.status == 200) {
          this.userid = response.data.user.id
          // Test User Id Not Null
          if (this.userid != null) {
            this.status= "Adding User Detail"
            this.AgenthttpService.userTypeAgent(this.userid, 'True',fullname).subscribe((agent) => {
              this.AgentCheck = agent
              // Test If user Agent Type True succesfully written 
              if (this.AgentCheck.AgentType == "True") {
                this.status= "Login"
                this.responseStrapi = JSON.parse(this.requests.response)
                this.AgenthttpService.AgentDetails(fullname, email, phone, solefees, multiplefees, postcode, company, address, jobtitle, this.userid, this.responseStrapi[0].url).subscribe((agentsData) => {
                  // Once details are filled, agent automatically logs in
                  this.login(email, password)
                  this.isRegister = false

                })
              }


            })
          }

        }
      })
      .catch(error => {
        if(error.response.data.message[0].messages[0].message == "Username already taken" ){
          const dialogRef = this.dialog.open(
            AlertLoginComponent,
            {
              data: {
                message: "Email already taken",
              }
            }
          );
          this.isRegister = false
        }
        else{
          const dialogRef = this.dialog.open(
            AlertLoginComponent,
            {
              data: {
                message: error.response.data.message[0].messages[0].message,
              }
            }
          );
          this.isRegister = false

        }
        
      });
  }

  //User Login Function
  login(username, password) {
    this.StrapiAuthService.login(username, password)
      .pipe(first())
      .subscribe(
        data => {
          this.isRegister = false
          this.router.navigate(["/Agenthome"])
            .then(() => {
              window.location.reload();
            });
        },
        error => {
          if (error && error.error && error.error.message && error.error.message.length > 0) {
            alert(error.error.message[0].messages[0].message);
            this.isRegister = false
          }
          else {
            alert('error');
            this.isRegister = false

          }
        });
  }


  //Image Upload
  UploadImage() {
    const formElement = this.form.nativeElement
    formElement.addEventListener('submit', e => {
      e.preventDefault();
      const request = new XMLHttpRequest();
      this.requests = request
      request.open('post', 'http://134.209.93.8/upload');
      request.send(new FormData(formElement));
    });
    this.setTimer()
  }

  //Image Upload Loader
  setTimer() {
    // set showloader to true to show loading div on view
    this.isLoading = true;
    this.timer = timer(10000); // 5000 millisecond means 5 seconds
    this.subscription = this.timer.subscribe(() => {
      // set showloader to false to hide loading div from view after 5 seconds
      this.isLoading = false;
      this.responseStrapi = JSON.parse(this.requests.response)
      this.ImageUrl = this.responseStrapi[0].url
      this.imageUploaded = true
    });
  }
 
  RemoveImage()
  {
    this.imageUploaded = false
    this.files = null
  }


}
