import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Location } from "@angular/common";
import {HttpService}  from "../../../http.service"
import { elementAt } from 'rxjs/operators';
 
@Component({
  selector: 'app-listing-selling-property-detail',
  templateUrl: './listing-selling-property-detail.component.html',
  styleUrls: ['./listing-selling-property-detail.component.css']
})
export class ListingSellingPropertyDetailComponent implements OnInit {
  Lookingpostcode: string;
  ChainStatus: string;
  FinancialPosition: string;
  Type: string;
  Position: string;

  MaxAmount: string;
  matchStatus: string;
  sub: any;
  MinAmount: string;
  Maxrooms: string;
  Maxreception: any;
  PropertyCondition: string;
  Maxbathrooms: string;

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
  propertyId:any
  features: any;
  constructor(private _Activatedroute: ActivatedRoute,
    private _router: Router,   private _location: Location,
    public HttpService:HttpService) { }

  ngOnInit() {
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.Lookingpostcode = params.get("Lookingpostcode");
      this.Type = params.get("PropertyType");
      this.MaxAmount = params.get("MaxAmount");
      this.Maxrooms = params.get("Maxrooms");
      this.Maxreception = params.get("Maxreception")
      this.PropertyCondition = params.get ("PropertyCondition")
      this.Maxbathrooms = params.get("Maxbathrooms");
      this.propertyId = params.get("id")
    });

    this.HttpService.getSellerAllData(this.propertyId).subscribe((data)=>{
      data.forEach(element => {
console.log(element)
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
      this.features = element.features
      });

    })

  }
  backClicked() {
    this._location.back();
  }
}
