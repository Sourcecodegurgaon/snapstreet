import { Component, OnInit } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { AuthService } from ".././auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpService } from '../http.service';
import { MyMatchesService } from "../Menu/myMatches/myMatches.service";
import { NestimatesHomeService } from "./nestimates-home/nestimates-home.service";
import { HomeMatchesService } from "./home-matches/home-matches.service";

@Component({
  selector: "app-Home",
  templateUrl: "./Home.component.html",
  styleUrls: ["./Home.component.css", "./../common.css"]
})

export class HomeComponent implements OnInit {
  selectedIndex = 0;
  maxNumberOfTabs = 2;
  isLoggedIn: Boolean = false;
  userData: any;
  boolean: boolean;
  isLoading: boolean = false;
  cookie: boolean = true;
  owner: any;
  seeker: any;
  value: any
  private _user: firebase.User;
  home: any;
  home2: any;
  Policy: void;
  checkPolicy: any;
  propertyRequirementDetails: any = [];
  propertyDetails: any = [];
  propertyLength: any;
  sellerLength: any;
  uid: any;
  checkMatches: boolean = false;
  checkNumberNestimates: any;
  buyerPoperty: any;
  sellerProperty: any;
  appMatches: boolean = false
  Componame;
  user: any;
  homePageImage;
  imageUrl;
  secondImageUrl;
  TopImageText: any;
  SecondImageText: any;
  step3Text: any;
  step3Image: any;
  Step2Image: any;
  Step2Text: any;
  Step1Image: any;
  Step1TExt: any;
  how: any;
  homePageBlogs;


  constructor(
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    private Router: Router,
    private HttpService: HttpService,
    private MatchesService: MyMatchesService,
    private myrequirement_service: NestimatesHomeService,

  ) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));

    if (this.user != null) {

      this.uid = this.user.id
      this.getallitems()

    }

    this.checkPolicy = JSON.parse(localStorage.getItem("Policy"));
    if (this.checkPolicy == false) {
      this.cookie = true
    }

    this.HttpService.getHomePageImage().subscribe((data) => {
      this.homePageImage = data
      this.imageUrl = this.homePageImage[0].TopbanImage.url

      this.TopImageText = this.homePageImage[0].TopImageOverText
      this.secondImageUrl = this.homePageImage[0].Secondhomepageimage.url
      this.SecondImageText = this.homePageImage[0].SecondImageOverText
      this.step3Text = this.homePageImage[0].TextStep3
      this.step3Image = this.homePageImage[0].Step3Image.url
      this.Step2Image = this.homePageImage[0].Step2Image.url
      this.Step2Text = this.homePageImage[0].Step2Text
      this.Step1Image = this.homePageImage[0].Step1Image.url
      this.Step1TExt = this.homePageImage[0].Step1TExt
      this.how = this.homePageImage[0].Howdoesnestimateworks
    })
    this.HttpService.getHomePageBlogs().subscribe((blog)=>{
      this.homePageBlogs = blog
    })



  }

  private LoggedIn() {
    this.isLoggedIn = true;
    this.cookie = false;
  }
  private LoggedOut() {
    this.isLoggedIn = false;
  }

  facebookLogin() {
    this.isLoading = true;

    this.authService.FacebookAuth().then(data => {
      this.isLoading = false;
    });
  }

  googleLogin() {
    this.isLoading = true;

    this.authService.GoogleAuth().then(data => {
      this.isLoading = false;
      this.isLoggedIn = true;
    });
  }

  signIn(email, pass) {
    this.isLoading = true;

    this.authService.SignIn(email, pass).then(data => {
      this.isLoading = false;
      this.isLoggedIn = true;
    });
  }


  closeCookie() {
    this.cookie = false
    this.Policy = localStorage.setItem("Policy", JSON.stringify(this.cookie))
  }

  homeradio(value) {
    if (value == this.home) {
      this.Router.navigate(["/fillFormBuyer/:Currentpostcode/:CurrentTown/:Currentstate/:Currentcountry/:Lookingpostcode/:LookingStreetname/:LookingTown/:Lookingstate/:Country/:FinancialPosition/:PropertyType/:Roommin/:Roomsmax/:MinAmount/:MaxAmount/:Validity/:Minbathroom/:Maxbathroom/:Minreception/:Maxreception/:Conditions/:Ownership/:CurrentAddress"]);
    }
    if (value == this.home2) {
      this.Router.navigate(["/fillformseller/:Lookingpostcode/:LookingAddress/:LookingTown/:Lookingstate/:PropertyType/:Maxrooms/:MaxAmount/:ownership/:Maxbathrooms/:Maxreception/:PropertyCondition/:Country"]);
    }

  }
  getallitems() {
    console.log(this.uid)
    this.HttpService.buyerEntries(this.uid).subscribe((data) => {

      this.propertyRequirementDetails = data
      this.buyerPoperty = this.propertyRequirementDetails.length

      this.HttpService.sellerEntries(this.uid).subscribe((data) => {

        this.propertyDetails = data

        this.sellerProperty = this.propertyDetails.length
        this.checkNumberNestimates = this.sellerProperty + this.buyerPoperty

        if (this.checkNumberNestimates > 0) {
          this.appMatches = true
          this.isLoggedIn = true
        }
        else {
          this.isLoggedIn = false
        }

      })

    })








  }
}
