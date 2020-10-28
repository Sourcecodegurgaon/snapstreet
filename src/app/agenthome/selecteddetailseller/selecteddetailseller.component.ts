import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import {HttpService}  from "../../http.service"
@Component({
  selector: 'app-selecteddetailseller',
  templateUrl: './selecteddetailseller.component.html',
  styleUrls: ['./selecteddetailseller.component.css']
})
export class SelecteddetailsellerComponent implements OnInit {
  sub: any;
  LookingAddress: string;
  LookingTown: string;
  Lookingpostcode: string;
  Lookingstate: string;
  MaxAmount: string;
  Maxbathroom: string;
  Maxreception: string;
  PropertyCondition: string;
  PropertyType: string;
  Roomsmax: string;
  ownership: string;
  UserId: string;
  userDetail;
  username: any;
  email: any;
  Phone: any;
  address: any;

  constructor(private route: ActivatedRoute, private _location: Location,public HttpService:HttpService) { }

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe((params) => {
      this.LookingAddress = params.get("LookingAddress");
      this.LookingTown = params.get("LookingTown");
      this.Lookingpostcode = params.get("Lookingpostcode");
      this.Lookingstate = params.get("Lookingstate");
      this.MaxAmount = params.get("MaxAmount");
      this.Maxbathroom = params.get("Maxbathrooms");
      this.Maxreception = params.get("Maxreception");
      this.PropertyCondition = params.get("PropertyCondition");
      this.PropertyType = params.get("PropertyType");
      this.Roomsmax = params.get("Roomsmax")
      this.ownership = params.get("ownership")
      this.UserId = params.get("UserId")
    });

    this.HttpService.getUsers(this.UserId).subscribe((data)=>{
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
