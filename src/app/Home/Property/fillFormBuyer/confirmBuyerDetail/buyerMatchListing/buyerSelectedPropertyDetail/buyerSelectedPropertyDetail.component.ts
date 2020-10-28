import { Component, OnInit } from "@angular/core";
import { SelectedpropertydetailService } from "./buyerSelectedPropertyDetail.service";
import { StateServiceService } from "../../../../../.././state-service.service";

import { SelectedPropertyDialogComponent } from "../../../../../.././Misc/selectedPropertyDialog/selectedPropertyDialog.component";
import {
  VERSION,
  MatDialogRef,
  MatDialog,
  MatSnackBar,
  MAT_DIALOG_DATA,
} from "@angular/material";
import { matchesBuyer } from "../../../../../../Model/matchesBuyer";
import { Router, ActivatedRoute } from "@angular/router";
import { getAllJSDocTagsOfKind } from "typescript";
import { matchesSeller } from "../../../../../../Model/matchesSeller";
import { HttpService } from "../../../../../../http.service";
import { Location } from "@angular/common";
import { notification } from "../../../../../../Model/notification";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-buyerSelectedPropertyDetail",
  templateUrl: "./buyerSelectedPropertyDetail.component.html",
  styleUrls: ["./buyerSelectedPropertyDetail.component.css"],
})
export class BuyerSelectedPropertyDetailComponent implements OnInit {
  user: any;
  uid;
  return: any;
  isLoggedIn: boolean;
  isLoading: boolean = false;
  property: any;
  version = VERSION;
  userData: any;
  matchesBuyer: any;
  isBuyerSelected: boolean = false;
  listingSeller: any;
  sub;
  Lookingpostcode: string;
  Lookingstate: string;
  LookingTown: string;
  norooms: string;
  PropertyCondition: string;
  MaxAmount: string;
  ownership: string;
  LookingStreetname: string;
  matchesSeller: any;
  PropertyType: any;
  features: string;
  userId: string;
  Firstname: string;
  Lasttname: string;
  Email: string;
  DOB: any;
  ChainStatus: string;
  FinancialPosition: string;

  Validity: string;
  Condition: string;
  type: string;
  Position: string;
  Aplicablefeatures: string;
  UserId: any;
  LookingAddress: string;
  Lastname: any;
  MinAmount: any;
  matchesStatusPending: any;
  matchesStatusConfirmInterest: any;
  matchStatus: any;
  Maxbathrooms: string;
  Maxrooms: string;
  Maxreception: string;
  overlay: boolean = false;
  title: any;
  unNamed: any;
  datastored: boolean = false;
  express: boolean = true;
  expressInterest: any;
  Match: any;
  propertyId;
  expressed: string;
  notification: notification
  now: Date = new Date();
  Look_postcodes: string;
  Look_chainstatus: string;
  Look_Position: string;

  Look_Minamount: string;
  Look_Maxamount: string;
  Look_Validity: string;
  Look_PropertyType: string;
  Look_UserId: string;
  Look_condition: string;
  Look_ChaonStatus: string;
  Look_streetName: string;
  propertyFor: any;
  Look_PropertyFor: string;
  getUser: any;
  Look_id: string;
  UserDetails: any;
  notificationOverlay: Object;
  notificationContent: any;
  price: any;
  postcode: any;
  Streetname: any;
  PropertyTypes: any;
  Maxroom: any;
  ownerships: any;
  PropertyFor: any;
  Bathrooms: any;
  Reception: any;
  userName: any;
  usertitle: any;
  constructor(
    private Selected_propertydetail_Service: SelectedpropertydetailService,
    private stateService: StateServiceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,

    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private HttpService: HttpService,
    private _location: Location,
    public HttpClient: HttpClient
  ) { }

