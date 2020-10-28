import { Component, OnInit } from "@angular/core";
import { SellerSelectedPropertyDetailService } from "./sellerSelectedPropertyDetail.service";
import { StateServiceService } from "../../../../../.././state-service.service";
import { SellerMatchListingService } from "../sellerMatchListing.service";
import { SelectedPropertyDialogComponent } from "../../../../../.././Misc/selectedPropertyDialog/selectedPropertyDialog.component";
import {
  VERSION,
  MatDialogRef,
  MatDialog,
  MatSnackBar,
  MAT_DIALOG_DATA,
} from "@angular/material";
import { matchesSeller } from "../../../../../../Model/matchesSeller";
import { matchesBuyer } from "../../../../../../Model/matchesBuyer";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { notification } from "../../../../../../Model/notification";
import { HttpService } from "../../../../../../http.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { elementAt } from "rxjs/operators";


@Component({
  selector: "app-Propertydetails",
  templateUrl: "./sellerSelectedPropertyDetail.component.html",
  styleUrls: ["./sellerSelectedPropertyDetail.component.css"],
})
export class SellerSelectedPropertyComponent implements OnInit {
  user: any;
  uid: any;
  return: any;
  isLoggedIn: boolean;
  isLoading: boolean = false;
  property: any;
  version = VERSION;
  userData: any;
  matchesSeller: any;
  matchesBuyer: any;
  isSellerSelected: boolean = false;
  listingSeller: any;
  Buyerproperty: any;
  sub: any;
  LookingStreetname: string;
  Lookingpostcode: string;
  PropertyType: string;
  Conditions: string;
  ChainStatus: string;
  sellerproperty: any;
  sellerProperty: any;
  Firstname: string;
  Lastname: string;
  Email: string;
  DOB: any;
  FinancialPosition: string;

  PriceRange: string;
  Validity: string;
  Type: string;
  Position: string;
  UserId: string;
  norooms: string;
  matchStatus: any;
  Roomsmax: string;
  ownership: string;
  Maxbathroom: string;
  Maxreception: string;
  features: string;
  overlay: boolean = false;
  title: any;
  unNamed: any;
  propertyId: string;
  datastored: boolean = false;
  express: boolean = true;
  propertyIdCheck: any;
  expressed: any;
  notification: notification;
  now: Date = new Date();
  Look_State: string;
  Look_rooms: string;
  Look_Propertycondition: string;
  Look_Address: string;
  Look_ownership: string;
  Look_features: string;
  Look_userId: string;
  Look_postcode: any;
  Look_PropertyType: string;
  Look_maxAmount: any;
  Look_Town: string;
  MinAmount: string;
  Look_Maxreceptions: string;
  Look_Maxbathrooms: string;
  Look_Maxrooms: string;
  PropertyFor: string;
  Look_Propertyfor: string;
  look_id: any;
  UserDetails: any;
  notificationOverlay: Object;
  notificationContent: any;
  buyingPosition: any;
  buyerFinancialPosition: any;
  BuyerPropertyType: any;
  BuyerLookingpostcode: any;
  BuyerRoommin: any;
  BuyerRoomsmax: any;
  username: any;
  usertitle: any;
  buyerPropertyFor: any;
  constructor(
    private seller_Selected_propertydetail_Service: SellerSelectedPropertyDetailService,
    private stateService: StateServiceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private SellerMatchListingService: SellerMatchListingService,
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    public HttpService: HttpService,
    public HttpClient: HttpClient
  ) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.uid = this.user.id;
console.log(this.uid)



    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.PriceRange = params.get("MaxAmount");
      this.MinAmount = params.get("MinAmount");
      this.Lookingpostcode = params.get("Lookingpostcode");
      this.LookingStreetname = params.get("LookingStreetname");
      this.Position = params.get("Position");
      this.PropertyType = params.get("PropertyType");
      this.Roomsmax = params.get("Roomsmax");
      this.ownership = params.get("Ownership");
      this.Conditions = params.get("Conditions");
      this.Maxbathroom = params.get("Maxbathroom");
      this.Maxreception = params.get("Maxreception");
      this.features = params.get("features");
      this.UserId = params.get("UserId").replace(/\s/g, "");
      this.FinancialPosition = params.get("FinancialPosition");
      this.ChainStatus = params.get("ChainStatus");
      // this.FinancialPosition = params.get("FinancialPosition");
      // this.PriceRange = params.get("PriceRange");
      // this.Validity = params.get("Validity");
      // this.Type = params.get("Type");
      // this.Position = params.get("Position");
      this.propertyId = params.get("propertyId");
      this.expressed = params.get("expressed");
      this.PropertyFor = params.get("PropertyFor")
console.log(this.propertyId)
      //SelectedSeller Params
      this.Look_State = params.get("Look_state");
      this.Look_rooms = params.get("Look_rooms");
      this.Look_Propertycondition = params.get("Look_Propertycondition");
      this.Look_Address = params.get("Look_Address");
      this.Look_ownership = params.get("Look_ownership");
      this.Look_features = params.get("Look_features");
      this.Look_userId = params.get("Look_userId");
      this.Look_postcode = params.get("Look_postcode");
      this.Look_PropertyType = params.get("Look_PropertyType");
      this.Look_maxAmount = params.get("Look_maxAmount");
      this.Look_Town = params.get("Look_Town");
      this.Look_Address = params.get("Look_Address");
      this.Look_Maxbathrooms = params.get("Look_Maxbathrooms");
      this.Look_Maxreceptions = params.get("Look_Maxreceptions");
      this.Look_ownership = params.get("Look_ownership");
      this.Look_Maxrooms = params.get("Look_Maxrooms")
      this.Look_Propertyfor = params.get("Look_PropertyFor")
      this.look_id = params.get("Look_id")
     

    });



