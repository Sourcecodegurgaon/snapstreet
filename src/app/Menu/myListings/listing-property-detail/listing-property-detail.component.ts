import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Location } from "@angular/common";
import {HttpService }  from "../../../http.service"
@Component({
  selector: 'app-listing-property-detail',
  templateUrl: './listing-property-detail.component.html',
  styleUrls: ['./listing-property-detail.component.css']
})
export class ListingPropertyDetailComponent implements OnInit {
  Lookingpostcode: string;
  ChainStatus: string;
  FinancialPosition: string;
  Type: string;
  Position: string;

  MaxAmount: string;
  matchStatus: string;
  sub: any;
  MinAmount: string;
  propertyId: string;
  buyingPosition: any;
  buyerFinancialPosition: any;
  BuyerPropertyType: any;
  BuyerLookingpostcode: any;
  BuyerRoommin: any;
  BuyerRoomsmax: any;
  username: any;
  usertitle: any;
  buyerPropertyFor: any;
  PropertyType: any;
  Ownership: any;
  LookingStreetname: any;
  Conditions: any;
  Maxbathroom: any;
  Maxreception: any;
  constructor(   private _Activatedroute: ActivatedRoute,
    private _router: Router,   private _location: Location,
    public HttpService : HttpService) { }

  ngOnInit() {
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.Lookingpostcode = params.get("Lookingpostcode");
      this.ChainStatus = params.get("ChainStatus");
      this.FinancialPosition = params.get("FinancialPosition");
      this.Type = params.get("PropertyType");
      this.Position = params.get("Position");
      this.MaxAmount = params.get("MaxAmount")
      this.MinAmount = params.get ("MinAmount")
      this.propertyId = params.get("id")

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
}
