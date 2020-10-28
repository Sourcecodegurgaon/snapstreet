import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import {HttpService} from "../../../http.service"
@Component({
  selector: "app-my-matches-to-sell-selected-detail",
  templateUrl: "./my-matches-to-sell-selected-detail.component.html",
  styleUrls: ["./my-matches-to-sell-selected-detail.component.css"],
})
export class MyMatchesToSellSelectedDetailComponent implements OnInit {
  sub: any;
  Lookingpostcode: string;
  ChainStatus;
  FinancialPosition;
  Type;
  Position;

  PriceRange;
  matchStatus: string;
  MaxAmount: any;
  propertyId: string;
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
  PropertyType: any;
  Conditions: any;
  MinAmount: any;
  constructor(
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    public HttpService:HttpService
  ) {}

  ngOnInit() {
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.Lookingpostcode = params.get("Lookingpostcode");
      // this.ChainStatus = params.get("ChainStatus");
      this.FinancialPosition = params.get("FinancialPosition");
      this.Type = params.get("PropertyType");
      this.Position = params.get("Position");
      this.matchStatus = params.get("matchStatus");    
      this.propertyId = params.get("PropBuyerId")  ;
    });
    console.log(  this.propertyId)


    this.HttpService.getBuyerAllData(this.propertyId).subscribe((data)=>{
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
        this.MinAmount = element.MinAmount
        this.MaxAmount  = element.MaxAmount
 
    });
    
    })

  }
  backClicked() {
    this._location.back();
  }
}
