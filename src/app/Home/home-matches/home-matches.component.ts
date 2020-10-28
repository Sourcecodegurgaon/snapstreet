import { Component, OnInit } from "@angular/core";
import { StateServiceService } from "../../state-service.service";
import { listingBuyer } from "../../Model/listingBuyer";
import { Sort } from "@angular/material/sort";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { HomeMatchesService } from "./home-matches.service";
import { SellerMatchListingService } from "../Property/fillFormSeller/confirmSellerDetail/sellerMatchListing/sellerMatchListing.service"
import { HttpService } from "../../http.service"

@Component({
  selector: 'app-home-matches',
  templateUrl: './home-matches.component.html',
  styleUrls: ['./home-matches.component.css']
})
export class HomeMatchesComponent implements OnInit {
  return: any;
  userData: any;
  isLoggedIn: boolean;
  isLoading: boolean = false;
  user: any;
  uid: any;
  propertyDetails = [];
  matchedProperties = [];
  unmatchedProperties = [];
  prceMathLogic = [];
  settwo = [];
  unmatchedPriceLogic = [];
  lookTown = [];
  distanceInKm;
  listingBuyer: listingBuyer = new listingBuyer();
  isThanku: boolean = true;
  Names: any;
  title: any;
  unNamed: any;
  more: any;
  morePrice: any;
  less: any;
  distinctExpressedUid = [];
  expressed: boolean = false;
  amount: any;
  removespace: any;
  listing: any;
  minAmount: any;
  maxAmount: any;
  sub: any;
  Lookingpostcode: any;
  PropertyType: any;
  LookingTown: any;
  MinAmount: any;
  MaxAmount: any;
  latitude: any;
  longitude: any;
  newUser: any;
  Lookpostcode: string;
  Looking_postcode: any;
  Property_Type: any;
  Max_Amount: any;
  Min_Amount: any;
  Looking_Town: any;
  New_longitude: any;
  New_latitude: any;

  Look_postcodes: any
  Look_propertytype: any;
  Look_minamount: any;
  Look_maxamount: any;
  Look_longitude: any;
  Look_latitude: any;
  Look_Town: any;
  Property_For: string;
  Look_PropertyFor: string;
  LookingStreetname: string;
  Conditions: string;
  FinancialPosition: string;

  Validity: any;
  Position: string;
  UserId: string;
  ChainStatus: string;
  Look_Streetname: string;
  Look_chainstatus: string;
  Look_condition: string;
  Look_Position: string;

  Look_Validity: any;
  Look_UserId: string;
  Look_FinancialPosition: any;
  getList: boolean = false
  propertyRequirementDetails = [];
  Look_maxAmount: any;

  Look_PropertyType: any;
  Look_postcode: any;
  noOfMatches: number;
  noOfUnmatched: number;
  buyer: boolean = false;
  seller: boolean = false
  Look_state: any;
  Look_rooms: any;
  Look_Propertycondition: any;
  Look_Address: any;
  Look_ownership: any;
  Look_features: any;
  Look_userId: string;
  Look_Maxbathrooms: number;
  Look_Maxreceptions: any;
  Look_Maxrooms: number;
  test: any
  PropertyFor: any;
  Streetname: any;
  condition: any;
  sellermatchedProperties = []
  sellerprceMathLogic = []
  sellersettwo = []
  sellerunmatchedProperties = []
  sellerlookTown = []
  Nestimate: boolean = true
  sellerVal: any;
  buyerVal: any;
  MatchesItem: number;
  buyerItems: boolean = false
  sellerItem: boolean = false;
  sellerunmatchedPropertiesFirst = [];
  sellerunmatchedPriceLogic = []
  unmatchedallProperty = []
  unmatchedchecked;
  new_id: any;
  homePageImage: Object;
  imageUrl: any;
  sellLookTown: any[];
  alreadyExpressed: any;
  constructor(
    private stateService: StateServiceService,
    private route: ActivatedRoute,
    private myrequirement_service: HomeMatchesService,
    private SellermatchesService: SellerMatchListingService,
    public HttpService: HttpService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.uid = this.user.id;
    this.getallitems()
    this.HttpService.getHomeMatchesPageImage().subscribe((data)=>{
      this.homePageImage = data
      this.imageUrl = this.homePageImage[0].HomeMatchesTopImage.url
    })
    this.HttpService.getTextalreadyexpressed().subscribe((expressed)=>{
      this.alreadyExpressed = expressed[0].ExpressedMatches
    })
  
  }

