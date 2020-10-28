import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { listingSeller } from "../../../Model/listingSeller";
import { sellerUser } from "../../../Model/sellerUser";
import { AuthService } from "../../../auth.service";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import {
  VERSION,
  MatDialogRef,
  MatDialog,
  MatSnackBar,
  MAT_DIALOG_DATA,
} from "@angular/material";
import { StateServiceService } from "./../../../state-service.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

import { Config, HttpService } from "./../../../http.service";
import { debounceTime } from "rxjs/operators";
import { switchMap } from "rxjs/operators";
import { of } from "rxjs";
import {
  NativeDateAdapter,
  DateAdapter,
  MAT_DATE_FORMATS,
} from "@angular/material";
import {
  AppDateAdapter,
  APP_DATE_FORMATS,
} from "./../../../Helper/date.adapter";
import { AltertFormDialogComponent } from "../../../Misc/alertFormdialog/alertFormdialog.component";
import { SellerformService } from "./fillFormSeller.service";
import { FormsService } from "../fillFormBuyer/fillFormBuyer.service";
import axios from 'axios';
import {StrapiAuthService}  from "../../../strapi-auth.service"
declare var $: any;
import { first } from 'rxjs/operators';
import {AlertLoginComponent}  from "../../../Misc/alert-login/alert-login.component";
import {AlertUserTypeComponent} from "../../../Misc/alert-user-type/alert-user-type.component"
import { Subscription } from 'rxjs';
import { timer } from 'rxjs'
@Component({
  selector: "app-fillFormSeller",
  templateUrl: "./fillFormSeller.component.html",
  styleUrls: ["./fillFormSeller.component.css"],
  providers: [
    {
      provide: DateAdapter,
      useClass: AppDateAdapter,
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: APP_DATE_FORMATS,
    },
  ],
})

export class FillFormSellerComponent implements OnInit {
//Field Validation

@ViewChild('titles',{static:false}) titleView
@ViewChild('Names',{static:false}) NameView : ElementRef
@ViewChild ('emails',{static:false})  emailView : ElementRef
@ViewChild ('dobs',{static:false}) dobView : ElementRef
@ViewChild ('tele',{static:false}) teleView :ElementRef
@ViewChild("currentPostcode",{static:false}) nameField: ElementRef;
@ViewChild("currentAddress",{static:false}) currentAddressView: ElementRef;
@ViewChild("currenttown",{static:false}) currenttownView: ElementRef;
@ViewChild("currentstate" ,{static:false})  currentstateView:ElementRef
@ViewChild ("propertyFor" ,{static:false}) propertyForView:ElementRef
@ViewChild ("Lookingpostcode",{static:false}) LookingpostcodeView:ElementRef
@ViewChild ("LookingAddress",{static:false})  LookingAddressView:ElementRef
@ViewChild ("LookingTown",{static:false})  LookingTownView:ElementRef
@ViewChild ("LookingState",{static:false}) LookingStateView:ElementRef
@ViewChild ("country",{static:false}) countryView:ElementRef
@ViewChild("PropertyType",{static:false}) PropertytypeView
@ViewChild ("maxrooms" ,{static:false})  maxroomsView
@ViewChild ("MaxAmount",{static:false}) MaxAmountView
@ViewChild ("onwership",{static:false}) onwershipView
@ViewChild('form', { static: false }) forms;
  public addressianAutoCompleteLooking$: Observable<any> = null;
  public autoCompleteControlLooking = new FormControl();
  public addressianAutoCompleteCurrent$: Observable<any> = null;
  public autoCompleteControlCurrent = new FormControl();
  data: any;
  isLoggedIn: Boolean = false;
  userData: any;
  config: Config;
  listingSeller: listingSeller = new listingSeller();
  sellerUser: sellerUser = new sellerUser();
  submitted = false;
  isLoading: boolean = false;
  return: any;
  version = VERSION;
  ConfirmDetailService: any;
  postcodeFormControl = new FormControl("");
  form: FormGroup;
  signatureFormGroup: any;
  result: any;
  selectedIndex = 0;
  maxNumberOfTabs = 2;
  myControl = new FormControl();

