import { Component, OnInit } from '@angular/core';

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
import { EditListingSellerService } from "./edit-listing-seller.service";
import {FormsService} from "../../../Home/Property/fillFormBuyer/fillFormBuyer.service";
import {EditSellerSubmissionComponent} from "./editSellerSubmission.component";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {StrapiAuthService}  from "../../../strapi-auth.service";
import axios from 'axios';
declare var $: any;
import { first } from 'rxjs/operators'
@Component({
  selector: 'app-edit-listing-seller',
  templateUrl: './edit-listing-seller.component.html',
  styleUrls: ['./edit-listing-seller.component.css']
})
export class EditListingSellerComponent implements OnInit {
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
  features = new FormControl();
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
  postcodeCoordinates: any;
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
  Currentpostcode:any;
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
  docid: any;
  sellOption:boolean =true;
  letOption:boolean;
   filter: any;
   rent:any;
   buy:any;
   maxamounts:boolean =false
  getUser: any;
  CurrentTown: string;
  Currentstate: string;
  CurrentAddress: string;
  Phone: any;
  Name: any;
  dataItem;
  Currentaddress: any;
  prefrence: any;
  title: any;

  constructor(  public authService: AuthService,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth,
    private router: Router,
    private stateService: StateServiceService,
    private sellerService: HttpService,
    private dialog: MatDialog,
    private SellerformService: EditListingSellerService,
    private fillFormsService: FormsService,
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private postcodeService: HttpService,
    public HttpClient:HttpClient,
    public StrapiAuthService:StrapiAuthService) { }

  ngOnInit() {
    this.getUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.uid = this.getUser.id
    this.LoggedIn()

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
      this.listingSeller.Lookingpostcode= params.get("Lookingpostcode");
      this.listingSeller.LookingAddress = params.get("LookingAddress");
      this.listingSeller.LookingTown = params.get("LookingTown");
      this.listingSeller.Lookingstate= params.get("Lookingstate");
      this.listingSeller.Country =  params.get("Country");
       this.listingSeller.PropertyType= params.get("PropertyType");
      this.listingSeller.Maxrooms  = params.get("Maxrooms");
      this.listingSeller.MaxAmount = params.get("MaxAmount");
      this.listingSeller.ownership  = params.get("ownership");
      this.listingSeller.Maxbathrooms  = params.get("Maxbathrooms");
      this.listingSeller.Maxreception  = params.get("Maxreception");
      this.listingSeller.PropertyCondition = params.get("PropertyCondition")
      this.Features= params.get("features");
      this.listingSeller.Country = params.get("Country")
      this.docid = params.get("sellerId");
      this.listingSeller.PropertyFor = params.get("PropertyFor")
    });
