import { Component, OnInit } from '@angular/core';
import {SelecteddetailareaService } from "./selecteddetailarea.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import {HttpService} from "../../http.service"
@Component({
  selector: 'app-selecteddetailarea',
  templateUrl: './selecteddetailarea.component.html',
  styleUrls: ['./selecteddetailarea.component.css']
})
export class SelecteddetailareaComponent implements OnInit {
  sub: any;
  Minamount: string;
  MaxAmount: string;
  ChainStatus: string;
  Conditions: string;
  Lookinpostcode: string;
  UserId: string;
  userDetail;
  username: any;
  email: any;
  Phone: any;
  PropertyType: string;
  PropertyFor: string;
  AgentUid: string;
  BuyerUid: string;
  SellerUid: string;
  address: any;


  constructor(public SelecteddetailareaService:SelecteddetailareaService,private route: ActivatedRoute,private _location: Location,public HttpService:HttpService) { }

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe((params) => {

      this.Minamount = params.get("MinAmount");
      this.MaxAmount  = params.get("MaxAmount");
      this.ChainStatus = params.get("ChainStatus");
      this.PropertyType  = params.get("PropertyType");
      this.Lookinpostcode = params.get("Postcode");
      this.PropertyFor  = params.get("PropertyFor")
     this.AgentUid = params.get("AgentUid")
     this.BuyerUid  = params.get("BuyerUid")
     this.SellerUid = params.get("SellerUid")
      console.log(this.Lookinpostcode  + this.PropertyFor  +  this.AgentUid  +   this.SellerUid + this.BuyerUid)
    });

    this.HttpService.getUsers(this.BuyerUid).subscribe((data)=>{
      this.userDetail = data
     this.username = this.userDetail.username
     this.email = this.userDetail.email
     this.Phone = this.userDetail.Phone
    })



    this.HttpService.getUsers(this.SellerUid).subscribe((data)=>{
      this.userDetail = data
      this.username = this.userDetail.username
      this.email = this.userDetail.email
      this.Phone = this.userDetail.Phone
      this.address = this.userDetail.CurrentAddress
    })


  }
  backClicked() {
    this._location.back();
  }
}