  checkvalue() {

  }


  getDetails(Lookingpostcode, PropertyFor, PropertyType, MinAmount, MaxAmount, LookingTown, latitude, longitude, Streetname, condition, ChainStatus, FinancialPosition, Validity, Position, UserId,new_id) {
    this.buyer = true
    this.seller = false
    this.getList = false
    this.isLoading = true
    this.matchedProperties = []
    this.unmatchedProperties = []
    this.unmatchedPriceLogic = []
    this.unmatchedallProperty = []
    this.lookTown = []
    this.buyerVal = Lookingpostcode
console.log(this.buyerVal)
    // Fetch details
    this.HttpService.buyerMatches().subscribe((data) => {
      data.forEach(item => {
        this.HttpService.getAllExpressedInterest(this.uid,item.id).subscribe((buyer) =>{

        this.buyer = true
        this.seller = false
        this.Look_postcodes = Lookingpostcode.replace(/\s/g, "");
        this.Look_PropertyFor = PropertyFor;
        this.Look_propertytype = PropertyType;
        this.Look_minamount = MinAmount.replace(/,/g, "");
        var Look_minamount = parseInt(this.Look_minamount);
        this.Look_maxamount = MaxAmount.replace(/,/g, "");
        var Look_maxamount = parseInt(this.Look_maxamount)
        this.LookingTown = LookingTown;
        this.Look_latitude = latitude;
        this.Look_longitude = longitude;
        this.Look_Streetname = Streetname;
        this.Look_condition = condition;
        this.Look_chainstatus = ChainStatus;
        this.Look_FinancialPosition = FinancialPosition;
        this.Look_Validity = Validity;
        this.Look_Position = Position;
        this.Look_UserId = UserId
        this.new_id = new_id
        //Price Formula
        this.maxAmount = item.MaxAmount.replace(/,/g, "");
        var maxAmount = parseInt(this.maxAmount)

        this.less = (Look_minamount - (Look_minamount * 10) / 100);
        var less = parseInt(this.less)
        this.more = (Look_maxamount * 1 + (Look_maxamount * 3) / 100 * 1);
        var more = parseInt(this.more)

        //Remove Postcode Spaces
        this.removespace = item.Lookingpostcode.replace(/\s/g, "")
        this.listing = this.Look_postcodes
        this.amount = item.MaxAmount.replace(/,/g, "")
        this.isLoading = false
        this.buyer = true



        if (item.Lookingpostcode.replace(/\s/g, "") == this.Look_postcodes &&
          item.PropertyFor == this.Look_PropertyFor &&
          item.PropertyType == this.Look_propertytype &&
          less <= maxAmount &&
          more >= maxAmount &&
          item.latitude &&
          item.longitude) {

          this.distanceInKm = this.getDistanceFromLatLonInKm(
            this.Look_latitude,
            this.Look_longitude,
            item.latitude,
            item.longitude
          );
          this.matchedProperties.push({
            detail: item,
            propertyId: item.id,
            distance: this.distanceInKm * 1 / 1.609344,
            Prop:buyer[0]
          });

        }

        // POSTCODE MATCH - FIRST 5 LETTERS ONLY- Matches price criteria (min reduce 3% max +10%)- Same property type
        if (item.Lookingpostcode.replace(/\s/g, "") != this.Look_postcodes &&
          item.PropertyFor == this.Look_PropertyFor &&
          item.PropertyType == this.Look_propertytype &&
          item.Lookingpostcode.replace(/\s/g, "").substring(0, 5) == this.listing.substring(0, 5) &&
          less <= maxAmount &&
          more >= maxAmount &&
          item.latitude &&
          item.longitude
        ) {

          this.distanceInKm = this.getDistanceFromLatLonInKm(
            this.Look_latitude,
            this.Look_longitude,
            item.latitude,
            item.longitude
          );

          this.unmatchedProperties.push({
            detail: item,
            propertyId: item.id,
            distance: this.distanceInKm * 1 / 1.609344,
            Prop:buyer[0]
          });

        }

        //POSTCODE MATCH - FIRST 3 LETTERS ONLY- Matches price criteria (min reduce 3% max +10%)-Same property type
        if (item.Lookingpostcode.replace(/\s/g, "") != this.Look_postcodes &&
          item.PropertyFor == this.Look_PropertyFor &&
          item.PropertyType == this.Look_propertytype &&
          item.Lookingpostcode.replace(/\s/g, "").substring(0, 5) != this.listing.substring(0, 5) &&
          item.Lookingpostcode.replace(/\s/g, "").substring(0, 3) == this.listing.substring(0, 3) &&
          maxAmount >= less &&
          maxAmount <= more &&
          item.latitude &&
          item.longitude
        ) {


          this.distanceInKm = this.getDistanceFromLatLonInKm(
            this.Look_latitude,
            this.Look_longitude,
            item.latitude,
            item.longitude
          );

          this.unmatchedPriceLogic.push({
            detail: item,
            propertyId: item.id,
            distance: this.distanceInKm * 1 / 1.609344,
            Prop:buyer[0]
          });

        }


        //POSTCODE MATCH - FIRST 3 LETTERS ONLY- Matches price criteria (min reduce 3% max +10%)- ALL property types
        if (item.Lookingpostcode.replace(/\s/g, "") != this.Look_postcodes &&
          item.PropertyFor == this.Look_PropertyFor &&
          item.PropertyType != this.Look_propertytype &&
          item.Lookingpostcode.replace(/\s/g, "").substring(0, 5) != this.listing.substring(0, 5) &&
          item.Lookingpostcode.replace(/\s/g, "").substring(0, 3) == this.listing.substring(0, 3) &&
          less <= maxAmount &&
          more >= maxAmount &&
          item.latitude &&
          item.longitude
        ) {

          this.distanceInKm = this.getDistanceFromLatLonInKm(
            this.Look_latitude,
            this.Look_longitude,
            item.latitude,
            item.longitude
          );
    
          this.unmatchedallProperty.push({
            detail: item,
            propertyId: item.id,
            distance: this.distanceInKm * 1 / 1.609344,
            Prop:buyer[0]
          });

        }

        //- All other properties - Nationwide
        if (item.Lookingpostcode.replace(/\s/g, "") != this.Look_postcodes &&
          item.PropertyFor == this.Look_PropertyFor &&
          item.Lookingpostcode.replace(/\s/g, "").substring(0, 5) != this.listing.substring(0, 5) &&
          item.Lookingpostcode.replace(/\s/g, "").substring(0, 3) != this.listing.substring(0, 3) &&
          item.latitude &&
          item.longitude
        ) {

          this.distanceInKm = this.getDistanceFromLatLonInKm(
            this.Look_latitude,
            this.Look_longitude,
            item.latitude,
            item.longitude
          );

          this.lookTown.push({
            detail: item,
            propertyId: item.id,
            distance: this.distanceInKm * 1 / 1.609344,
            Prop:buyer[0]
          });

        }


      });
      this.unmatchedProperties.sort(this.compare);
    })
  });
  }


