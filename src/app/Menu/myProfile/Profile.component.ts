import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { FormsService } from "../../Home/Property/fillFormBuyer/fillFormBuyer.service";
import { listingBuyer } from "../../Model/listingBuyer";
import {HttpService} from '../../http.service'

@Component({
  selector: "app-profile",
  templateUrl: "./Profile.component.html",
  styleUrls: ["./Profile.component.css", "./../../common.css"]
})
export class MyProfileComponent implements OnInit {
  listingBuyer: listingBuyer;
  user: any;
  items: Observable<any[]>;
  username: any;
  useremail: any;
  users: any;
  Name:any;
  uid:any;
  Address:any
  constructor(private fillFormsService: FormsService,
    private HttpService:HttpService) {}

  ngOnInit() {
  



  }
  
}
