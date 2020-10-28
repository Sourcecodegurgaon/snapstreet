import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormsService } from "../fillFormBuyer.service";
import { AuthService } from "./../../../../auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { StateServiceService } from "./../../../../state-service.service";
import { listingBuyer } from "../../../../Model/listingBuyer";
import { User } from "../../../../shared/services/user";
import {
  VERSION,
  MatDialogRef,
  MatDialog,
  MatSnackBar,
  MAT_DIALOG_DATA
} from "@angular/material";
import { AlertDialogBuyerDataSubmissionComponent } from "./alertDialogBuyerDataSubmission.component";
import { Location } from "@angular/common";
import { Config, HttpService } from "../../../../http.service";
import { Observable, onErrorResumeNext } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { switchMap } from "rxjs/operators";
import { map, startWith, take } from "rxjs/operators";
import { BuyerdetailService } from './confirmBuyerDetail.service'
import { notification } from '../../../../Model/notification';
import axios from 'axios';
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Component({
  selector: "app-confirmBuyerDetail",
  templateUrl: "./confirmBuyerDetail.component.html",
  styleUrls: ["./confirmBuyerDetail.component.css"]
})
export class ConfirmBuyerDetailComponent implements OnInit {
  return: any;
  userData: any;
  isLoggedIn: boolean;
  isLoading: boolean = false;
  listingBuyer: listingBuyer;
  notification: notification
  selectedIndex = 0;
  version = VERSION;
  config: Config;
  maxNumberOfTabs = 2;
  Needsmodernisation = String;
  routerExtensions: any;
  getLat: any;
  data: any;
  isBuyer: boolean = false;
  Seller: any;
  postcodeCoordinates: any;
  Date = new Date();
  user: any;
  buyerUser: any;
  users: any;
  getUser: any;
  dataItem;
  Name: any;
  email: any;
  Currentaddress: any;
  prefrence: any;
  title: any;
  DOB: any;
  Phone: any;
  uid:any
  dataId: any;
  register:boolean = false
  equals(objOne, objTwo) {
    if (typeof objOne !== "undefined" && typeof objTwo !== "undefined") {
      return objOne.id === objTwo.id;
    }
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private formsService: FormsService,
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    private stateService: StateServiceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private _location: Location,
    private postcodeService: HttpService,
    private BuyerdetailService: BuyerdetailService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.getUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.uid = this.getUser.id
    this.postcodeService.getUsers(this.uid).subscribe((data) => {
      this.dataItem = data
      this.Name = this.dataItem.username,
      this.email = this.dataItem.email
      this.Phone = this.dataItem.Phone
      this.DOB = this.dataItem.dob
      this.Currentaddress = this.dataItem.Address
      this.prefrence = this.dataItem.prefrences
      this.title = this.dataItem.title
    })



    this.listingBuyer = this.stateService.listingBuyer;

    //Lookup Declared Function
    this.postcodeService
      .getLat(this.listingBuyer.Lookingpostcode.replace(/\s/g, ""))
      .subscribe(data => {
        this.postcodeCoordinates = data;
        (this.listingBuyer.longitude = this.postcodeCoordinates.result.longitude),
          (this.listingBuyer.latitude = this.postcodeCoordinates.result.latitude),
          (this.isBuyer = true);
        this.isBuyer = false;
      });






  }
  

  submitForm() {
    this.listingBuyer.UserId = this.userData.uid;
    this.isLoading = true;
    this.listingBuyer.username = this.user.Name
    this.listingBuyer.usertitle = this.user.title
    this.lookuplatlong()
    this.listingBuyer.longitude
    this.listingBuyer.latitude
    this.return = this.formsService
      .createCustomer(this.userData.uid, this.listingBuyer)
      .then(data => {
        if (data == true) {
          this.isLoading = false;
          const dialogRef = this.dialog.open(
            AlertDialogBuyerDataSubmissionComponent,
            {
              data: {
                message: "HelloWorld",

                buttonText: {
                  cancel: "Done"
                }
              }
            }
          );
        }
      });

  }

