import { Component, OnInit } from '@angular/core';
import { SelectAgentService } from './select-agent.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { notification } from "../../../Model/notification";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { SelectedMyMatchesService } from "../my-matches-selected-details/selected-my-matches.service";
import { agentBuyer } from "../../../Model/agentBuyer";
import { HttpService } from "../../../http.service"
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-select-agent',
  templateUrl: './select-agent.component.html',
  styleUrls: ['./select-agent.component.css']
})
export class SelectAgentComponent implements OnInit {
  color = 'accent';
  checked = true;
  disabled = false;
  accepted: boolean = false
  user: any;
  uid: any;
  disable: boolean = true
  agents = [];
  notification: notification;
  now: Date = new Date();
  return: any
  propertyId: any;
  sub: any;
  UserId: any;
  matchesSeller: any;
  Lookingpostcode: any;
  Lookingstate: any;
  LookingAddress: any;
  norooms: any;
  PropertyCondition: any;
  MinAmount: any;
  PropertyType: any;
  ownership: any;
  features: any;
  matchStatus: any;
  MaxAmount: any;
  expressed: any;
  userId: any;
  sellerProperty = [];
  matchesBuyer: any;
  seller_Selected_propertydetail_Service: any;
  isSellerSelected: boolean;
  datastored: boolean;
  express: boolean;
  Amount: any;
  sellerPropertyLookingAddress: string;
  sellerPropertyLookingTown: any;
  sellerPropertyLookingpostcode: any;
  sellerPropertyLookingstate: any;
  sellerPropertyMaxAmount: any;
  sellerPropertyMaxbathrooms: any;
  Maxreception: any;
  sellerPropertyMaxrooms;
  sellerPropertyPropertyCondition: any;
  sellerPropertyPropertyType: any;
  sellerPropertyUserId: any;
  sellerPropertyfeatures: any;
  sellerPropertyownership: any;
  testagents = [];
  agentBuyer: any;
  ChainStatus: string;
  Conditions: string;

  Type: any;
  agentSeller: any
  sellerPropertyPropertyfor: any;
  newItem: any;
  newItem1: any;
  id: string;
  buyerDetail: any;
  sellerPropertyMaxreception: any;
  buyerId: string;
  buyerDetails: any;
  sellerDetails: any;
  sellerPropertyId: string;
  sellerId: string;
  sellerCurrentPropertyId: string;
  PropertyFor: string;


  constructor(public AgentService: SelectAgentService, private _Activatedroute: ActivatedRoute,
    private _location: Location, private _router: Router, private SelectedMyMatchesService: SelectedMyMatchesService,
    public HttpService: HttpService, public HttpClient: HttpClient) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    this.uid = this.user.id;

    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      this.Lookingpostcode = params.get("Lookingpostcode").trim();
      this.ChainStatus = params.get("ChainStatus");
      this.norooms = params.get("Roomsmax");
      this.PropertyCondition = params.get("PropertyCondition");
      this.Conditions = params.get("Conditions");
      this.MinAmount = params.get("MinAmount");
      this.Type = params.get("Type");
      this.MaxAmount = params.get("MaxAmount");
      this.propertyId = params.get("propertyId");
      this.UserId = params.get("UserId");
      this.id = params.get("id")
      this.sellerCurrentPropertyId = params.get("buyerId")
      this.buyerId = params.get("buyerId")
      this.PropertyFor  = params.get("PropertyFor")
 console.log(this.UserId)
    });

    this.HttpService.getAgents().subscribe((agent) => {
      agent.forEach(elements => {
        if (elements.Postcode.substring(0, 3) == this.Lookingpostcode.substring(0, 3)) {
          this.agents.push(elements)
        }
      });
    })


  }
  Acceptterms() {
    this.accepted = true;
    this.disable = false
  }
  uncheckterms() {
    this.accepted = false;
    this.disable = true
  }
  addToExpressCollection() {
    this.HttpService.postPropertyIdMatches(this.propertyId, this.uid, "Agent_Expressed").subscribe((data) => {

    })

  }
  backClicked() {
    this._location.back();
  }

  createSellerNotification() {
    this.HttpService.createNotification(this.now, "Agent_Matches_Confirmed", this.UserId).subscribe((data) => {
    })
  }

  createBuyerEntry(agentuid) {
    this.createSellerNotification()
    this.createAgentNotification(agentuid)
    this.addToExpressCollection()
 this.agentDetailEntry(agentuid)
    this.HttpService.sellerProperties(this.buyerId).subscribe((data) => {

      this.sellerDetails = data
      this.sellerPropertyLookingAddress = this.sellerDetails.LookingStreetname
      this.sellerPropertyLookingTown = this.sellerDetails.LookingTown
      this.sellerPropertyLookingpostcode = this.sellerDetails.Lookingpostcode
      this.sellerPropertyLookingstate = this.sellerDetails.Lookingstate
      this.sellerPropertyMaxbathrooms = this.sellerDetails.Maxbathrooms
      this.newItem1 = this.sellerDetails.Maxreception
      this.sellerPropertyMaxreception = this.sellerDetails.Maxreception
      this.sellerPropertyMaxrooms = this.sellerDetails.Maxrooms
      this.sellerPropertyPropertyCondition = this.sellerDetails.PropertyCondition
      this.sellerPropertyPropertyType = this.sellerDetails.PropertyType
      this.sellerPropertyUserId = this.sellerDetails.UserId
      this.sellerPropertyfeatures = this.sellerDetails.features
      this.sellerPropertyownership = this.sellerDetails.ownership
      this.sellerPropertyPropertyfor = this.sellerDetails.propertyFor
      this.sellerPropertyMaxAmount = this.sellerDetails.MaxAmount


      this.HttpClient.post("http://134.209.93.8/matches-buyers", {
        Lookingpostcode: this.sellerPropertyLookingpostcode,
        Lookingstate: this.sellerPropertyLookingstate,
        LookingTown: this.sellerPropertyLookingTown,
        PropertyCondition: this.sellerPropertyPropertyCondition,
        MaxAmount: this.sellerPropertyMaxAmount,
        LookingAddress: this.sellerPropertyLookingAddress,
        ownership: this.sellerPropertyownership,
        PropertyType: this.sellerPropertyPropertyType,
        features: this.sellerPropertyfeatures,
        UserId: this.uid,
        Maxrooms: this.sellerPropertyMaxrooms,
        Maxreception: this.sellerPropertyMaxreception,
        PropertyFor: this.sellerPropertyPropertyfor,
        matchStatus: "confirmed",
        Maxbathrooms: this.sellerPropertyMaxbathrooms,
        MinAmount: this.sellerPropertyMaxAmount,
        myId: this.UserId,
        Roomsmax: this.sellerPropertyMaxrooms,
        sellerId: this.buyerId

      }).subscribe((data) => {
        console.log(data)
      })
      this._router.navigate(["/mymatches"])
    })

  }
  
  agentDetailEntry(agentuid)
  {
    this.HttpService.detailsToAgent(this.UserId,this.uid,agentuid,this.Lookingpostcode,this.Type,this.MinAmount,this.MaxAmount,this.ChainStatus,this.PropertyFor).subscribe((data)=>{

    })
  }

  createAgentNotification(agentuid) {
    this.HttpService.createNotification(this.now, "Seller_Select_Agent", agentuid).subscribe((data) => {
    })
  }




}
