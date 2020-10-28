import {
  Component,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  OnInit,
  ValueProvider,
  Inject
} from "@angular/core";
import { AuthService } from "./../../../auth.service";
import { listingBuyer } from "../../../Model/listingBuyer";
import { user } from "../../../Model/user";
import { EditListingBuyerService } from "./edit-listing-buyer.service"
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
import { notification } from '../../../Model/notification';
import {EditDataSubmissionComponent} from './editDataSubmission.component';
import {AltertFormDialogComponent} from '../../../Misc/alertFormdialog/alertFormdialog.component';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {StrapiAuthService}  from "../../../strapi-auth.service";
import axios from 'axios';
declare var $: any;
import { first } from 'rxjs/operators'
@Component({
  selector: 'app-edit-listing-buyer',
  templateUrl: './edit-listing-buyer.component.html',
  styleUrls: ['./edit-listing-buyer.component.css']
})
export class EditListingBuyerComponent implements OnInit {
  public addressianAutoCompleteCurrent$: Observable<any> = null;
  public autoCompleteControlCurrent = new FormControl();
  public addressianAutoCompleteLooking$: Observable<any> = null;
  public autoCompleteControlLooking = new FormControl();
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
  ConditionsList: string[] = ["any","Garden", "Driveway", "Period Features", "Garage", "Gated Community", "Loft Conversion", "Conservatory/Sun room", "Granny Annexe", "Rear Extension"];
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
  value: Promise<void>;
  name: any;
  email: any;
  password: any;
  passs: any;
  emails: any;
  newUser: boolean = false;
  sub: any;
  radius: any;
  Type: any;
  docid: any;
 amounts:boolean = false;
  filter: any;
  buyOption:boolean = true;
  rentOption:boolean;
  getUser: any;
  Phone:any;
  title:any
  dataItem;
  Currentaddress: any;
  prefrence: any;
  lookup: any;
  
  
  constructor(public authService: AuthService,
    public afs: AngularFirestore, // Inject Firestore service
    private firestore: AngularFirestore,
    public afAuth: AngularFireAuth,
    db: AngularFirestore,
    private EditListingBuyerService: EditListingBuyerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateServiceService,
    private postcodeService: HttpService,
    private formBuilder: FormBuilder,
    public fb: FormBuilder,
    public HttpClient:HttpClient,
    public StrapiAuthService:StrapiAuthService) { }

  ngOnInit() {
    this.getUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.uid = this.getUser.id
    this.LoggedIn()
    this.sub = this.route.paramMap.subscribe((params) => {
      this.listingBuyer.Currentpostcode = params.get("Currentpostcode").trim();
      this.listingBuyer.CurrentTown = params.get("CurrentTown").trim();
      this.listingBuyer.CurrentAddress = params.get("CurrentAddress").trim();
      this.listingBuyer.Currentstate = params.get("Currentstate").trim();
      this.listingBuyer.Currentcountry = params.get("Currentcountry").trim();
      this.listingBuyer.Lookingpostcode = params.get("Lookingpostcode").trim();
      this.listingBuyer.LookingStreetname = params.get("LookingStreetname").trim();
      this.listingBuyer.LookingTown = params.get("LookingTown").trim();
      this.listingBuyer.Lookingstate = params.get("Lookingstate").trim(); 
      this.listingBuyer.Country = params.get("Country").trim();
      this.listingBuyer.FinancialPosition = params.get("FinancialPosition").trim();
      this.listingBuyer.PropertyType = params.get("PropertyType").trim();
      this.listingBuyer.Roommin = params.get("Roommin").trim()
      this.listingBuyer.Roomsmax = params.get("Roomsmax").trim();
      this.listingBuyer.MinAmount = params.get("MinAmount").trim()
      this.listingBuyer.MaxAmount = params.get("MaxAmount").trim()
      this.listingBuyer.Validity = params.get("Validity").trim();
      this.listingBuyer.Minbathroom = params.get("Minbathroom").trim();
      this.listingBuyer.Maxbathroom = params.get("Maxbathroom").trim();
      this.listingBuyer.Minreception = params.get("Minreception").trim();
      this.listingBuyer.Maxreception = params.get("Maxreception").trim();
      this.listingBuyer.Conditions = params.get("Conditions").trim();
      this.listingBuyer.Ownership = params.get("Ownership").trim();
      this.listingBuyer.features = params.get("features").trim();
      this.docid = params.get("docid");
      this.listingBuyer.PropertyFor = params.get("PropertyFor")
      this.listingBuyer.ChainStatus = params.get("ChainStatus")
      console.log(this.listingBuyer.FinancialPosition)

    })
    if(this.listingBuyer.PropertyFor == 'buy')
    {
      this.amounts = true
      this.buyOption = true
    }
    else
    {
      this.amounts = true
      this.buyOption = false
      this.rentOption = true
    }
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


  }
  private LoggedIn() {
    this.isLoggedIn = true;
    //Pre - populate the email field
    this.postcodeService.getUsers(this.getUser.id).subscribe((data) => {
      this.dataItem = data
      this.Name = this.dataItem.username,
        this.email = this.dataItem.email
      this.Phone = this.dataItem.Phone
      this.DOB = this.dataItem.dob
      this.Currentaddress = this.dataItem.Address
      this.prefrence = this.dataItem.prefrences
      this.title = this.dataItem.title
    });


  }
  private LoggedOut() {
    this.isLoggedIn = false;
  }