  getSellerDetails(Lookingpostcode, PropertyFor, PropertyType, MaxAmount, LookingTown, Lookingstate, Maxbathrooms, PropertyCondition, LookingAddress, ownership, features, UserId, Maxreception, Maxrooms, latitude, longitude,new_id) {
    this.buyer = false
    this.seller = true

    this.Look_postcode = Lookingpostcode.replace(/\s/g, "");
    this.Look_PropertyFor = PropertyFor;
    this.Look_PropertyType = PropertyType;
    this.Look_maxAmount = MaxAmount.replace(/,/g, "");
    var Look_maxAmount = parseInt(this.Look_maxAmount)
    this.Look_Town = LookingTown;
    this.Look_state = Lookingstate;
    this.Look_rooms = Maxrooms
    this.Look_Propertycondition = PropertyCondition;
    this.Look_Address = LookingAddress;
    this.Look_ownership = ownership
    this.Look_features = features;
    this.Look_userId = UserId;
    this.Look_Maxbathrooms = Maxbathrooms
    this.Look_Maxreceptions = Maxreception;
    this.Look_Maxrooms = Maxrooms;
    this.Look_longitude = longitude;
    this.Look_latitude = latitude;
    this.new_id = new_id
    this.getList = true
    this.isLoading = true
    this.sellermatchedProperties =[]
    this.sellerunmatchedPropertiesFirst=[]
    this.sellerunmatchedPriceLogic=[]
    this.sellerlookTown=[]

    this.HttpService.sellerMatches().subscribe((data) => {
      data.forEach(Mean => {
        this.HttpService.getAllExpressedInterest(this.uid,Mean.id).subscribe((seller) =>{
        //Min-MAx Amount Removed Comas and Formula
        this.maxAmount = this.Look_maxAmount.replace(/,/g, "");
        var maxAmount = parseInt(this.maxAmount)

        this.Look_minamount = Mean.MinAmount.replace(/,/g, "");
        var Look_minamount = parseInt(this.Look_minamount)
        this.Look_maxamount = Mean.MaxAmount.replace(/,/g, "");
        var Look_maxamount = parseInt(this.Look_maxamount)

        this.less = (Look_minamount - (Look_minamount * 10) / 100);
        var less = parseInt(this.less)

        this.more = (Look_maxamount * 1 + (Look_maxamount * 3) / 100 * 1);
        var more = parseInt(this.more)

        //Remove Postcode Spaces

        this.removespace = Mean.Lookingpostcode.replace(/\s/g, "")
        this.listing = this.Look_postcode
  

        this.isLoading = false


        //- Same postcode only- Matches price criteria (min reduce 3% max +10%)- Same property type
        if (Mean.Lookingpostcode.replace(/\s/g, "") == this.Look_postcode &&
          Mean.PropertyFor == this.Look_PropertyFor &&
          Mean.PropertyType == this.Look_PropertyType &&
          less <= maxAmount &&
          more >= maxAmount) {
          this.sellermatchedProperties.push({
            detail: Mean,
            propertyId: Mean.id,
            Prop:seller[0]
          });

        }
        //No Matching Result Set 1

        // POSTCODE MATCH - FIRST 5 LETTERS ONLY- Matches price criteria (min reduce 3% max +10%)- Same property type
        if (Mean.Lookingpostcode.replace(/\s/g, "") != this.Look_postcode &&
          Mean.PropertyType == this.Look_PropertyType &&
          Mean.PropertyFor == this.Look_PropertyFor &&
          less <= maxAmount &&
          more >= maxAmount &&
          this.removespace.substring(0, 5) == this.listing.substring(0, 5) &&
          Mean.latitude &&
          Mean.longitude
        ) {

          this.distanceInKm = this.getDistanceFromLatLonInKm(
            this.Look_latitude,
            this.Look_longitude,
            Mean.latitude,
            Mean.longitude
          );
          this.sellerunmatchedProperties.push({
            detail: Mean,
            propertyId: Mean.id,
            distance: this.distanceInKm * 1 / 1.609344,
            Prop:seller[0]
          });
        }

        // POSTCODE MATCH - FIRST 3 LETTERS ONLY- Matches price criteria (min reduce 3% max +10%)- Same property type
        if (Mean.Lookingpostcode.replace(/\s/g, "") != this.Look_postcode &&
          Mean.PropertyType == this.Look_PropertyType &&
          Mean.PropertyFor == this.Look_PropertyFor &&
          less <= maxAmount &&
          more >= maxAmount &&
          this.removespace.substring(0, 5) != this.listing.substring(0, 5) &&
          this.removespace.substring(0, 3) == this.listing.substring(0, 3)
        ) {


          this.sellerunmatchedPropertiesFirst.push({
            detail: Mean,
            propertyId: Mean.id,
            Prop:seller[0]
          });
        }
        //- POSTCODE MATCH - FIRST 3 LETTERS ONLY- Matches price criteria (min reduce 3% max +10%)- ALL property types
        if (Mean.Lookingpostcode.replace(/\s/g, "") != this.Look_postcode &&
          Mean.PropertyType != this.Look_PropertyType &&
          less <= maxAmount &&
          more >= maxAmount &&
          this.removespace.substring(0, 5) != this.listing.substring(0, 5) &&
          this.removespace.substring(0, 3) == this.listing.substring(0, 3) &&
          Mean.PropertyFor == this.Look_PropertyFor &&
          Mean.latitude &&
          Mean.longitude
        ) {

          this.distanceInKm = this.getDistanceFromLatLonInKm(
            this.Look_latitude,
            this.Look_longitude,
            Mean.latitude,
            Mean.longitude
          );
          this.sellerunmatchedPriceLogic.push({
            detail: Mean,
            propertyId: Mean.id,
            distance: this.distanceInKm * 1 / 1.609344,
            Prop:seller[0]
          });

        }

        //All other properties - Nationwide
        if (Mean.Lookingpostcode.replace(/\s/g, "") != this.Look_postcode &&
          Mean.PropertyFor == this.Look_PropertyFor &&
          this.removespace.substring(0, 5) != this.listing.substring(0, 5) &&
          this.removespace.substring(0, 3) != this.listing.substring(0, 3) &&
          Mean.latitude &&
          Mean.longitude
        ) {

          this.distanceInKm = this.getDistanceFromLatLonInKm(
            this.Look_latitude,
            this.Look_longitude,
            Mean.latitude,
            Mean.longitude
          );

          this.sellerlookTown.push({
            detail: Mean,
            propertyId: Mean.id,
            distance: this.distanceInKm * 1 / 1.609344,
            Prop:seller[0]
          });

          
        }

      })

      this.unmatchedProperties.sort(this.compare);
      this.noOfMatches = this.sellermatchedProperties.length;
      this.noOfUnmatched = this.sellerunmatchedProperties.length;

    });
    });

  }

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
      Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  compare(a, b) {
    const distA = a.distance;
    const distB = b.distance;

    let comparison = 0;
    if (distA > distB) {
      comparison = 1;
    } else if (distA < distB) {
      comparison = -1;
    }
    return comparison;
  }