  applicable: string[] = [
    "any",
    "Garden",
    "Driveway",
    "Period Features",
    "Garage",
    "Gated Community",
    "Loft Conversion",
    "Conservatory/Sun room",
    "Granny Annexe",
    "Rear Extension"
  ];
  user: any;
  useremail: any;
  uid: any;
  name: any;
  email: any;
  password: any;
  passs: any;
  emails: any;
  boolean: boolean;
  newUser: boolean = false;
  DOB: string;
  age: any;
  userPasswordRegister: any;
  model: any = {};
  loading = false;
  returnUrl: string;
  overlay: boolean = false;
  pass: any;
  displayName: any;
  userEmailRegister: any;
  sub: any;
  Currentpostcode: any;
  Lookpostcode: string;
  Lookaddress: string;
  LookTown: string;
  Lookstate: string;
  Country: any;
  Property: any;
  Rooms: any;
  Amount: any;
  Ownership: string;
  Bathrooms: any;
  Reception: any;
  Condition: any;
  Features: any;
  Cpostcode: string;
  country: any;
  sellOption: boolean = true;
  letOption: boolean;
  filter: any;
  rent: any;
  buy: any;
  maxamounts: boolean = false;
  now: Date = new Date();
  getUser: any;
  id: any;
  postcodeService: any;
  dataItem: any;
  Name: any;
  Phone: any;
  Currentaddress: any;
  prefrence: any;
  title: any;
  CurrentAddress: any;
  CurrentTown: any;
  Currentstate: any;
  userDetails: any;
  notificationOverlay: any;
  notificationContent: any;
  emailField : boolean = false
  notValidEmail:boolean = false
  SignUp : boolean = false
  emailData;
  topLine: any;
  secondLine: any;
  validity: any;
  sellerRightImage;
  sellerRightImageUrl;
  files:any;
  imageUploaded: boolean = false
  private timer: Observable<any>;
  private subscription: Subscription
  responseStrapi: any;
  ImageUrl=[];
  requests:any;
  pictureUrls:any

  constructor(
    public authService: AuthService,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth,
    private router: Router,
    private stateService: StateServiceService,
    private sellerService: HttpService,
    private dialog: MatDialog,
    private SellerformService: SellerformService,
    private fillFormsService: FormsService,
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    public StrapiAuthService:StrapiAuthService
  ) { }