  newCustomer(): void {
    this.submitted = false;
    this.listingBuyer = new listingBuyer();
  }

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);


  firstnameFormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(15),
  ]);

  AddressFormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(15),

  ]);
  stateFormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(15),
  ]);
  postcodeFormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(15),
  ]);
  addressnameFormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(6),
  ]);
  phoneFormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(10),
    Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
  ]);

  

  getPost(value) {
    //this.listingBuyer.CurrentAddress = value.address;
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

    if (presentIndex == 0) {
      if (this.Name == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please enter valid fulll name" }
        });
      }

      else if (this.email == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please enter valid email" }
        });
      }



      else if (Math.floor(Math.abs(Date.now() - new Date(this.DOB).getTime()) / (1000 * 3600 * 24) / 365.25)
        < 18) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Age Must be 18+" }
        });
      }
      else if (this.Phone == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please enter valid phone number" }
        });
      }
   
      else  if (this.listingBuyer.Currentpostcode == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please fill Current Postcode" }
        });
      }
      else if (this.listingBuyer.CurrentAddress == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please fill Current Address" }
        });
      }
      else if (this.listingBuyer.Currentstate == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please fill Current Sate" }
        });
      }
      else if (this.listingBuyer.CurrentTown == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please fill Current Town" }
        });
      }
      else {
        this.userDetail();
        this.selectedIndex = nextIndex;
      }
    }


    else if (presentIndex == 1) {
      if (nextIndex > presentIndex) {

         if(this.amounts == false )
         {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please select property for "}
          });
         }
         
        else if (this.listingBuyer.Lookingpostcode == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please fill LookingPostcode" }
          });
        }
        else if (this.listingBuyer.LookingStreetname == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please fill LookingStreetname" }
          });
        }

        else if (this.listingBuyer.LookingTown == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please fill LookingTown" }
          });
        }
        else if (this.listingBuyer.Lookingstate == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please fill Looking State" }
          });
        }
        else if (this.listingBuyer.FinancialPosition == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please fill Financial Position" }
          });
        }
        else if (this.listingBuyer.ChainStatus == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please fill Listing Buyer" }
          });
        }
        else if (this.listingBuyer.PropertyType == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Select Property Type" }
          });
        }
        else if (this.listingBuyer.MinAmount == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Select MinAmount" }
          });
        }
        
        else if (this.listingBuyer.MaxAmount == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Select MaxAmount" }
          });
        }
        else if (this.listingBuyer.Validity == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Select Validity" }
          });
        }
        else {
          this.buyerEditing();
       
        }
        
      } 

    } 
  }

 

  userDetail() {
    this.isLoading = true
    this.postcodeService.addUsersDetails(this.uid, this.Name, this.email, this.Phone, this.DOB, this.title).subscribe((data) => {
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





  openAlertDialog() {
    const dialogRef = this.dialog.open(AltertFormDialogComponent, {

      data: {
        message: "Please Fill form  fields before proceeding",
      },
    });
  }
  radioChange(event) {
    this.filter = event.value;
    if(this.filter == "buy")
    {
      this.amounts = true
      this.rentOption = false
      this.buyOption = true
    }
    if(this.filter == "rent")
    {
      this.amounts = true
      this.buyOption = false;
      this.rentOption = true
    }
}

  buyerEditing()
  {
    this.isLoading = true;
    this.postcodeService.getLat(this.listingBuyer.Lookingpostcode.replace(/\s/g, "")).subscribe(data => {
      this.postcodeCoordinates = data;
      (this.listingBuyer.longitude = this.postcodeCoordinates.result.longitude),
        (this.listingBuyer.latitude = this.postcodeCoordinates.result.latitude),
      this.HttpClient.put<any>("http://134.209.93.8/listing-buyers/" + this.docid,{
        usertitle:this.title,
        username:this.Name,
        longitude:this.listingBuyer.longitude,
         latitude:this.listingBuyer.longitude,
        //features:this.listingBuyer.features,
        Validity:this.listingBuyer.Validity,
          UserId:this.uid,
         Roomsmax:this.listingBuyer.Roomsmax,
         Roommin:this.listingBuyer.Roommin,
         PropertyType:this.listingBuyer.PropertyType,
         PropertyFor:this.listingBuyer.PropertyFor,
         Position:this.listingBuyer.Position,
         Ownership:this.listingBuyer.Ownership,
         Minreception:this.listingBuyer.Minreception,
         Minbathroom:this.listingBuyer.Minbathroom,
         MinAmount:this.listingBuyer.MinAmount,
         Maxreception:this.listingBuyer.Maxreception,
         Maxbathroom:this.listingBuyer.Maxbathroom,
         MaxAmount:this.listingBuyer.MaxAmount,
         Lookingstate:this.listingBuyer.Lookingstate,
         Lookingpostcode:this.listingBuyer.Lookingpostcode,
         LookingTown:this.listingBuyer.LookingTown,
         LookingStreetname:this.listingBuyer.LookingStreetname,
         FinancialPosition:this.listingBuyer.FinancialPosition,
         Currentstate:this.listingBuyer.Currentstate,
         Currentpostcode:this.listingBuyer.Currentpostcode,
         Currentcountry:this.listingBuyer.Currentcountry,
         CurrentAddress:this.listingBuyer.CurrentAddress,
         Country:this.listingBuyer.Country,
         Conditions:this.listingBuyer.Conditions,
         ChainStatus:this.listingBuyer.ChainStatus,
         CurrentTown:this.listingBuyer.CurrentTown
      }).subscribe((data) => {
          this.isLoading = false;
          const dialogRef = this.dialog.open(EditDataSubmissionComponent);          
        });
     
    });
  }

}