  closeThank() {
    this.isThanku = false;
  }

 //For Seller MatchListing
 unmatchedhightoLow() {
  
  if (this.sellermatchedProperties.length > 1) {
    this.sellermatchedProperties.sort(function (a, b) {
      return b.detail.MinAmount.replace(/,/g, "") - a.detail.MinAmount.replace(/,/g, "");
    });
  }
  
  if (this.sellerunmatchedProperties.length > 1) {
    this.sellerunmatchedProperties.sort(function (a, b) {
      return b.detail.MinAmount.replace(/,/g, "") - a.detail.MinAmount.replace(/,/g, "");
    });
  }
  
  if (this.sellerunmatchedPriceLogic.length > 1) {
    this.sellerunmatchedPriceLogic.sort(function (a, b) {
      return b.detail.MinAmount.replace(/,/g, "") - a.detail.MinAmount.replace(/,/g, "");
    });
  }
   
  if (this.sellerlookTown.length > 1) {
    this.sellerlookTown.sort(function (a, b) {
      return b.detail.MinAmount.replace(/,/g, "") - a.detail.MinAmount.replace(/,/g, "");
    });
  }
}
unmatchedlowtohigh() {
  
  if (this.sellermatchedProperties.length > 1) {
    this.sellermatchedProperties.sort(function (a, b) {
      return a.detail.MinAmount.replace(/,/g, "") - b.detail.MinAmount.replace(/,/g, "");
    });
  }
  
  if (this.sellerunmatchedProperties.length > 1) {
    this.sellerunmatchedProperties.sort(function (a, b) {
      return a.detail.MinAmount.replace(/,/g, "") - b.detail.MinAmount.replace(/,/g, "");
    });
  }
  
  if (this.sellerunmatchedPriceLogic.length > 1) {
    this.sellerunmatchedPriceLogic.sort(function (a, b) {
      return a.detail.MinAmount.replace(/,/g, "") - b.detail.MinAmount.replace(/,/g, "");
    });
  }
  
  if (this.sellerlookTown.length > 1) {
    this.sellerlookTown.sort(function (a, b) {
      return a.detail.MinAmount.replace(/,/g, "") - b.detail.MinAmount.replace(/,/g, "");
    });
  }


}
unmatchedroomshightolow() {
  
  if (this.sellermatchedProperties.length > 1) {
    this.sellermatchedProperties.sort(function (a, b) {
      return a.detail.Maxrooms - b.detail.Maxrooms;
    });
  }
  
  if (this.sellerunmatchedProperties.length > 1) {
    this.sellerunmatchedProperties.sort(function (a, b) {
      return a.detail.Maxrooms - b.detail.Maxrooms
    });
  }
  
  if (this.sellerunmatchedPriceLogic.length > 1) {
    this.sellerunmatchedPriceLogic.sort(function (a, b) {
      return a.detail.Maxrooms - b.detail.Maxrooms;
    });
  }
  
  if (this.sellerlookTown.length > 1) {
    this.sellerlookTown.sort(function (a, b) {
      return a.detail.Maxrooms - b.detail.Maxrooms;
    });
  }
}
unmatchedDistance() {
  
  if (this.sellermatchedProperties.length > 1) {
    this.sellermatchedProperties.sort(function (a, b) {
      return a.distance - b.distance;
    });
  }
  
  if (this.sellerunmatchedProperties.length > 1) {
    this.sellerunmatchedProperties.sort(function (a, b) {
      return a.distance - b.distance;
    });
  }
  
  if (this.sellerunmatchedPriceLogic.length > 1) {
    this.sellerunmatchedPriceLogic.sort(function (a, b) {
      return a.distance - b.distance;
    });
  }
  
  if (this.sellerlookTown.length > 1) {
    this.sellerlookTown.sort(function (a, b) {
      return a.distance - b.distance;
    });
  }
}
  
//For Buyer MatchListing
BuyerhightoLow() {
 
  if (this.matchedProperties.length > 1) {
    this.matchedProperties.sort(function (a, b) {
      return b.detail.MaxAmount.replace(/,/g, "") - a.detail.MaxAmount.replace(/,/g, "");
    });
  }

  if (this.unmatchedProperties.length > 1) {
    this.unmatchedProperties.sort(function (a, b) {
      return b.detail.MaxAmount.replace(/,/g, "") - a.detail.MaxAmount.replace(/,/g, "");
    });
  }

  if (this.unmatchedallProperty.length > 1) {
    this.unmatchedallProperty.sort(function (a, b) {
      return b.detail.MaxAmount.replace(/,/g, "") - a.detail.MaxAmount.replace(/,/g, "");
    });
  }

  if (this.lookTown.length > 1) {
    this.lookTown.sort(function (a, b) {
      return b.detail.MaxAmount.replace(/,/g, "") - a.detail.MaxAmount.replace(/,/g, "");
    });
  }
}
Buyerlowtohigh() {

  if (this.matchedProperties.length > 1) {
    this.matchedProperties.sort(function (a, b) {
      return b.detail.MaxAmount.replace(/,/g, "") - a.detail.MaxAmount.replace(/,/g, "");
    });
  }

  if (this.unmatchedProperties.length > 1) {
    this.unmatchedProperties.sort(function (a, b) {
      return b.detail.MaxAmount.replace(/,/g, "") - a.detail.MaxAmount.replace(/,/g, "");
    });
  }

  if (this.unmatchedallProperty.length > 1) {
    this.unmatchedallProperty.sort(function (a, b) {
      return a.detail.MaxAmount.replace(/,/g, "") - a.detail.MaxAmount.replace(/,/g, "");
    });
  }

  if (this.lookTown.length > 1) {
    this.lookTown.sort(function (a, b) {
      return b.detail.MaxAmount.replace(/,/g, "") - a.detail.MaxAmount.replace(/,/g, "");
    });
  }


}
Buyeroomshightolow() {
  if (this.matchedProperties.length > 1) {
    this.matchedProperties.sort(function (a, b) {
      return a.detail.Maxrooms - b.detail.Maxrooms;
    });
  }
  if (this.unmatchedProperties.length > 1) {
    this.unmatchedProperties.sort(function (a, b) {
      return a.detail.Maxrooms - b.detail.Maxrooms
    });
  }
  if (this.unmatchedallProperty.length > 1) {
    this.unmatchedallProperty.sort(function (a, b) {
      return a.detail.Maxrooms - b.detail.Maxrooms;
    });
  }
  if (this.lookTown.length > 1) {
    this.lookTown.sort(function (a, b) {
      return a.detail.Maxrooms - b.detail.Maxrooms;
    });
  }
}
BuyerDistance() {
  if (this.matchedProperties.length > 1) {
    this.matchedProperties.sort(function (a, b) {
      return a.distance - b.distance;
    });
  }
  if (this.unmatchedProperties.length > 1) {
    this.unmatchedProperties.sort(function (a, b) {
      return a.distance - b.distance;
    });
  }
  if (this.unmatchedallProperty.length > 1) {
    this.unmatchedallProperty.sort(function (a, b) {
      return a.distance - b.distance;
    });
  }

  if (this.lookTown.length > 1) {
    this.lookTown.sort(function (a, b) {
      return a.distance - b.distance;
    });
  }
}





