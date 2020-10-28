import { Component, OnInit } from "@angular/core";
import { MyMatchesService } from "./myMatches.service";
import { StateServiceService } from "./../../state-service.service";
import { Router, ActivatedRoute } from "@angular/router";

import { HttpService } from "../../http.service"
import { element } from "protractor";
@Component({
  selector: "app-myMatches",
  templateUrl: "./myMatches.component.html",
  styleUrls: ["./myMatches.component.css"],
})
export class MyMatchesComponent implements OnInit {
  uid: any;
  user: any;
  propertyDetails = [];
  propertyBuyer = [];
  matchedProperties: any;
  property: any;
  UserId: any;
  sub: any;
  Lookingpostcode: string;
  LookingAddress: string;
  norooms: string;
  PropertyCondition: string;
  MinAmount: string;
  buyerProperty: any = [];
  sellerProperty: any = [];
  return: Promise<void>;
  distinctExpressedUid = [];
  expressed: any = false;
  propertyId: any;
  propertyLength: any;
  sellerLength: any;
  elementId;
  buyerProperties;
  elementIds: any;
  alreadyExpressed: any;
  totalBuyer: any;
  totalseller: any;
  buyerLength: any;
  constructor(
    private MatchesService: MyMatchesService,
    private stateService: StateServiceService,
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    public HttpService: HttpService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));

    if (this.user != null) {
      this.uid = this.user.id;
      this.getExpressedListingIds()
    }

    this.HttpService.getTextalreadyexpressed().subscribe((expressed)=>{
      this.alreadyExpressed = expressed[0].ConfirmedMatches
    })
  
    this.HttpService.getMatchesBuyer().subscribe((data) => {
      data.forEach(element => {
        if (element.myId == this.uid) {
          this.HttpService.getAllExpressedMatches(this.uid, element.id).subscribe((buyer) => {
            this.sellerProperty.push({ detail: element, propertyId: element.id, Prop: buyer });
            this.totalBuyer = this.sellerProperty.length 
          });

        }
     });
    })
    this.HttpService.getMatchesSeller().subscribe((sellerData) => {
      sellerData.forEach(sellerelement => {
        this.elementIds = sellerelement.id
        if (sellerelement.myId == this.uid) {
          this.HttpService.getAllExpressedMatches(this.uid, this.elementIds).subscribe((seller) => {
            this.buyerProperty.push({ detail: sellerelement, propertyId: sellerelement.id, Prop: seller });
            this.totalseller = this.buyerProperty.length
          });
  
        }
      });
    })

this.getDetailsAll()

  }







  chckProperty() {
    this.HttpService.getPropertyIdMatches().subscribe((data) => {
      data.forEach(elements => {
        if (elements.Type == "Agent_confirmed" && elements.UserId == this.uid) {
          this.expressed = "true"
        }
      });
      this.getExpressedListingIds()
    })
  }

  getExpressedListingIds() {
    this.HttpService.getExpressedMatches(this.uid).subscribe((express) => {
      express.forEach(element => {
        if (this.distinctExpressedUid.indexOf(element.propertyId) === -1) {
          this.distinctExpressedUid.push(element.propertyId);
        }
      });

    });
  }


  checkExpressForValue(uid) {
    if (this.distinctExpressedUid.includes(uid)) {
      this.expressed = true
      return true;
    } else {
      this.expressed = false
      return false;
    }
  }

  getDetailsAll()
{
  this.HttpService.getMatchesBuyer().subscribe((data) => {
    data.forEach(element => {
      if (element.myId == this.uid && element.matchStatus == 'pending') {
        this.sellerLength = element
      }
   });
  })
  this.HttpService.getMatchesSeller().subscribe((sellerData) => {
    sellerData.forEach(sellerelement => {
      if (sellerelement.myId == this.uid && sellerelement.matchStatus == 'pending') {
      this.buyerLength = sellerelement
      }
    });
  })
}
}