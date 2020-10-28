import { Component, OnInit } from '@angular/core';
import axios from 'axios';

import { agentSignup } from '../../Model/agentSignup';
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "./../../auth.service";
import { StateServiceService } from "./../../state-service.service"
import {FormsService } from "./../Property/fillFormBuyer/fillFormBuyer.service"
import {HttpService} from "../../http.service"
@Component({
  selector: 'app-agent-signup',
  templateUrl: './agent-signup.component.html',
  styleUrls: ['./agent-signup.component.css']
})
export class AgentSignupComponent implements OnInit {

  Postcodes:any[]= [{ Postcode:''}];
  return: any;
  isAgentSelected:boolean=false;
  userData: any;
 
  agentSignup: agentSignup = new agentSignup();
  isLoggedIn: Boolean = true;
  myForm: any;
  _fb: any;
  image: any;
  bodyText: any;
  finalImage: string;

  constructor(

    public authService: AuthService,
    public afAuth: AngularFireAuth,
    private stateService: StateServiceService,
    private formsService: FormsService,
    public HttpService:HttpService
  ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        this.LoggedIn();
      } else {
        localStorage.setItem("user", null);
        this.LoggedOut();
      }
    });
this.HttpService.getAgentsingupLogin().subscribe((data)=>{
  console.log(data)

  this.image = data[0].BodyImage.url
  this.bodyText = data[0].BodyText

  this.finalImage = 'http://134.209.93.8' + this.image
  console.log(  this.finalImage)
})
  }
  
  private LoggedIn() {
    this.isLoggedIn = true;
  }
  private LoggedOut() {
    this.isLoggedIn = false;
  }
  
 
}