  ngOnInit() {
    this.getUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.uid = this.getUser.id

    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.Lookingpostcode = params.get("Lookingpostcode");
      this.Lookingstate = params.get("Lookingstate");
      this.LookingTown = params.get("LookingTown");
      this.norooms = params.get("norooms");
      this.PropertyCondition = params.get("PropertyCondition");
      this.MaxAmount = params.get("MaxAmount");
      this.LookingAddress = params.get("LookingAddress");
      this.ownership = params.get("ownership");
      this.PropertyType = params.get("PropertyType").replace(/\s/g, "");
      this.features = params.get("features");
      this.UserId = params.get("UserId").replace(/\s/g, "");
      this.MinAmount = params.get("MinAmount");
      this.Maxbathrooms = params.get("Maxbathrooms");
      this.Maxrooms = params.get("Maxrooms");
      this.Maxreception = params.get("Maxreception");
      this.propertyId = params.get("propertyId").trim();
      this.expressed = params.get("expressed");
      this.propertyFor = params.get("PropertyFor")
      console.log( this.propertyId)

      //Buyer Params
      this.Look_postcodes = params.get("Look_postcodes");
      this.Look_streetName = params.get("Look_Streetname")
      this.Look_condition = params.get("Look_condition");
      this.Look_ChaonStatus = params.get("Look_chainstatus");
      this.Look_Position = params.get("Look_FinancialPosition");
      this.Look_Minamount = params.get("Look_minamount");
      this.Look_Maxamount = params.get("Look_maxamount");
      this.Look_Validity = params.get("Look_Validity");
      this.Look_PropertyType = params.get("Look_propertytype");
      this.Look_Position = params.get("Look_Position");
      this.Look_UserId = params.get("Look_UserId");
      this.Look_PropertyFor = params.get("Look_PropertyFor")
      this.Look_id  = params.get("New_id")
 
      console.log(this.Look_id)
    });

    this.HttpService.getBlueNotificationContent().subscribe((data) => {
      this.notificationOverlay = data
      this.notificationContent  =   this.notificationOverlay[0].BuyerMatchesExpressInterestNotifcation
    })
     


    this.HttpService.getSellerAllData(this.propertyId).subscribe((data)=>{
      data.forEach(element => {

        this.userName = element.username
        this.usertitle = element.usertitle
       this.PropertyFor = element.PropertyFor
        this.price = element.MaxAmount
        this.postcode = element.Lookingpostcode
        this.Streetname = element.LookingStreetname
       this.PropertyTypes  = element.PropertyType
       this.Maxroom   = element.Maxrooms
       this.ownerships = element.ownership
      this.Bathrooms  = element.Maxbathrooms
      this.Reception = element.Maxreception
      });

    })

    this.HttpService.getPropertyId().subscribe((data)=>{
      data.forEach(element => {
        if(element.UserId == this.uid && element.propertyId == this.propertyId && element.Type == "Buyerproperty")
        {
    
          this.datastored = true;
          this.express = false;
        }
       
      });  
      })
    
  }

  //Create Database BuyerMatches
  submitForm() {

    this.isBuyerSelected = true;

    this.HttpService.matchesBuyer(this.Lookingpostcode, this.Lookingstate, this.LookingTown, this.PropertyCondition, this.MaxAmount,
      this.LookingAddress, this.ownership, this.PropertyType, this.features, this.UserId, this.Maxrooms, this.Maxreception, this.propertyFor, "pending", this.Maxbathrooms, this.MinAmount, this.Look_UserId
    ).subscribe((data) => {
      console.log(data)
      this.isBuyerSelected = false;
      this.overlay = false;
    }),

    
      this.HttpService.matchesSeller(this.Look_postcodes, this.Look_streetName, this.Look_PropertyType, this.Look_condition, this.Look_ChaonStatus, this.Look_Position,
        this.Look_Minamount, this.Look_Maxamount, this.Look_Validity, this.Look_PropertyType, this.Look_Position, this.Look_UserId, this.Look_PropertyFor, 'confirm_interest', this.UserId,this.Look_id).subscribe((data) => {
          this.isBuyerSelected = false;
          this.datastored = true;
          this.express = false;
         this.createSellerNotification();
         this.backClicked();
        });


    this.addToExpressCollection();
  }

  addToExpressCollection() {


    this.HttpService.propertyId(this.propertyId,this.uid,"Sellerproperty").subscribe((data)=>{
      this.isBuyerSelected = false;
      this.datastored = true;
      this.express = false;
     
    })
  
  }

  Overlayopen() {
    this.overlay = true;
  }
  continueClose() {
    this.overlay = false;
  }

  backClicked() {
    this._location.back();
  }
  createSellerNotification() {
this.HttpService.createNotification(this.now,"Buyer_Confirmed_my_nestimate",this.UserId).subscribe((data)=>{

})
    
    // this.notification = {
    //   time: this.now,
    //   viewed: "Confirmed",
    //   userId: this.uid,
    //   Type: "Buyer_Confirmed_my_nestimate",
    //   propertyId: this.propertyId.trim()
    // }
    // this.return = this.Selected_propertydetail_Service
    //   .createNotification(this.UserId, this.notification)
    //   .then(data => {
    //   });
  }

  genrateConfirmedInterest() {
    this.HttpService.propertyId(this.propertyId, this.UserId,"SellerProperty").subscribe((data) => {
      console.log(data)
    })
  }
}
