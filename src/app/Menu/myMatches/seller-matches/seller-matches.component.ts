import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { notification } from "../../../Model/notification"
import { StateServiceService } from "../../../state-service.service";
import { SellerMatchesService } from "./seller-matches.service";
import { HttpService } from "../../../http.service"
import { element } from 'protractor';
@Component({
  selector: 'app-seller-matches',
  templateUrl: './seller-matches.component.html',
  styleUrls: ['./seller-matches.component.css']
})
export class SellerMatchesComponent implements OnInit {
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
  expressed: any;
  Type: string;
  ChainStatus: string;
  Conditions: string;

  Position: string;
  notification: notification;
  now: Date = new Date();
  UserId: string;
  matchesSeller: any;
  sellerProperty = [];
  overLay: boolean = false
  id: string;
  buyerId: string;
  notificationOverlay: Object;
  notificationContent: any;
  PropertyFor: string;
  buyingPosition: any;
  buyerFinancialPosition: any;
  BuyerPropertyType: any;
  BuyerLookingpostcode: any;
  BuyerRoommin: any;
  BuyerRoomsmax: any;
  username: any;
  usertitle: any;
  buyerPropertyFor: any;
  Ownership: any;
  LookingStreetname: any;
  Maxbathroom: any;
  Maxreception: any;
  constructor(private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private SelectedMyMatchesService: SellerMatchesService,
    private stateService: StateServiceService,
    public HttpService: HttpService) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.uid = this.user.id;
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.Lookingpostcode = params.get("Lookingpostcode");
      this.ChainStatus = params.get("ChainStatus");
      this.Conditions = params.get("Conditions");
      this.Position = params.get("Position");
      this.MinAmount = params.get("MinAmount");
      this.MaxAmount = params.get("MaxAmount");
      this.Type = params.get("PropertyType");
      this.matchStatus = params.get("matchStatus");
      this.propertyId = params.get("propertyId");
      this.expressed = params.get("expressed");
      this.UserId = params.get("UserId");
      this.id = params.get("id");
      this.buyerId = params.get("buyerId")
      this.PropertyFor = params.get("PropertyFor")
      console.log(this.buyerId)
    });


    this.HttpService.getBlueNotificationContent().subscribe((data) => {
      this.notificationOverlay = data
      this.notificationContent = this.notificationOverlay[0].SellerMatchesConfirmInterestNotification
    })

    this.HttpService.getBuyerAllData(this.buyerId).subscribe((data)=>{
      data.forEach(element => {
        console.log(element)
        this.buyingPosition = element.Position
        this.buyerFinancialPosition = element.FinancialPosition
        this.BuyerPropertyType  = element.PropertyType
        this.BuyerLookingpostcode  = element.Lookingpostcode
        this.BuyerRoommin  = element.Roommin
        this.BuyerRoomsmax  = element.Roomsmax
        this.username = element.username
        this.usertitle  = element.usertitle
        this.buyerPropertyFor  = element.PropertyFor
        this.PropertyType = element.PropertyType
        this.Ownership = element.Ownership
        this.LookingStreetname = element.LookingStreetname
        this.Conditions = element.Conditions
        this.Maxbathroom = element.Maxbathroom
        this.Maxreception = element.Maxreception
 
    });
    
    })

  }
  backClicked() {
    this._location.back();
  }


  backOverlay() {
    this.overLay = false
  }
  connfirmOverLay() {
    this.overLay = true
  }

  check() {
    this.HttpService.getPropertyIdMatches().subscribe((data) => {
      console.log(data.length)
      data.forEach(elements => {

        if (elements.Type == "Agent_confirmed" && elements.UserId == this.uid && elements.PropertyId == this.propertyId) {
          this.expressed = "true"
        }
        if (elements.Type != "Agent_confirmed" && elements.UserId != this.uid && elements.PropertyId != this.propertyId) {
          this.expressed = "false"
        }


      });
    })
  }

}

