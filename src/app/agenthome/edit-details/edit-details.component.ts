import { Component, OnInit } from '@angular/core';
import {AgenthomeService}  from "../agenthome.service";
import {agentSignup} from "../../Model/agentSignup";
import {HttpService}  from "../../http.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']
})
export class EditDetailsComponent implements OnInit {

  agents = []
  loggedIn:boolean = false
  user: any;
  uid: any;
  docid: any;
  agentSignup = {};
  sub: any;
  id: string;
  constructor(public AgenthomeService:AgenthomeService,public HttpService:HttpService,public ActivatedRoute:ActivatedRoute,public Router:Router) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem("user"));
    if(this.user != null)
    {
      this.uid  = this.user.uid
    }


    this.sub = this.ActivatedRoute.paramMap.subscribe((params) => {
      this.id = params.get("id")
    });


    this.HttpService.getagentByid(this.id).subscribe((data)=>{
      this.agents = data

    })

 
  
  }


  editUserDetail(id,Fullname,Address,Postcode,Phonenumber,Jobtitle,SinglePercentage,Multipercentage)
   {
     this.HttpService.putAgents(id,Fullname,Address,Postcode,Phonenumber,Jobtitle,SinglePercentage,Multipercentage).subscribe((data)=>{
     this.Router.navigate(["/Agenthome"])
     })

   }






}

