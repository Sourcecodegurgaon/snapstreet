import { Component, OnInit } from "@angular/core";
import { StateServiceService } from "../../.././../.././state-service.service";
import { listingBuyer } from "../../../../../Model/listingBuyer";
import { Sort } from "@angular/material/sort";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { HttpService } from "../../../../../http.service"
@Component({
  selector: "app-buyerMatchListing",
  templateUrl: "./buyerMatchListing.component.html",
  styleUrls: ["./buyerMatchListing.component.css"],
})
export class BuyerMatcheListingComponent implements OnInit {
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
  distinctExpressedUid;
  expressed: boolean = false;
  amount: any;
  removespace: string;
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
  unmatchedallProperty = []
  getUser: any;
  New_id: any;
  homePageImage: Object;
  imageUrl: any;
  sbuyerLookTown;
  buyerLookTown;
  totalExpressed ;
  distinctExpressed: any;
  alreadyExpressed: any;
  constructor(

    private stateService: StateServiceService,
    private route: ActivatedRoute,
    public HttpService: HttpService
  ) { }

  ngOnInit() {
    this.getUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.uid = this.getUser.id

    this.HttpService.getHomeMatchesPageImage().subscribe((data) => {
      this.homePageImage = data
      this.imageUrl = this.homePageImage[0].BuyerSellerTopImage.url
    })

    this.HttpService.getTextalreadyexpressed().subscribe((expressed)=>{
   
      this.alreadyExpressed = expressed[0].ExpressedMatches

    })

    this.sub = this.route.paramMap.subscribe((params) => {
      this.Looking_postcode = params.get("Lookingpostcode").replace(/\s/g, "").trim();
      this.Property_Type = params.get("PropertyType").trim();
      this.Looking_Town = params.get("LookingTown").trim();
      this.Min_Amount = params.get("MinAmount").replace(/,/g, "").trim();
      this.Max_Amount = params.get("MaxAmount").replace(/,/g, "").trim();
      this.New_latitude = params.get("latitude").trim();
      this.New_longitude = params.get("longitude").trim();
      this.newUser = params.get("newUser").trim();
      this.Property_For = params.get("PropertyFor").trim();
      this.LookingStreetname = params.get("LookingStreetname").trim();
      this.Conditions = params.get("Conditions").trim();
      this.FinancialPosition = params.get("FinancialPosition").trim();
      this.Validity = params.get("Validity").trim();
      this.Position = params.get("Position").trim();
      this.UserId = params.get("UserId").trim();
      this.ChainStatus = params.get("ChainStatus").trim()
      this.New_id = params.get("id")
    });



    if (this.newUser == "false") {
      this.Look_postcodes = this.Looking_postcode;
      this.Look_propertytype = this.Property_Type;
      this.Look_Town = this.Looking_Town;
      this.Look_minamount = this.Min_Amount
      var Look_minamount = parseInt(this.Min_Amount)
      var Look_maxamount = parseInt(this.Max_Amount)
      this.Look_maxamount = this.Max_Amount
      this.Look_latitude = this.New_latitude;
      this.Look_longitude = this.New_longitude;
      this.Look_PropertyFor = this.Property_For;
      this.Look_Streetname = this.LookingStreetname;
      this.Look_condition = this.Conditions;
      this.Look_FinancialPosition = this.FinancialPosition;
      this.Look_Validity = this.Validity;
      this.Look_Position = this.Position;
      this.Look_UserId = this.UserId;
      this.Look_chainstatus = this.ChainStatus
      this.Look_chainstatus = this.ChainStatus

    }

    if (this.newUser == "true") {

      this.Look_postcodes = this.stateService.listingBuyer.Lookingpostcode.replace(/\s/g, "");
      this.Look_propertytype = this.stateService.listingBuyer.PropertyType;
      this.Look_Town = this.stateService.listingBuyer.LookingTown;
      this.Look_minamount = this.stateService.listingBuyer.MinAmount.replace(/,/g, "");
      var Look_minamount = parseInt(this.stateService.listingBuyer.MinAmount.replace(/,/g, ""));
      this.Look_maxamount = this.stateService.listingBuyer.MaxAmount.replace(/,/g, "");
      var Look_maxamount = parseInt(this.stateService.listingBuyer.MaxAmount.replace(/,/g, ""));
      this.Look_latitude = this.stateService.listingBuyer.latitude;
      this.Look_longitude = this.stateService.listingBuyer.longitude;
      this.Look_PropertyFor = this.stateService.listingBuyer.PropertyFor;
      this.Look_Streetname = this.stateService.listingBuyer.LookingStreetname;
      this.Look_condition = this.stateService.listingBuyer.Conditions;
      this.Look_FinancialPosition = this.stateService.listingBuyer.FinancialPosition;
      this.Look_Validity = this.stateService.listingBuyer.Validity;
      this.Look_Position = this.stateService.listingBuyer.Position;
      this.Look_UserId = this.uid;
      this.Look_chainstatus = this.stateService.listingBuyer.ChainStatus
    }
    this.getExpressedListingIds()


    this.HttpService.buyerMatches().subscribe((data) => {

      data.forEach(item => {
        this.HttpService.getAllExpressedInterest(this.uid,item.id).subscribe((datas) => {

        
        
        //Price Formula
        this.maxAmount = item.MaxAmount.replace(/,/g, "");
        var maxAmount = parseInt(this.maxAmount)
        this.less = (Look_minamount - (Look_minamount * 10) / 100);
        var less = parseInt(this.less)
        this.more = (Look_maxamount * 1 + (Look_maxamount * 3) / 100 * 1);
        var more = parseInt(this.more)
        //Remove Postcode Spaces
        this.removespace = item.Lookingpostcode.replace(/\s/g, "").substring(0, 5)
        this.listing = this.Look_postcodes
        this.amount = item.MaxAmount.replace(/,/g, "")


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
            Prop:datas[0]
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
            Prop:datas[0]
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
            Prop:datas[0]
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
            Prop:datas[0]
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
            Prop:datas[0]
          });

        }
        this.sbuyerLookTown = this.lookTown
        this.buyerLookTown = this.sbuyerLookTown.detail


      })
  
      this.unmatchedProperties.sort(this.compare);
    });
  
  })
    this.getPropertyIds()
    this.getExpressedListingIds()

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

 
 //Sort 
  unmatchedhightoLow() {

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
  unmatchedlowtohigh() {
    if (this.matchedProperties.length > 1) {
      this.matchedProperties.sort(function (a, b) {
        return a.detail.MaxAmount.replace(/,/g, "") - b.detail.MaxAmount.replace(/,/g, "");
      });
    }
    if (this.unmatchedProperties.length > 1) {
      this.unmatchedProperties.sort(function (a, b) {
        return a.detail.MaxAmount.replace(/,/g, "") - b.detail.MaxAmount.replace(/,/g, "");
      });
    }
    if (this.unmatchedallProperty.length > 1) {
      this.unmatchedallProperty.sort(function (a, b) {
        return a.detail.MaxAmount.replace(/,/g, "") - b.detail.MaxAmount.replace(/,/g, "");
      });
    }
    if (this.lookTown.length > 1) {
      this.lookTown.sort(function (a, b) {
        return a.detail.MaxAmount.replace(/,/g, "") - b.detail.MaxAmount.replace(/,/g, "");
      });
    }


  }
  unmatchedroomshightolow() {
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
  unmatchedDistance() {
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
    this.HttpService.getExpressedInterest(this.uid).subscribe((datas) => {
   
      datas.forEach((buyerMatch) => {
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
  getPropertyIds() {
    // this.HttpService.getPropertyId().subscribe((data) => {
    //   data.forEach(element => {
    //     this.distinctExpressedUid = (element.propertyId)
    //   });

    // })
  }
}