  private LoggedIn() {
    this.isLoggedIn = true;
  }
  private LoggedOut() {
    this.isLoggedIn = false;
  }

  backClicked() {
    this._location.back();
  }
  Lat() {
    this.listingBuyer.latitude = this.data;
  }
  userDetail() {
    console.log(this.user)
    this.return = this.formsService.createUserCustomer(this.user)
      .then(data => {

      });
  }


  lookuplatlong() {
    //Lookup Declared Function
    this.postcodeService
      .getLat(this.listingBuyer.Lookingpostcode.replace(/\s/g, ""))
      .subscribe(data => {
        this.postcodeCoordinates = data;
        (this.listingBuyer.longitude = this.postcodeCoordinates.result.longitude),
          (this.listingBuyer.latitude = this.postcodeCoordinates.result.latitude),
          (this.listingBuyer.UserId = this.userData.uid),
          (this.isBuyer = true);
        this.isBuyer = false;
      });

  }

  submitBuyer() {
    this.isLoading = true
    //Lookup Declared Function
    this.postcodeService.getLat(this.listingBuyer.Lookingpostcode.replace(/\s/g, ""))
      .subscribe(data => {
        this.postcodeCoordinates = data;
        (this.listingBuyer.longitude = this.postcodeCoordinates.result.longitude),
          (this.listingBuyer.latitude = this.postcodeCoordinates.result.latitude),
          (this.isBuyer = true);
          this.isBuyer = false;
          console.log(this.stateService.listingBuyer.features,)
        this.http.post<any>("http://134.209.93.8/listing-buyers", {
        usertitle: this.title,
          username: this.Name,
          longitude: this.listingBuyer.longitude,
          latitude: this.listingBuyer.longitude,
           features: this.stateService.listingBuyer.features,
           Validity: this.stateService.listingBuyer.Validity,
          Roomsmax: this.stateService.listingBuyer.Roomsmax,
          Roommin: this.stateService.listingBuyer.Roommin,
           PropertyType: this.stateService.listingBuyer.PropertyType,
           PropertyFor: this.stateService.listingBuyer.PropertyFor,
           Position: this.stateService.listingBuyer.Position,
           Ownership: this.stateService.listingBuyer.Ownership,
          Minreception: this.stateService.listingBuyer.Minreception,
          Minbathroom: this.stateService.listingBuyer.Minbathroom,
          MinAmount: this.stateService.listingBuyer.MinAmount,
          Maxreception: this.stateService.listingBuyer.Maxreception,
          Maxbathroom: this.stateService.listingBuyer.Maxbathroom,
          MaxAmount: this.stateService.listingBuyer.MaxAmount,
          Lookingstate: this.stateService.listingBuyer.Lookingstate,
          Lookingpostcode: this.stateService.listingBuyer.Lookingpostcode,
          LookingTown: this.stateService.listingBuyer.LookingTown,
          LookingStreetname: this.stateService.listingBuyer.LookingStreetname,
          FinancialPosition: this.stateService.listingBuyer.FinancialPosition,
          Currentstate: this.stateService.listingBuyer.Currentstate,
          Currentpostcode: this.stateService.listingBuyer.Currentpostcode,
          Currentcountry: this.stateService.listingBuyer.Currentcountry,
          CurrentAddress: this.stateService.listingBuyer.CurrentAddress,
          Country: this.stateService.listingBuyer.Country,
          Conditions: this.stateService.listingBuyer.Conditions,
          ChainStatus: this.stateService.listingBuyer.ChainStatus,
          CurrentTown: this.stateService.listingBuyer.CurrentTown,
          UserId:this.uid
        }).subscribe((data) => {
          this.dataId = data.id
          this.isLoading = false;
          this.register = false
          const dialogRef = this.dialog.open(
            AlertDialogBuyerDataSubmissionComponent,
            {
              data: {
                message: "HelloWorld",
                id:  this.dataId,
                buttonText: {
                  cancel: "Done"
                }
              }
            }
          );


        });


      });
  }
  overLay()
  {
    this.register = true
  }
}