  getExpressedListingIds() {
    this.HttpService.getExpressedInterest(this.uid).subscribe((data) => {
      data.forEach(buyerMatch => {
        this.distinctExpressedUid = (buyerMatch.propertyId);
     
      });
    })
  }

  checkExpressForValue(uid) {
    if (this.distinctExpressedUid.includes(uid)) {
      this.expressed = true
      return true;
    } else {
      this.expressed = false
      false;
    }
  }



























  getallitems() {
    this.HttpService.sellerMatches().subscribe((data) => {
      data.forEach(element => {
        if (element.UserId == this.uid) {
          this.propertyRequirementDetails.push({ data: element, id: element.id });
        }
      });
    })

    // this.HttpService.buyerMatches().subscribe((data) => {
    //   data.forEach(element => {
    //     if (element.UserId == this.uid) {
    //       this.propertyDetails.push({ seller: element, sellerId: element.id })
    //     }

    //   });
    // })

    this.HttpService.buyerMatches().subscribe((data) => {
      data.forEach(element => {
        if (element.UserId == this.uid) {
          this.propertyDetails.push({ seller: element, sellerId: element.id })
        }

      });

      this.MatchesItem = this.propertyRequirementDetails.length + this.propertyDetails.length
      if (this.MatchesItem < 2) {
        if (this.propertyRequirementDetails.length > this.propertyDetails.length) {
       
          this.buyer = true
          this.seller = false
          this.buyerItems = true
          this.buyerVal = this.propertyRequirementDetails[0].data.Lookingpostcode;
          const Lookingpostcode = this.propertyRequirementDetails[0].data.Lookingpostcode;
          const MinAmount = this.propertyRequirementDetails[0].data.MinAmount;
          const MaxAmount = this.propertyRequirementDetails[0].data.MaxAmount;
          const PropertyFor = this.propertyRequirementDetails[0].data.PropertyFor;
          const PropertyType = this.propertyRequirementDetails[0].data.PropertyType;
          const LookingTown = this.propertyRequirementDetails[0].data.LookingTown;
          const latitude = this.propertyRequirementDetails[0].data.latitude;
          const longitude = this.propertyRequirementDetails[0].data.longitude;
          const Streetname = this.propertyRequirementDetails[0].data.LookingStreetname;
          const condition = this.propertyRequirementDetails[0].data.Conditions;
          const ChainStatus = this.propertyRequirementDetails[0].data.ChainStatus;
          const FinancialPosition = this.propertyRequirementDetails[0].data.FinancialPosition;
          const Validity = this.propertyRequirementDetails[0].data.Validity;
          const Position = this.propertyRequirementDetails[0].data.Position;
          const UserId = this.propertyRequirementDetails[0].data.UserId;
          const new_id = this.propertyRequirementDetails[0].data.id;

          this.getDetails(Lookingpostcode, PropertyFor, PropertyType, MinAmount, MaxAmount, LookingTown, latitude, longitude, Streetname, condition, ChainStatus, FinancialPosition, Validity, Position, UserId,new_id);
        }
        else {
         
          this.seller = true
          this.buyer = false
          this.sellerItem = true
          this.sellerVal = this.propertyDetails[0].seller.Lookingpostcode
          const Lookingpostcode = this.propertyDetails[0].seller.Lookingpostcode;
          const PropertyFor = this.propertyDetails[0].seller.PropertyFor;
          const PropertyType = this.propertyDetails[0].seller.PropertyType;
          const MaxAmount = this.propertyDetails[0].seller.MaxAmount;
          const LookingTown = this.propertyDetails[0].seller.LookingTown;
          const Lookingstate = this.propertyDetails[0].seller.Lookingstate;
          const Maxbathrooms = this.propertyDetails[0].seller.Maxbathrooms
          const PropertyCondition = this.propertyDetails[0].seller.PropertyCondition
          const LookingAddress = this.propertyDetails[0].seller.LookingAddress
          const ownership = this.propertyDetails[0].seller.ownership
          const features = this.propertyDetails[0].seller.features
          const UserId = this.propertyDetails[0].seller.UserId;
          const Maxreception = this.propertyDetails[0].seller.Maxreception
          const Maxrooms = this.propertyDetails[0].seller.Maxrooms;
          const latitude = this.propertyDetails[0].seller.latitude;
          const longitude = this.propertyDetails[0].seller.longitude
          const new_id = this.propertyDetails[0].seller.id;

          this.getSellerDetails(Lookingpostcode, PropertyFor, PropertyType, MaxAmount, LookingTown, Lookingstate, Maxbathrooms, PropertyCondition, LookingAddress, ownership, features, UserId, Maxreception, Maxrooms, latitude, longitude,new_id)
        }
      }
      else if (this.MatchesItem > 1) {
        if (this.propertyRequirementDetails.length > this.propertyDetails.length) {
    
          this.buyer = true
          this.buyerVal = this.propertyRequirementDetails[0].data.Lookingpostcode;
          this.test = this.buyerVal
          const Lookingpostcode = this.propertyRequirementDetails[0].data.Lookingpostcode;
          const MinAmount = this.propertyRequirementDetails[0].data.MinAmount;
          const MaxAmount = this.propertyRequirementDetails[0].data.MaxAmount;
          const PropertyFor = this.propertyRequirementDetails[0].data.PropertyFor;
          const PropertyType = this.propertyRequirementDetails[0].data.PropertyType;
          const LookingTown = this.propertyRequirementDetails[0].data.LookingTown;
          const latitude = this.propertyRequirementDetails[0].data.latitude;
          const longitude = this.propertyRequirementDetails[0].data.longitude;
          const Streetname = this.propertyRequirementDetails[0].data.LookingStreetname;
          const condition = this.propertyRequirementDetails[0].data.Conditions;
          const ChainStatus = this.propertyRequirementDetails[0].data.ChainStatus;
          const FinancialPosition = this.propertyRequirementDetails[0].data.FinancialPosition;
          const Validity = this.propertyRequirementDetails[0].data.Validity;
          const Position = this.propertyRequirementDetails[0].data.Position;
          const UserId = this.propertyRequirementDetails[0].data.UserId;
          const new_id = this.propertyRequirementDetails[0].data.id;

          this.getDetails(Lookingpostcode, PropertyFor, PropertyType, MinAmount, MaxAmount, LookingTown, latitude, longitude, Streetname, condition, ChainStatus, FinancialPosition, Validity, Position, UserId,new_id);
        }
        else {
          this.seller = true
          this.sellerVal = this.propertyDetails[0].seller.Lookingpostcode
          this.test = this.sellerVal
          const Lookingpostcode = this.propertyDetails[0].seller.Lookingpostcode;
          const PropertyFor = this.propertyDetails[0].seller.PropertyFor;
          const PropertyType = this.propertyDetails[0].seller.PropertyType;
          const MaxAmount = this.propertyDetails[0].seller.MaxAmount;
          const LookingTown = this.propertyDetails[0].seller.LookingTown;
          const Lookingstate = this.propertyDetails[0].seller.Lookingstate;
          const Maxbathrooms = this.propertyDetails[0].seller.Maxbathrooms
          const PropertyCondition = this.propertyDetails[0].seller.PropertyCondition
          const LookingAddress = this.propertyDetails[0].seller.LookingAddress
          const ownership = this.propertyDetails[0].seller.ownership
          const features = this.propertyDetails[0].seller.features
          const UserId = this.propertyDetails[0].seller.UserId;
          const Maxreception = this.propertyDetails[0].seller.Maxreception
          const Maxrooms = this.propertyDetails[0].seller.Maxrooms;
          const latitude = this.propertyDetails[0].seller.latitude;
          const longitude = this.propertyDetails[0].seller.longitude
          const new_id = this.propertyDetails[0].seller.id;

          this.getSellerDetails(Lookingpostcode, PropertyFor, PropertyType, MaxAmount, LookingTown, Lookingstate, Maxbathrooms, PropertyCondition, LookingAddress, ownership, features, UserId, Maxreception, Maxrooms, latitude, longitude,new_id)
        }
      }

 


    });





  }


  



  getallitem() {
    this.HttpService.sellerMatches().subscribe((data) => {
      data.forEach(element => {
        if (element.UserId == this.uid) {
          this.propertyRequirementDetails.push({ data: element, id: element.id });

          this.buyer = true
          this.seller = false
          this.buyerItems = true
       
        }
      });
    })

    this.HttpService.buyerMatches().subscribe((data) => {
      data.forEach(element => {
        if (element.UserId == this.uid) {
          this.propertyDetails.push({ seller: element, sellerId: element.id })

        }

      });
    })

   

   









  }
}