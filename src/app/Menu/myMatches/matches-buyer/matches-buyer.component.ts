import { Component, OnInit } from '@angular/core';
import { MatchesBuyerService } from "./matches-buyer.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { notification } from "../../../Model/notification"
import { HttpService } from "../../../http.service";

@Component({
  selector: 'app-matches-buyer',
  templateUrl: './matches-buyer.component.html',
  styleUrls: ['./matches-buyer.component.css']
})
export class MatchesBuyerComponent implements OnInit {
  Lookingpostcode: any;
  Lookingstate: any;
  LookingAddress: any;
  norooms: any;
  PropertyCondition: any;
  MinAmount: any;
  sub: any;
  PropertyType: string;
  ownership: string;
  features: string;
  matchStatus: any;
  MaxAmount: string;
  propertyId: any;
  return: any;
  uid: any;
  user: any;
  expressed: string;
  userId: string;
  notification: notification;
  now: Date = new Date();
  sellerProperty: any;
  sellerPropertys = [];
  matchesSeller: any;
  overLay: boolean = false;
  buyerProperty;
  sellerId: string;
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
  constructor(private MatchesBuyerService: MatchesBuyerService,
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    public HttpService: HttpService

  ) { }

  ngOnInit() {

    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.uid = this.user.id;
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.Lookingpostcode = params.get("Lookingpostcode");
      this.Lookingstate = params.get("Lookingstate");
      this.LookingAddress = params.get("LookingAddress");
      this.norooms = params.get("Roomsmax");
      this.PropertyCondition = params.get("PropertyCondition");
      this.MaxAmount = params.get("MaxAmount");
      this.PropertyType = params.get("PropertyType");
      this.ownership = params.get("ownership");
      this.features = params.get("features");
      this.matchStatus = params.get("matchStatus");
      this.propertyId = params.get("propertyId");
      this.expressed = params.get("expressed");
      this.userId = params.get("UserId")
      this.sellerId = params.get("sellerId")
    });
console.log( this.sellerId)

    this.HttpService.getSellerAllData(this.sellerId).subscribe((data) => {
      data.forEach(element => {
        this.userName = element.username
        this.usertitle = element.usertitle
        this.PropertyFor = element.PropertyFor
        this.price = element.MaxAmount
        this.postcode = element.Lookingpostcode
        this.Streetname = element.LookingStreetname
        this.PropertyTypes = element.PropertyType
        this.Maxroom = element.Maxrooms
        this.ownerships = element.ownership
        this.Bathrooms = element.Maxbathrooms
        this.Reception = element.Maxreception
      });
    })

    this.HttpService.getMatchesSeller().subscribe((sellerData) => {
      sellerData.forEach(element => {
        if (element.myId == this.userId && element.matchStatus == "pending") {
          this.buyerProperty = ({ detail: element, propertyId: element.id });
        }
      });
    })

    this.HttpService.getPropertyIdMatches().subscribe((data) => {
      data.forEach(element => {
        if (element.UserId == this.uid && element.propertyId == this.propertyId && element.Type == "BuyerSelected") {
          this.expressed = "true"
        }
      });
    })
    this.HttpService.getBlueNotificationContent().subscribe((data) => {
      this.notificationOverlay = data
      this.notificationContent = this.notificationOverlay[0].BuyerMatchesConfirmInterestNotification
    })


  }
  addToExpressCollection() {
    this.HttpService.postPropertyIdMatches(this.propertyId, this.uid, "BuyerSelected").subscribe((data) => {
    })

  }
  backClicked() {
    this._location.back();
  }

  createSellerNotification() {
    this.HttpService.createNotification(this.now, "Buyer_Confirmed_my_activity", this.userId).subscribe((data) => {
    })
  }
  createOther() {
    this.HttpService.matchesSeller(this.buyerProperty.detail.Lookingpostcode, this.buyerProperty.detail.LookingStreetname, this.buyerProperty.detail.PropertyType, this.buyerProperty.detail.Conditions, this.buyerProperty.detail.ChainStatus, this.buyerProperty.detail.Position,
      this.buyerProperty.detail.MinAmount, this.buyerProperty.detail.MaxAmount, this.buyerProperty.detail.Validity, this.buyerProperty.detail.PropertyType, this.buyerProperty.detail.Position, this.buyerProperty.detail.UserId, this.buyerProperty.detail.Validity, 'confirm_interest', this.buyerProperty.detail.myId, this.sellerId).subscribe((data) => {
      });
    this.addToExpressCollection()
    this.createSellerNotification()
    this.backClicked()

  }

  backOverlay() {
    this.overLay = false
  }
  connfirmOverLay() {
    this.overLay = true
  }
}