this.HttpService.getBuyerAllData(this.propertyId).subscribe((data)=>{
  data.forEach(element => {
  this.buyingPosition = element.Position
  this.buyerFinancialPosition = element.FinancialPosition
  this.BuyerPropertyType  = element.PropertyType
  this.BuyerLookingpostcode  = element.Lookingpostcode
  this.BuyerRoommin  = element.Roommin
  this.BuyerRoomsmax  = element.Roomsmax
  this.username = element.username
  this.usertitle  = element.usertitle
  this.buyerPropertyFor  = element.PropertyFor
});

})


this.HttpService.getBlueNotificationContent().subscribe((data) => {
  this.notificationOverlay = data
  this.notificationContent  =   this.notificationOverlay[0].SellerMatchesExpressInterestNotifcation
})
  

  }

  //Create Database match Seller
  submitForm() {
    this.isSellerSelected = true;
    this.HttpService.matchesSellerSeller(this.Lookingpostcode, this.LookingStreetname, this.PropertyType, this.Conditions, this.ChainStatus, this.FinancialPosition, this.MinAmount, this.PriceRange, this.PropertyFor, this.PropertyType, this.Position, this.UserId, this.PropertyFor, "pending", this.Look_userId, this.Roomsmax, this.ownership, this.Maxbathroom, this.Maxreception, this.features,this.propertyId).subscribe((data) => {
      this.isSellerSelected = false;
      this.overlay = false
    })
    this.HttpService.matchesSellerBuyer(this.Look_postcode, this.Look_State, this.Look_Town, this.Look_Propertycondition, this.Look_maxAmount, this.Look_Address, this.Look_ownership, this.Look_PropertyType, this.Look_features, this.Look_userId, this.Look_Maxrooms, this.Look_Maxreceptions, this.Look_Propertyfor, 'confirm_interest', this.Look_Maxbathrooms, this.Look_maxAmount, this.UserId, this.Look_Maxrooms, this.propertyId).subscribe((data) => {
      this.isSellerSelected = false;
      this.datastored = true;
      this.express = false;
      this.createSellerNotification()
    })
    this.isSellerSelected = true;
    this.addToExpressCollection();

  }

  Overlayopen() {
    this.overlay = true
  }
  continueClose() {
    this.overlay = false
  }
  backClicked() {
    this._location.back();
  }
  addToExpressCollection() {
    this.HttpService.propertyId(this.propertyId, this.uid, "Buyerproperty").subscribe((data) => {
      this.isSellerSelected = false;
      this.datastored = true;
      this.express = false;
      this.backClicked();
    })

  }
  createSellerNotification() {
    this.HttpService.createNotification(this.now, "Seller_Confirmed_my_nestimate", this.UserId).subscribe((data) => {

    })
  }
}