if(this.listingSeller.PropertyFor == "buy")
{
  this.maxamounts = true
  this.sellOption = true
}
 else 
 {
  this.maxamounts = true
  this.sellOption = false
  this.letOption = true
 }
  }

  private LoggedIn() {


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
    this.isLoggedIn = true;
  }
  private LoggedOut() {
    this.isLoggedIn = false;
  }
  newCustomer(): void {
    this.submitted = false;
    this.listingSeller = new listingSeller();
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

  lookup(value): Observable<any> {
    return this.sellerService.search(value);
  }
  selectTab(nextIndex: number, presentIndex: number): void {

    if (presentIndex == 0) {
      if (this.Name == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please Enter Full Name" },
        });
      }

      else if (this.email == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please Enter Email" },
        });
      }
      else if (Math.floor(Math.abs(Date.now() - new Date(this.DOB).getTime()) / (1000 * 3600 * 24) / 365.25)
        < 18) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "You need to be over 18 to register on this website" },
        });
      }

      else if (this.Phone == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please enter Phone number" },
        });
      }
      if (this.Currentpostcode == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please Enter Current Postcode" },
        });
      }
      else if (this.CurrentAddress == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please Enter Your Current Address" },
        });
      }
      else if (this.CurrentTown == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please Enter Your Current Town" },
        });
      }
      else if (this.Currentstate == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please Enter Your Current State" },
        });
      }
      else {
        this.userDetail()
        this.selectedIndex = nextIndex;

      }

    } else if (presentIndex == 1) {

      if (nextIndex > presentIndex) {
        if(this.maxamounts == false)
        {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please select property" },
          });
        }
      

        else if (this.listingSeller.Lookingpostcode == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Enter Your Looking Postcodes" },
          });
        }

        else if (this.listingSeller.LookingAddress == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Enter Your Looking Address" },
          });
        }
        else if (this.listingSeller.LookingTown == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Enter Your Looking Town" },
          });
        }
        else if (this.listingSeller.Lookingstate == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Enter Your Looking State" },
          });
        }
        else if (this.listingSeller.Country== null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Enter Your Country" },
          });
        }

        
        else if (this.listingSeller.PropertyType == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Enter Your Property Type" },
          });
        }

        else if (this.listingSeller.Maxrooms == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Select Maximum of Rooms" },
          });
        }
 

        else if (this.listingSeller.MaxAmount == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Select Maximum Amount" },
          });
        }
      
        else if (this.listingSeller.ownership == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Select Ownership" },
          });
        }
     
       else {

          this.sellerForm()

        }

      } 

    } 

  }

  getPost(value) {
    this.listingSeller.LookingTown = value.citytown;
    this.listingSeller.Lookingstate = value.county;
    this.listingSeller.Lookingpostcode = value.postcode;
    this.listingSeller.LookingAddress = value.address;
    console.log(value);
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
    this.sellerService.addUsersSellerDetails(this.uid, this.Name, this.email, this.Phone, this.DOB, this.title, this.Currentpostcode, this.CurrentAddress, this.CurrentTown, this.Currentstate).subscribe((data) => {
      this.isLoading = false

    });
  }

 

  radioChange(event) {
    this.filter = event.value;
    if(this.filter == "buy")
    {
      this.maxamounts = true
      this.letOption = false
      this.sellOption = true
    }
    if(this.filter == "rent")
    {
      this.maxamounts = true
      this.sellOption = false;
      this.letOption = true
    }
}



sellerForm()
  {
    this.isLoading = true
    console.log(this.listingSeller.ownership)
      //For Seller
      this.postcodeService.getLat(this.listingSeller.Lookingpostcode.trim()).subscribe(data => {
        this.postcodeCoordinates = data;
        (this.listingSeller.longitude = this.postcodeCoordinates.result.longitude),
        (this.listingSeller.latitude = this.postcodeCoordinates.result.latitude),   
        this.HttpClient.put("http://134.209.93.8/listing-sellers/" + this.docid ,{
          Country:this.listingSeller.Country,
      LookingAddress:this.listingSeller.LookingAddress,
       LookingStreetname:this.listingSeller.LookingTown,
       LookingTown:this.listingSeller.LookingTown,
       Lookingpostcode:this.listingSeller.Lookingpostcode,
      Lookingstate:this.listingSeller.Lookingstate,
       MaxAmount:this.listingSeller.MaxAmount,
       Maxbathrooms:this.listingSeller.Maxbathrooms,
       Maxreception:this.listingSeller.Maxreception,
       PropertyCondition:this.listingSeller.PropertyCondition,
       PropertyFor:this.listingSeller.PropertyFor,
       PropertyType:this.listingSeller.PropertyType,
       features:this.listingSeller.features,
       latitude:this.listingSeller.latitude,
       longitude:this.listingSeller.longitude,
      ownership:this.listingSeller.ownership,
       username:this.Name,
      usertitle:this.title,
      UserId:this.uid,
      Maxrooms:this.listingSeller.Maxrooms,
      Currentpostcode:this.Currentpostcode,
      Currentstate:this.Currentstate,
      CurrentTowncity:this.CurrentTown,
      Currentaddress:this.CurrentAddress


        }).subscribe((data)=>{
console.log(data)
          this.isLoading = false
const dialogRef = this.dialog.open(
  EditSellerSubmissionComponent,
  {
    data: {
      message: "HelloWorld",
      buttonText: {
        cancel: "Done"
      }
    }
  }
);
        })

  })
  }
}