  ngOnInit() {
    this.getUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if (this.getUser != null) {

      this.userDetails = JSON.parse(localStorage.getItem("userDetail"))

      this.id = this.getUser.id
      this.userData = this.getUser.user;
      this.isLoggedIn = true;
      this.LoggedIn()

    }
    else {
      this.isLoggedIn = false;
    }
    this.sellerService.getBlueNotificationContent().subscribe((data) => {
      this.notificationOverlay = data
  
      this.notificationContent  =   this.notificationOverlay[0].SellerSignupTextNotification
    })

    this.sellerService.getRightFormImages().subscribe((RightImage)=>{
    
      this.sellerRightImage = RightImage
      this.sellerRightImageUrl = this.sellerRightImage.SellerFormRightImage.url
    })


    // The auto population of github method
    this.addressianAutoCompleteLooking$ = this.autoCompleteControlLooking.valueChanges.pipe(
      startWith(""),
      // delay emits
      debounceTime(1000),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap((value) => {
        if (value !== "") {
          this.lookup(this.listingSeller.Lookingpostcode).subscribe((data) => {
            this.data = data;
          });

          return this.lookup(this.listingSeller.Lookingpostcode);
        } else {
          return of(null);
        }
      })
    );
    // End method
    this.addressianAutoCompleteCurrent$ = this.autoCompleteControlCurrent.valueChanges.pipe(
      startWith(""),
      // delay emits
      debounceTime(1000),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap((value) => {
        if (value !== "") {
          this.lookup(this.listingSeller.Currentpostcode).subscribe((data) => {
            this.data = data;
          });

          return this.lookup(this.listingSeller.Currentpostcode);
        } else {
          return of(null);
        }
      })
    );

    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.Lookpostcode = params.get("Lookingpostcode");
      this.Lookaddress = params.get("LookingAddress");
      this.LookTown = params.get("LookingTown");
      this.Lookstate = params.get("Lookingstate");
      this.Country = params.get("Country");
      this.Property = params.get("PropertyType");
      this.Rooms = params.get("Maxrooms");
      this.Amount = params.get("MaxAmount");
      this.Ownership = params.get("ownership");
      this.Bathrooms = params.get("Maxbathrooms");
      this.Reception = params.get("Maxreception");
      this.Condition = params.get("PropertyCondition")
      this.Features = params.get("features");
      this.country = params.get("Country")

    });

    if (this.Lookpostcode != ":Lookingpostcode") {
      this.listingSeller.Lookingpostcode = this.Lookpostcode
    }
    if (this.Lookaddress != ":LookingAddress") {
      this.listingSeller.LookingAddress = this.Lookaddress
    }
    if (this.LookTown != ":LookingTown") {
      this.listingSeller.LookingTown = this.LookTown
    }
    if (this.Lookstate != ":Lookingstate") {
      this.listingSeller.Lookingstate = this.Lookstate
    }
    if (this.Country != ":Country") {
      this.listingSeller.Country = this.Country
    }
    if (this.Property != ":PropertyType") {
      this.listingSeller.PropertyType = this.Property
    }
    if (this.Rooms != ":Maxrooms") {
      this.listingSeller.Maxrooms = this.Rooms
    }
    if (this.Amount != ":MaxAmount") {
      this.listingSeller.MaxAmount = this.Amount
    }
    if (this.Ownership != ":ownership") {
      this.listingSeller.ownership = this.Ownership
    }

    if (this.country != ":Country") {
      this.listingSeller.Country = this.country
    }


    this.sellerService.getSignupUpTerms().subscribe((data)=>{
      this.topLine = data[0].TopLine
      this.secondLine = data[0].SecondSignup
    })


    this.sellerService.getValidityError().subscribe((validity)=>{
      this.validity = validity[0].SigininValidityError
    })









  }

  private LoggedIn() {
    this.getUser = JSON.parse(sessionStorage.getItem('currentUser'));

    //Pre - populate the email field
    this.sellerService.getUsers(this.getUser.id).subscribe((data) => {
      this.dataItem = data
      this.Name = this.dataItem.username,
        this.email = this.dataItem.email
      this.Phone = this.dataItem.Phone
      this.DOB = this.dataItem.dob
      this.Currentaddress = this.dataItem.Address
      this.prefrence = this.dataItem.prefrences
      this.title = this.dataItem.title
      this.Currentpostcode = this.dataItem.Currentpostcode
      this.CurrentAddress = this.dataItem.CurrentAddress
      this.CurrentTown = this.dataItem.CurrentTown
      this.Currentstate = this.dataItem.Currentstate
      this.isLoggedIn = true;
    })

  }
  private LoggedOut() {
    this.isLoggedIn = false;
  }
  newCustomer(): void {
    this.submitted = false;
    this.listingSeller = new listingSeller();
  }

  onSubmit() {
    // Get Seller variable into local scope for html
    this.stateService.listingSeller = this.listingSeller;
    this.router.navigate(["confirmSellerdetail"]);
  }
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);
  phoneFormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(10),
    Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
  ]);
  FirstnameFormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(15),
  ]);
  LastnameFormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(15),
  ]);
  EmailFormControl = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);
  AddressFormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(15),
  ]);
  TownFormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(15),
  ]);
  stateFormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(15),
  ]);

  addressnameFormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(6),
  ]);
  noroomsFormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(2),
  ]);
  DOBFormControl = new FormControl("", [Validators.required]);
  PropertyTypeFormControl = new FormControl('', [Validators.required]);

  // PropertyTypeFormControl =  new FormControl("",[Validators.required]);
  CountryFormControl = new FormControl("", [Validators.required]);
  LookingStateFormControl = new FormControl("", [Validators.required]);
  LookingTownFormControl = new FormControl("", [Validators.required]);
  LookingAddressFormControl = new FormControl("", [Validators.required]);
  LookingPostcodeFormControl = new FormControl("", [Validators.required]);
  PopertyForFormControl = new FormControl("", [Validators.required]);
  ownershipformControl = new FormControl("", [Validators.required]);
  amountformControl = new FormControl("", [Validators.required]);
  maxRoomFormControl = new FormControl("", [Validators.required]);
  TitleFormControl = new FormControl("", [
    Validators.required]);
  NameFormControl = new FormControl("", [
      Validators.required]);
      dobFormControl = new FormControl("", [
        Validators.required]);
  lookup(value): Observable<any> {
    return this.sellerService.search(value);
  }
  selectTab(nextIndex: number, presentIndex: number): void {
    var lookinpostcodelength = this.listingSeller.Lookingpostcode
    var currentposcodelength = this.Currentpostcode
    if (presentIndex == 0) {
      if (this.title == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please select title" }
        });
        this.titleView.focus()
        document.getElementById("title").style.border = "5px solid red"

      }

      else if (this.Name == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please enter valid fulll name" }
        });
        this.NameView.nativeElement.focus()
        document.getElementById("title").style.border = "None"
        document.getElementById("Name").style.border = "5px solid red"

      }
      else if (this.email == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please enter valid email" }
        });

        this.emailView.nativeElement.focus()
        document.getElementById("title").style.border = "None"
        document.getElementById("Name").style.border = "None"
        document.getElementById("email").style.border = "5px solid red"
      }
      else if (this.DOB == null) {
      const dialogRef = this.dialog.open(AltertFormDialogComponent, {
        data: { message: "Age is required" }
      });
      this.dobView.nativeElement.focus()
            document.getElementById("title").style.border = "None"
      document.getElementById("Name").style.border = "None"
      document.getElementById("email").style.border = "None"
      document.getElementById("dob").style.border = "5px solid red"
    }
      else if (Math.floor(Math.abs(Date.now() - new Date(this.DOB).getTime()) / (1000 * 3600 * 24) / 365.25)
        < 18) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Age Must be 18+" }
        });
        this.dobView.nativeElement.focus()
        document.getElementById("title").style.border = "None"
        document.getElementById("Name").style.border = "None"
        document.getElementById("email").style.border = "None"
        document.getElementById("dob").style.border = "5px solid red"
      }

      else if (this.Phone == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please enter valid phone number" }
        });
        this.teleView.nativeElement.focus()
        document.getElementById("title").style.border = "None"
        document.getElementById("Name").style.border = "None"
        document.getElementById("email").style.border = "None"
        document.getElementById("dob").style.border = "None"
        document.getElementById("tele").style.border = "5px solid red"
        
      }
      else if (this.Currentpostcode == null) {
        this.nameField.nativeElement.focus()
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please Enter Current Postcode" },
        });
        document.getElementById("title").style.border = "None"
        document.getElementById("Name").style.border = "None"
        document.getElementById("email").style.border = "None"
        document.getElementById("dob").style.border = "None"
        document.getElementById("tele").style.border = "None"
        document.getElementById("Cpost").style.border = "5px solid red"
      }
      else if (currentposcodelength.length < 5) {
        this.nameField.nativeElement.focus()
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Postcode must be atleast 5 characters long" },
        });
        document.getElementById("title").style.border = "None"
        document.getElementById("Name").style.border = "None"
        document.getElementById("email").style.border = "None"
        document.getElementById("dob").style.border = "None"
        document.getElementById("tele").style.border = "None"
        document.getElementById("Cpost").style.border = "5px solid red"
   
      }

     

      else if (this.CurrentAddress == null) {
        this.currentAddressView.nativeElement.focus()
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please Enter Your Current Address" },
        });
        document.getElementById("title").style.border = "None"
        document.getElementById("Name").style.border = "None"
        document.getElementById("email").style.border = "None"
        document.getElementById("dob").style.border = "None"
        document.getElementById("tele").style.border = "None"
        document.getElementById("Cpost").style.border = "none"
        document.getElementById("caddress").style.border = "5px solid red"
      }
      
      else if (this.CurrentTown == null)
      {
        this.currenttownView.nativeElement.focus()
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please Enter Your Current State" },
        });
        document.getElementById("title").style.border = "None"
        document.getElementById("Name").style.border = "None"
        document.getElementById("email").style.border = "None"
        document.getElementById("dob").style.border = "None"
        document.getElementById("tele").style.border = "None"
        document.getElementById("Cpost").style.border = "none"
        document.getElementById("caddress").style.border = "none"
        document.getElementById("Ctown").style.border = "5px solid red"
      }
      else if (this.Currentstate == null) {
        this.currentstateView.nativeElement.focus()
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please Enter Your Current State" },
        });
        document.getElementById("title").style.border = "None"
        document.getElementById("Name").style.border = "None"
        document.getElementById("email").style.border = "None"
        document.getElementById("dob").style.border = "None"
        document.getElementById("tele").style.border = "None"
        document.getElementById("Cpost").style.border = "none"
        document.getElementById("caddress").style.border = "none"
        document.getElementById("Ctown").style.border = "none"
        document.getElementById("cState").style.border = "5px solid red"
      }
      else {
        this.userDetail()
        this.nextStep()
        this.selectedIndex = nextIndex;

      }

    } else if (presentIndex == 1) {

      if (nextIndex > presentIndex) {
        if (this.maxamounts == false) {
          this.propertyForView.nativeElement.focus()
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please select property" },
          });
          document.getElementById("propfor").style.border = "5px solid red"
        }


        else if (this.listingSeller.Lookingpostcode == null) {
          this.LookingpostcodeView.nativeElement.focus()
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Enter Your Looking Postcodes" },
          });
          document.getElementById("propfor").style.border = "none"
          document.getElementById("lookpost").style.border = "5px solid red"
        }
        else if (lookinpostcodelength.length < 5) {
          this.LookingpostcodeView.nativeElement.focus()
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Postcode must be atleast 5 characters long" },
          });
          document.getElementById("propfor").style.border = "none"
          document.getElementById("lookpost").style.border = "5px solid red"
        }

        else if (this.listingSeller.LookingAddress == null) {
          this.LookingAddressView.nativeElement.focus()
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Enter Your Looking Address" },
          });
          document.getElementById("propfor").style.border = "none"
          document.getElementById("lookpost").style.border = "none"
          document.getElementById("lsrname").style.border = "5px solid red"
        }
        else if (this.listingSeller.LookingTown == null) {
          this.LookingTownView.nativeElement.focus()
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Enter Your Looking Town" },
          });
          document.getElementById("propfor").style.border = "none"
          document.getElementById("lookpost").style.border = "none"
          document.getElementById("lsrname").style.border = "none"
          document.getElementById("looktow").style.border = "5px solid red"
        }
        else if (this.listingSeller.Lookingstate == null) {
          this.LookingStateView.nativeElement.focus()
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Enter Your Looking State" },
          });
          document.getElementById("propfor").style.border = "none"
          document.getElementById("lookpost").style.border = "none"
          document.getElementById("lsrname").style.border = "none"
          document.getElementById("looktow").style.border = "none"
          document.getElementById("Lookstate").style.border = "5px solid red"
        }
        else if (this.listingSeller.Country == null) {
          this.countryView.nativeElement.focus()
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Enter Your Country" },
          });
          document.getElementById("propfor").style.border = "none"
          document.getElementById("lookpost").style.border = "none"
          document.getElementById("lsrname").style.border = "none"
          document.getElementById("looktow").style.border = "none"
          document.getElementById("Lookstate").style.border = "none"
          document.getElementById("lCountry").style.border = "5px solid red"
        }


        else if (this.listingSeller.PropertyType == null) {


          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Enter Your Property Type" },
          });
          this.PropertytypeView.focus();
          document.getElementById("propfor").style.border = "none"
          document.getElementById("lookpost").style.border = "none"
          document.getElementById("lsrname").style.border = "none"
          document.getElementById("looktow").style.border = "none"
          document.getElementById("Lookstate").style.border = "none"
          document.getElementById("lCountry").style.border = "none"
          document.getElementById("protype").style.border = "5px solid red"
          
        }

        else if (this.listingSeller.Maxrooms == null) {
       

          
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Select Maximum of Rooms" },
          });
          this.maxroomsView.focus()
          document.getElementById("propfor").style.border = "none"
          document.getElementById("lookpost").style.border = "none"
          document.getElementById("lsrname").style.border = "none"
          document.getElementById("looktow").style.border = "none"
          document.getElementById("Lookstate").style.border = "none"
          document.getElementById("lCountry").style.border = "none"
          document.getElementById("protype").style.border = "none"
          document.getElementById("bedroom").style.border = "5px solid red"
        }


        else if (this.listingSeller.MaxAmount == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Select Maximum Amount" },
          });
          this.MaxAmountView.focus()
          document.getElementById("propfor").style.border = "none"
          document.getElementById("lookpost").style.border = "none"
          document.getElementById("lsrname").style.border = "none"
          document.getElementById("looktow").style.border = "none"
          document.getElementById("Lookstate").style.border = "none"
          document.getElementById("lCountry").style.border = "none"
          document.getElementById("protype").style.border = "none"
          document.getElementById("bedroom").style.border = "none"
          document.getElementById("maxamount").style.border = "5px solid red"
        }

        else if (this.listingSeller.ownership == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Select Ownership" },
          });
          this.onwershipView.focus()
          document.getElementById("propfor").style.border = "none"
          document.getElementById("lookpost").style.border = "none"
          document.getElementById("lsrname").style.border = "none"
          document.getElementById("looktow").style.border = "none"
          document.getElementById("Lookstate").style.border = "none"
          document.getElementById("lCountry").style.border = "none"
          document.getElementById("protype").style.border = "none"
          document.getElementById("bedroom").style.border = "none"
          document.getElementById("maxamount").style.border = "none"
          document.getElementById("owner").style.border = "5px solid red"
        }

        else {

          this.onSubmit()

        }

      }

    }

  }

  // getPosts(value) {
  //   this.listingSeller.CurrentAddress = value.address;
  //   this.listingSeller.CurrentTown = value.citytown;
  //   this.listingSeller.Currentstate = value.county;
  //   this.listingSeller.Currentpostcode = value.postcode;
  //   console.log(value);
  // }
  getPost(value) {
    this.listingSeller.LookingTown = value.citytown;
    this.listingSeller.Lookingstate = value.county;
    this.listingSeller.Lookingpostcode = value.postcode;
    this.listingSeller.LookingAddress = value.address;
 
  }
  getSame(listingSeller) {
    this.listingSeller.LookingTown = this.CurrentTown;
    this.listingSeller.Lookingstate = this.Currentstate;
    this.listingSeller.Lookingpostcode = this.Currentpostcode;
    this.listingSeller.LookingStreetname = this.CurrentTown;
    this.listingSeller.LookingAddress = this.CurrentAddress;
  }


  openAlertDialog() {
    const dialogRef = this.dialog.open(AltertFormDialogComponent, {
      data: {
        message: "HelloWorld",
        buttonText: {
          cancel: "Done",
        },
      },
    });
  }
  userDetail() {
    this.isLoading = true
    this.sellerService.addUsersSellerDetails(this.id, this.Name, this.email, this.Phone, this.DOB, this.title, this.Currentpostcode, this.CurrentAddress, this.CurrentTown, this.Currentstate).subscribe((data) => {
      this.isLoading = false
      localStorage.setItem("userDetail", JSON.stringify(data))

    });


  }





  //Login Form


  facebookLogin() {
    this.isLoading = true;
    this.authService.FacebookAuth().then((data) => {
      this.isLoading = false;
    });
  }

  //SignIn Google
  googleLogin() {
    this.isLoading = true;
    this.authService.GoogleAuth().then((data) => {
      this.user.Lastseen = this.now
      this.return = this.fillFormsService.createUserTime(this.user)
        .then(data => {
        });
      this.isLoading = false;
    });
  }

  //Signup Google
  googleSignup() {
    this.isLoading = true;
    this.authService.GoogleAuthSignup().then((data) => {
      //this.user.Lastseen = this.now
      // this.return = this.fillFormsService.createUserTime(this.user)
      //   .then(data => {
      //   });
      this.isLoading = false;
    });
  }

  signIn(email, pass) {
    this.isLoading = true;
    this.authService.SignIn(email, pass).then((data) => {
      this.isLoading = false;
      //this.user.Lastseen = this.now

      // this.return = this.fillFormsService.createUserTime(this.user)
      //   .then(data => {
      //   });
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
    this.authService.SignUp(email, pass).then((data) => {
      this.isLoggedIn = false;
      this.isLoading = false;
      this.user.Name = displayName;
      this.user.DOB = null;
      this.user.Phone = null;
      this.return = this.fillFormsService.createUserCustomer(this.user).then(
        (user) => {
          this.isLoggedIn = false;
          if (this.user != null) {
            this.user.Lastseen = this.now
            this.return = this.fillFormsService.createUserTime(this.user)
              .then(data => {
              });
            this.isLoading = false;
            this.overlay = true;
          }
        }
      );
    });
  }

  userNew() {
    this.user.DOB = null;
    this.user.Phone = null;
    this.user.name;
    this.return = this.fillFormsService.createUserCustomer(this.user).then(
      (data) => {
        console.log(data);
      }
    );
  }
  continueClose() {


    location.reload()
    this.overlay = false;
    this.isLoggedIn = true;
    this.isLoading = true
  }

  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.signUp(this.name, this.email, this.password);
    }
  }

  saves() {

    this.signIn(this.emails, this.passs);
  }
  radioChange(event) {
    this.filter = event.value;
    if (this.filter == "buy") {
      this.maxamounts = true
      this.letOption = false
      this.sellOption = true
    }
    if (this.filter == "rent") {
      this.maxamounts = true
      this.sellOption = false;
      this.letOption = true
    }
  }
  public previousStep() {
    this.selectedIndex -= 1;
  }
  public nextStep() {
    this.selectedIndex += 1;

  }
  newUsers(displayName, email, pass) {
    axios
      .post('http://134.209.93.8/auth/local/register', {
        username: displayName,
        email: email,
        password: pass,
      })
      .then(response => {

        this.loginNew(email, pass)
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


  login(username, password) {


    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //     return;
    // }


    this.StrapiAuthService.login(username,password)
        .pipe(first())
        .subscribe(
            data => {
            
              location.reload()
         this.LoggedIn()

          
            },
            error => {
              if (error && error.error && error.error.message && error.error.message.length > 0) {
                alert(error.error.message[0].messages[0].message);
              }
              else 
              {
                alert('error');
              }
              
              //this.alertService.error(error);
        
            });
}
loginNew(username, password) {


  // stop here if form is invalid
  // if (this.loginForm.invalid) {
  //     return;
  // }


  this.StrapiAuthService.login(username,password)
      .pipe(first())
      .subscribe(
          data => {
    
this.overlay = true;
          },
          error => {
            if (error && error.error && error.error.message && error.error.message.length > 0) {
              alert(error.error.message[0].messages[0].message);
            }
            else 
            {
              alert('error');
            }
            
            //this.alertService.error(error);
      
          });
}
editName() : void
{
  this.nameField.nativeElement.focus()
}
validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(re.test(String(email).toLowerCase()) == true)
  {
    this.sellerService.getAllUsers(email).subscribe((data)=>{
      console.log(data)
      this.emailData = data
   
      if(this.emailData.length == 1)
{
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
else
{
this.notValidEmail = true

}

    });
 
  }
  else
  {
    this.notValidEmail = true

  }


}
alreadyUser()
{
  this.SignUp = false
}
newCustomeer()
{
  this.SignUp = true

}

//Image Upload
UploadImage() {
  const formElement = this.forms.nativeElement
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
    this.ImageUrl = this.responseStrapi
    this.imageUploaded = true
    this.pictureUrls = this.requests.response
    localStorage.setItem('uploadedImage', JSON.stringify(this.requests.response));

   
  });
}
 RemoveImage()
  {

    this.files = null
  }
}
