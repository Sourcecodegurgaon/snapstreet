import {
  Component,
  ViewChild,
  OnInit,
  Inject,
  ElementRef,
  PLATFORM_ID
} from "@angular/core";
import { AuthService } from "./../../../auth.service";
import { listingBuyer } from "../../../Model/listingBuyer";
import { user } from "../../../Model/user";
import { FormsService } from "./fillFormBuyer.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { FormControl, Validators, FormGroup } from "@angular/forms";
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
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { StateServiceService } from "../../../state-service.service";
import { Observable, onErrorResumeNext } from "rxjs";
import { map, startWith, take, ignoreElements } from "rxjs/operators";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Config, HttpService } from "../../../http.service";
declare var $: any;
import { debounceTime } from "rxjs/operators";
import { switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { NgModel } from "@angular/forms";
import { FormArray, FormBuilder } from "@angular/forms";
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
import { AlertDialogBuyerDataSubmissionComponent } from './alertDialogBuyerDataSubmission.component'
import { notification } from '../../../Model/notification';
import axios from 'axios';
import { StrapiAuthService } from "../../../strapi-auth.service"
declare var $: any;
import { first } from 'rxjs/operators';
import { Location } from "@angular/common";
import { isPlatformBrowser } from '@angular/common';
import { AlertLoginComponent } from "../../../Misc/alert-login/alert-login.component";
import { AlertUserTypeComponent } from "../../../Misc/alert-user-type/alert-user-type.component"
import { Subscription } from 'rxjs';
import { timer } from 'rxjs'
@Component({
  selector: "app-fillFormBuyer",
  templateUrl: "./fillFormBuyer.component.html",
  styleUrls: ["./fillFormBuyer.component.css"],
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
}
)
export class FillFormBuyerComponent implements OnInit {

  @ViewChild('titles', { static: false }) titleView
  @ViewChild('Names', { static: false }) NameView: ElementRef
  @ViewChild('emails', { static: false }) emailView: ElementRef
  @ViewChild('dobs', { static: false }) dobView: ElementRef
  @ViewChild('tele', { static: false }) teleView: ElementRef
  @ViewChild('Currentpostcode', { static: false }) CurrentpostcodeView: ElementRef
  @ViewChild('currentTown', { static: false }) CurrentTownView: ElementRef
  @ViewChild('CurrentAddress', { static: false }) CurrentAddressView: ElementRef
  @ViewChild('Currentstate', { static: false }) CurrentstateView: ElementRef
  @ViewChild('Currentcountry', { static: false }) CurrentcountryView: ElementRef
  @ViewChild('Lookingpostcode', { static: false }) LookingpostcodeView: ElementRef
  @ViewChild('LookingStreetname', { static: false }) LookingStreetnameView: ElementRef
  @ViewChild('LookingTown', { static: false }) LookingTownView: ElementRef
  @ViewChild('Lookingstate', { static: false }) LookingstateView: ElementRef
  @ViewChild('Country', { static: false }) CountryView: ElementRef
  @ViewChild('ChainStatus', { static: false }) ChainStatusView
  @ViewChild('FinancialPosition', { static: false }) FinancialPositionView
  @ViewChild('PropertyType', { static: false }) PropertyTypeView
  @ViewChild('Roommins', { static: false }) RoomminView
  @ViewChild('Roomsmaxs', { static: false }) RoomsmaxView
  @ViewChild('MinAmount', { static: false }) MinAmountView
  @ViewChild('MaxAmount', { static: false }) MaxAmountView
  @ViewChild('Validity', { static: false }) ValidityView: ElementRef


  public addressianAutoCompleteLooking$: Observable<any> = null;
  public addressianAutoCompleteCurrent$: Observable<any> = null;


  data: any;
  isLoggedIn: Boolean = false;
  userData: any;
  config: Config;
  listingBuyer: listingBuyer = new listingBuyer();
  notification: notification = new notification()
  buyerUser: user = new user();
  submitted = false;
  DatafieldsService: any;
  financial: any[];
  links = ["First", "Second", "Third"];
  activeLink = this.links[0];
  background = "";
  selectedIndex = 0;
  maxNumberOfTabs = 2;
  isLoading: boolean = false;
  return: any;
  obj: any;
  version = VERSION;
  form: FormGroup;
  signatureFormGroup: any;
  myControl = new FormControl();
  result: any;
  interestFormGroup: FormGroup;
  interests: any;
  selected: any;
  $scope: any;
  years: any[];
  selectedYears: any[];
  Condition = new FormControl();
  ConditionsList: string[] = ["any", "Garden", "Driveway", "Period Features", "Garage", "Gated Community", "Loft Conversion", "Conservatory/Sun room", "Granny Annexe", "Rear Extension"];
  registerForm: FormGroup;
  user: any;
  useremail: any;
  DOB: string;
  age: any;
  uid: any;
  Name: any;
  users: any;
  other: boolean = false;
  finanacial: boolean = false;
  overlay: boolean = false;
  postcodeCoordinates: any;
  message: string = ""
  cancelButtonText = "Cancel"
  now: Date = new Date();
  name: any;
  email: any;
  password: any;
  passs: any;
  emails: any;
  newUser: boolean = false;
  sub: any;
  Cpostcode: string;
  Ctown: any;
  Cstate: string;
  Ccountry: any;
  Lpostcode: string;
  Lstreetname: string;
  Ltown: any;
  Lstate: any;
  Lcountry: string;
  Financial: any;
  radius: any;
  Type: any;
  Minroom: any;
  Maxroom: string;
  AmountMin: string;
  amountmax: any;
  offer: any;
  bathroommin: string;
  bathroommax: string;
  receptionmin: string;
  receptionmax: string;
  condition: string;
  ownership: string;
  Caddress: any;
  buyOption: boolean = false;
  rentOption: boolean;
  rent: any;
  buy: any;
  filter: any;
  amounts: boolean = false;
  getUser: any;
  dataItem;
  Phone: any;
  Currentaddress: any;
  prefrence: any;
  title: any;
  id: any;
  features = "any"
  notificationOverlay: Object;
  notificationContent: any;
  emailField: boolean = false
  notValidEmail: boolean = false
  SignUp: boolean = false
  emailData;
  topLine: any;
  secondLine: any;
  validity: any;
  userid: any;
  buyerRightImage;
  buyerRightImageUrl;
  files:any;
  imageUploaded: boolean = false
  private timer: Observable<any>;
  private subscription: Subscription
  responseStrapi: any;
  ImageUrl=[];
  requests:any;


  constructor(
    public authService: AuthService,
    public afs: AngularFirestore, // Inject Firestore service
    private fillFormsService: FormsService,
    private firestore: AngularFirestore,
    public afAuth: AngularFireAuth,
    db: AngularFirestore,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateServiceService,
    private postcodeService: HttpService,
    private formBuilder: FormBuilder,
    public fb: FormBuilder,
    public StrapiAuthService: StrapiAuthService,
    public _location: Location,

  ) {
  }

  ngOnInit() {
    this.getUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if (this.getUser != null) {
      this.id = this.getUser.id
      this.isLoggedIn = true;
      this.LoggedIn()

    }
    else {
      this.isLoggedIn = false;
    }

    this.postcodeService.getBlueNotificationContent().subscribe((data) => {
      this.notificationOverlay = data
      this.notificationContent = this.notificationOverlay[0].BuyerSignUpNotification
    })
    this.postcodeService.getSignupUpTerms().subscribe((data) => {
      this.topLine = data[0].TopLine
      this.secondLine = data[0].SecondSignup
    })

    this.postcodeService.getRightFormImages().subscribe((RightImage)=>{
    
      this.buyerRightImage = RightImage
      this.buyerRightImageUrl = this.buyerRightImage.BuyerFormRightImage.url
 
    })






    this.addressianAutoCompleteLooking$ = this.autoCompleteControlLooking.valueChanges.pipe(
      startWith(""),
      // delay emits
      debounceTime(1000),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap((value) => {
        if (value !== "") {
          this.lookup(this.listingBuyer.Lookingpostcode).subscribe((data) => {
            this.data = data;
          });

          return this.lookup(this.listingBuyer.Lookingpostcode);
        } else {
          return of(null);
        }
      })
    );

    // The auto population of github method
    this.addressianAutoCompleteCurrent$ = this.autoCompleteControlCurrent.valueChanges.pipe(
      startWith(""),
      // delay emits
      debounceTime(1000),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap((value) => {
        if (value !== "") {
          this.lookup(this.listingBuyer.Currentpostcode).subscribe((data) => {
            this.data = data;
          });

          return this.lookup(this.listingBuyer.Currentpostcode);
        } else {
          return of(null);
        }
      })
    );

    this.sub = this.route.paramMap.subscribe((params) => {
      this.Cpostcode = params.get("Currentpostcode");
      this.Ctown = params.get("CurrentTown");
      this.Cstate = params.get("Currentstate");
      this.Ccountry = params.get("Currentcountry");
      this.Lpostcode = params.get("Lookingpostcode");
      this.Lstreetname = params.get("LookingStreetname");
      this.Ltown = params.get("LookingTown");
      this.Lstate = params.get("Lookingstate");
      this.Lcountry = params.get("Country");
      this.Financial = params.get("FinancialPosition");
      //this.Type = params.get("PropertyType");
      this.Minroom = params.get("Roommin");
      this.Maxroom = params.get("Roomsmax");
      this.AmountMin = params.get("MinAmount");
      this.amountmax = params.get("MaxAmount");
      this.offer = params.get("Validity");
      this.bathroommin = params.get("Minbathroom");
      this.bathroommax = params.get("Maxbathroom");
      this.receptionmin = params.get("Minreception");
      this.receptionmax = params.get("Maxreception");
      this.condition = params.get("Conditions");
      this.ownership = params.get("Ownership");
      this.Caddress = params.get("CurrentAddress");
    });

    if (this.Cpostcode != ":Currentpostcode") {
      this.listingBuyer.Currentpostcode = this.Cpostcode
    }
    if (this.Ctown != ":CurrentTown") {
      this.listingBuyer.CurrentTown = this.Ctown
    }
    if (this.Cstate != ":Currentstate") {
      this.listingBuyer.Currentstate = this.Cstate
    }
    if (this.Ccountry != ":Currentcountry") {
      this.listingBuyer.Currentcountry = this.Ccountry
    }
    if (this.Lpostcode != ":Lookingpostcode") {
      this.listingBuyer.Lookingpostcode = this.Lpostcode
    }
    if (this.Lstreetname != ":LookingStreetname") {
      this.listingBuyer.LookingStreetname = this.Lstreetname
    }
    if (this.Ltown != ":LookingTown") {
      this.listingBuyer.LookingTown = this.Ltown
    }
    if (this.Lstate != ":Lookingstate") {
      this.listingBuyer.Lookingstate = this.Lstate
    }
    if (this.Lcountry != ":Country") {
      this.listingBuyer.Country = this.Lcountry
    }
    if (this.Financial != ":FinancialPosition") {
      this.listingBuyer.FinancialPosition = this.Financial
    }
    // if (this.Type != ":PropertyType") {
    //   this.listingBuyer.PropertyType = this.Type
    // }
    if (this.Minroom != ":Roommin") {
      this.listingBuyer.Roommin = this.Minroom
    }
    if (this.Maxroom != ":Roomsmax") {
      this.listingBuyer.Roomsmax = this.Maxroom
    }
    if (this.AmountMin != ":MinAmount") {
      this.listingBuyer.MinAmount = this.AmountMin
    }
    if (this.amountmax != ":MaxAmount") {
      this.listingBuyer.MaxAmount = this.amountmax
    }
    if (this.offer != ":Validity") {
      this.listingBuyer.Validity = this.offer
    }
    if (this.Caddress != ":CurrentAddress") {
      this.listingBuyer.CurrentAddress = this.Caddress
    }

  }

  private LoggedIn() {
    this.isLoggedIn = true;
    //Pre - populate the email field
    this.postcodeService.getUsers(this.getUser.id).subscribe((data) => {
      this.dataItem = data
      this.Name = this.dataItem.FullName,
      this.email = this.dataItem.email
      this.Phone = this.dataItem.Phone
      this.DOB = this.dataItem.dob
      this.Currentaddress = this.dataItem.Address
      this.prefrence = this.dataItem.prefrences
      this.title = this.dataItem.title
    })


    this.postcodeService.getSignupUpTerms().subscribe((data) => {
      this.topLine = data[0].TopLine
      this.secondLine = data[0].SecondSignup
    })


    this.postcodeService.getValidityError().subscribe((validity) => {
      this.validity = validity[0].SigininValidityError
    })



  }


  newCustomer(): void {
    this.submitted = false;
    this.listingBuyer = new listingBuyer();
  }

  autoCompleteControlLooking = new FormControl("", [
    Validators.required,
  ]);
  autoCompleteControlCurrent = new FormControl("", [
    Validators.required]);







  lookup(value): Observable<any> {
    return this.postcodeService.search(value);
  }

  getPost(value) {
    this.listingBuyer.CurrentAddress = value.address;
    this.listingBuyer.CurrentTown = value.citytown;
    this.listingBuyer.Currentstate = value.county;
    this.listingBuyer.Currentpostcode = value.postcode;
    console.log(value);
  }

  getPosts(value) {
    //this.listingBuyer.LookingTown = value.citytown;
    this.listingBuyer.Lookingstate = value.county;
    this.listingBuyer.Lookingpostcode = value.postcode;
    this.listingBuyer.LookingStreetname = value.address[2];
    console.log(value);
  }

  selectTab(nextIndex: number, presentIndex: number): void {
    var postcodeLength = this.listingBuyer.Currentpostcode
    var lookingPostcodeLength = this.listingBuyer.Lookingpostcode
    if (presentIndex == 0) {


      if (this.title == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please select title" }
        });
        this.titleView.focus()
        document.getElementById("title").style.color = "red"

      }

      else if (this.Name == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please enter valid fulll name" }
        });
        this.NameView.nativeElement.focus()
        document.getElementById("title").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("Name").style.color = "red"

      }
      else if (this.email == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please enter valid email" }
        });

        this.emailView.nativeElement.focus()
        document.getElementById("title").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("Name").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("email").style.color = "red"
      }
      else if (this.DOB == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Age is required" }
        });
        this.dobView.nativeElement.focus()
        document.getElementById("title").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("Name").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("email").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("dob").style.color = "red"
      }
      else if (Math.floor(Math.abs(Date.now() - new Date(this.DOB).getTime()) / (1000 * 3600 * 24) / 365.25)
        < 18) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Age Must be 18+" }
        });
        this.dobView.nativeElement.focus()
        document.getElementById("title").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("Name").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("email").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("dob").style.color = "red"
      }

      else if (this.Phone == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please enter valid phone number" }
        });
        this.teleView.nativeElement.focus()
        document.getElementById("title").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("Name").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("email").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("dob").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("tele").style.color = "red"

      }

      else if (this.listingBuyer.Currentpostcode == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please fill Current Postcode" }
        });
        this.CurrentpostcodeView.nativeElement.focus()
        document.getElementById("title").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("Name").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("email").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("dob").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("tele").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("Cpost").style.color = "red"
      }

      else if (postcodeLength.length < 5) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Postcode must be atleast 5 characters long" }
        });
        this.CurrentpostcodeView.nativeElement.focus()
        document.getElementById("title").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("Name").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("email").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("dob").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("tele").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("Cpost").style.color = "red"
      }
      else if (this.listingBuyer.CurrentTown == null && this.listingBuyer.Currentpostcode != null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please fill Current Town" }
        });
        this.CurrentTownView.nativeElement.focus()
        document.getElementById("title").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("Name").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("email").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("dob").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("tele").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("Ctown").style.color = "red"
        document.getElementById("Cpost").style.color = "var(--DARK-BLUE-COLOR)"

      }

      else if (this.listingBuyer.CurrentAddress == null && this.listingBuyer.CurrentTown != null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please fill Current Address" }
        });
        this.CurrentAddressView.nativeElement.focus()
        document.getElementById("title").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("Name").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("email").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("dob").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("tele").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("Ctown").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("Cpost").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("caddress").style.color = "red"

      }
      else if (this.listingBuyer.Currentstate == null && this.listingBuyer.CurrentAddress != null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please fill Current Sate" }
        });
        this.CurrentstateView.nativeElement.focus()
        document.getElementById("title").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("Name").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("email").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("dob").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("tele").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("Ctown").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("Cpost").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("caddress").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("cState").style.color = "red"


      }
      else if (this.listingBuyer.Currentcountry == null && this.listingBuyer.Currentstate != null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please fill Current Country" }
        });
        this.CurrentcountryView.nativeElement.focus()
        document.getElementById("title").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("Name").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("email").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("dob").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("tele").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("Ctown").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("Cpost").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("caddress").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("cState").style.color = "var(--DARK-BLUE-COLOR)"
        document.getElementById("ccountry").style.color = "red"
      }

      else {
        this.userDetail();
        this.nextStep()
        this.selectedIndex = nextIndex;
      }
    }


    else if (presentIndex == 1) {
      if (nextIndex > presentIndex) {

        if (this.listingBuyer.MinAmount != null && this.listingBuyer.MaxAmount != null) {
          var Min = parseInt(this.listingBuyer.MinAmount.replace(/,/g, ""))
          var Max = parseInt(this.listingBuyer.MaxAmount.replace(/,/g, ""));
        }

        if (this.amounts == false && this.listingBuyer.Currentcountry != null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please select propertyFor " }
          });

          document.getElementById("propfor").style.color = "red"

        }

        else if (this.listingBuyer.Lookingpostcode == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Enter Postcode" }
          });
          this.LookingpostcodeView.nativeElement.focus()
          document.getElementById("propfor").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lookpost").style.color = "red"

        }

        else if (lookingPostcodeLength.length < 5) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Postcode must be atleast 5 characters long" }
          });
          this.LookingpostcodeView.nativeElement.focus()
          document.getElementById("propfor").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lookpost").style.color = "red"

        }
        else if (this.listingBuyer.LookingStreetname == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Enter Streetname" }
          });
          this.LookingStreetnameView.nativeElement.focus()
          document.getElementById("propfor").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lookpost").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lsrname").style.color = "red"


        }

        else if (this.listingBuyer.LookingTown == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Enter Town" }
          });
          this.LookingTownView.nativeElement.focus()
          document.getElementById("propfor").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lookpost").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lsrname").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("looktow").style.color = "red"

        }
        else if (this.listingBuyer.Lookingstate == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Enter State" }
          });
          this.LookingstateView.nativeElement.focus()
          document.getElementById("propfor").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lookpost").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lsrname").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("looktow").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Lookstate").style.color = "red"
        }
        else if (this.listingBuyer.Country == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Enter country" }
          });
          this.CountryView.nativeElement.focus()
          document.getElementById("propfor").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lookpost").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lsrname").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("looktow").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Lookstate").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lCountry").style.color = "red"
        }
        else if (this.listingBuyer.ChainStatus == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Select chainstatus" }
          });
          this.ChainStatusView.focus()
          document.getElementById("propfor").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lookpost").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lsrname").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("looktow").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Lookstate").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lCountry").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("chain").style.color = "red"
        }
        else if (this.listingBuyer.FinancialPosition == null && this.listingBuyer.PropertyFor == "buy") {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Select Financial Position" }
          });
          this.FinancialPositionView.focus()
          document.getElementById("propfor").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lookpost").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lsrname").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("looktow").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Lookstate").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lCountry").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("chain").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("finanacial").style.color = "red"
        }

        else if (this.listingBuyer.PropertyType == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Select Property Type" }
          });
          this.PropertyTypeView.focus()
          document.getElementById("propfor").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lookpost").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lsrname").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("looktow").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Lookstate").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lCountry").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("chain").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("finanacial").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Property-type").style.color = "red"



        }

        else if (this.listingBuyer.Roommin == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Select No of Rooms" }
          });
          this.RoomminView.focus()
          document.getElementById("propfor").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lookpost").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lsrname").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("looktow").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Lookstate").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lCountry").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("chain").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("finanacial").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Property-type").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMin").style.color = "red"
        }

        else if (this.listingBuyer.Roomsmax == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Select No of Rooms" }
          });
          this.RoomsmaxView.focus()
          document.getElementById("propfor").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lookpost").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lsrname").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("looktow").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Lookstate").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lCountry").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("chain").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("finanacial").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Property-type").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMin").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMax").style.color = "red"


        }





        else if (this.listingBuyer.Roommin != 'Studio' && this.listingBuyer.Roomsmax != 'Studio' && this.listingBuyer.Roommin > this.listingBuyer.Roomsmax) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Minimum room must be more than maximum rooms" }

          });
          document.getElementById("propfor").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lookpost").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lsrname").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("looktow").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Lookstate").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lCountry").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("chain").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("finanacial").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Property-type").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMax").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMin").style.color = "red"
        }


        else if (this.listingBuyer.Roommin != 'Studio' && this.listingBuyer.Roomsmax != 'Studio' && this.listingBuyer.Roomsmax < this.listingBuyer.Roommin) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Maximum room must more than minimum rooms" }
          });
          document.getElementById("propfor").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lookpost").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lsrname").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("looktow").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Lookstate").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lCountry").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("chain").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("finanacial").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Property-type").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMin").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMin").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMax").style.color = "red"
        }


        else if (this.listingBuyer.MinAmount == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Select MinAmount" }
          });
          this.MinAmountView.focus()

          document.getElementById("propfor").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lookpost").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lsrname").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("looktow").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Lookstate").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lCountry").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("chain").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("finanacial").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Property-type").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMin").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMax").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("MinAmount").style.color = "red"

        }
        else if (this.listingBuyer.MaxAmount == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Select MaxAmount" }
          });
          this.MaxAmountView.focus()
          document.getElementById("propfor").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lookpost").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lsrname").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("looktow").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Lookstate").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lCountry").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("chain").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("finanacial").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Property-type").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMin").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMax").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMin").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMax").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("MinAmount").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("MaxAmount").style.color = "red"
        }

        else if (Min > Max) {

          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Minimum amount must be less than maximum amount" }
          });
          document.getElementById("propfor").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lookpost").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lsrname").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("looktow").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Lookstate").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lCountry").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("chain").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("finanacial").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Property-type").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMin").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMax").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMin").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMax").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("MaxAmount").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("MinAmount").style.color = "red"

        }
        else if (Max < Min) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Maximum amount must be more than minimum amount" }
          });
          document.getElementById("propfor").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lookpost").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lsrname").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("looktow").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Lookstate").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lCountry").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("chain").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("finanacial").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Property-type").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMin").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMax").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMin").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMax").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("MinAmount").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("MaxAmount").style.color = "red"
        }

        else if (this.listingBuyer.Validity == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Select Validity" }
          });
          this.ValidityView.nativeElement.focus()
          document.getElementById("propfor").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lookpost").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lsrname").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("looktow").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Lookstate").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lCountry").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("chain").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("finanacial").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Property-type").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMin").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMax").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMin").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMax").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("MaxAmount").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("MinAmount").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("val").style.color = "red"

        }

        else if (this.listingBuyer.Minbathroom > this.listingBuyer.Maxbathroom) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Minimum number of bathroom must be less than maximum bathroom" }
          });
          document.getElementById("propfor").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lookpost").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lsrname").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("looktow").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Lookstate").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lCountry").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("chain").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("finanacial").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Property-type").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMin").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMax").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMin").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMax").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("MinAmount").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("MaxAmount").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("val").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("minBathroom").style.color = "red"


        }
        else if (this.listingBuyer.Maxbathroom < this.listingBuyer.Minbathroom) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Maximum number of bathroom must be more than minimum bathroom" }
          });
          document.getElementById("propfor").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lookpost").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lsrname").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("looktow").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Lookstate").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lCountry").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("chain").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("finanacial").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Property-type").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMin").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMax").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMin").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMax").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("MinAmount").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("MaxAmount").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("val").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("minBathroom").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("maxBathroom").style.color = "red"
        }
        else if (this.listingBuyer.Minreception > this.listingBuyer.Maxreception) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Minimum number of reception must be less than maximum reception" }
          });
          document.getElementById("propfor").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lookpost").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lsrname").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("looktow").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Lookstate").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lCountry").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("chain").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("finanacial").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Property-type").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMin").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMax").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMin").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMax").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("MinAmount").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("MaxAmount").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("val").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("minBathroom").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("maxBathroom").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Minreception").style.color = "red"
        }


        else if (this.listingBuyer.Maxreception < this.listingBuyer.Minreception) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Maximum number of reception must be more than minimum reception" }
          });
          document.getElementById("propfor").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lookpost").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lsrname").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("looktow").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Lookstate").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("lCountry").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("chain").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("finanacial").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Property-type").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMin").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMax").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMin").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("roomMax").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("MinAmount").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("MaxAmount").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("val").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("minBathroom").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("maxBathroom").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Minreception").style.color = "var(--DARK-BLUE-COLOR)"
          document.getElementById("Maxreception").style.color = "red"
        }
        else {
          this.onSubmit();

        }

      }

    }
  }


  onSubmit() {
    this.stateService.listingBuyer = this.listingBuyer;
    this.router.navigate(["confirmbuyerdetail"]);
  }



  userDetail() {
    this.isLoading = true
    this.postcodeService.addUsersDetails(this.id, this.Name, this.email, this.Phone, this.DOB, this.title).subscribe((data) => {
      localStorage.setItem('updatedUser', JSON.stringify(data));
      this.isLoading = false
    });
  }


  otherOption() {
    this.other = false
  }
  otherChain() {
    this.other = true
  }
  financialPostion() {
    this.finanacial = true
  }
  removefinancialPostion() {
    this.finanacial = false
  }



  submitForm() {
    // //Lookup Declared Function
    this.postcodeService
      .getLat(this.listingBuyer.Lookingpostcode)
      .subscribe(data => {
        this.postcodeCoordinates = data;
        (this.listingBuyer.longitude = this.postcodeCoordinates.result.longitude),
          (this.listingBuyer.latitude = this.postcodeCoordinates.result.latitude),
          (this.listingBuyer.UserId = this.userData.uid),
          this.return = this.fillFormsService
            .createCustomer(this.userData.uid, this.listingBuyer)
            .then(data => {
              if (data == true) {
              }
            });
      });

    this.listingBuyer.UserId = this.userData.uid;
    this.isLoading = true;
    this.return = this.fillFormsService
      .createCustomer(this.userData.uid, this.listingBuyer)
      .then(data => {
        if (data == true) {
          this.isLoading = false;
          const dialogRef = this.dialog.open(
            AlertDialogBuyerDataSubmissionComponent,
            {
              data: {

              }
            }
          );
        }
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

 



  continueClose() {
    location.reload()
    this.overlay = false;
    this.isLoggedIn = true
    this.isLoading = true
  }

  

 
  radioChange(event) {
    this.filter = event.value;
    if (this.filter == "buy") {
      this.amounts = true
      this.rentOption = false
      this.buyOption = true
    }
    if (this.filter == "rent") {
      this.amounts = true
      this.buyOption = false;
      this.rentOption = true
    }
  }



 
  public previousStep() {
    this.selectedIndex -= 1;
  }
  public nextStep() {
    this.selectedIndex += 1;

  }

  registerNewUsers(displayName, email, pass) {
    axios
      .post('http://134.209.93.8/auth/local/register', {
        username: email,
        email: email,
        password: pass,
      })
      .then(response => {
        // Handle success.
        console.log(response)
        if (response.status == 200) {
          this.userid = response.data.user.id

          if (this.userid != null) {

            this.postcodeService.userDetailName(this.userid,displayName).subscribe((userDetail)=>{
             this.loginUser(email, pass)
            })

          }
        }
  
      })
      .catch(error => {
        if (error.response.data.message[0].messages[0].message == "Username already taken") {
          const dialogRef = this.dialog.open(
            AlertLoginComponent,
            {
              data: {
                message: "Email already taken",
              }
            }
          );

        }
        else {
          const dialogRef = this.dialog.open(
            AlertLoginComponent,
            {
              data: {
                message: error.response.data.message[0].messages[0].message,
              }
            }
          );

        }
      });
  }



  loginUser(username, password) {
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
        });
  }


  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase()) == true) {
      this.postcodeService.getAllUsers(email).subscribe((data) => {
        this.emailData = data

        if (this.emailData.length == 1) {
          this.emailField = true
          this.notValidEmail = false

          if (this.emailData[0].AgentType != null) {


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



