import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { SellerformService } from "../fillFormSeller.service";
import { AuthService } from "../../../../auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { StateServiceService } from "../../../../state-service.service";
import { listingSeller } from "../../../../Model/listingSeller";
 import {user} from "../../../../Model/user";
import {
  VERSION,
  MatDialogRef,
  MatDialog,
  MatSnackBar,
  MAT_DIALOG_DATA
} from "@angular/material";
import { AlertDialogComponent } from "./alertDialogSellerDataSubmission.component";
import { Location } from "@angular/common";
import { Config, HttpService } from "../../../../http.service";
import {ConfirmsellerDetailService} from  "./confirmseller-detail.service"
import{notification} from '../../../../Model/notification';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import axios from 'axios';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: "app-confirmSellerDetail",
  templateUrl: "./confirmSellerDetail.component.html",
  styleUrls: ["./confirmSellerDetail.component.css"]
})
export class ConfirmSellerDetailComponent  implements OnInit {
  return: any;
  userData: any;
  isLoggedIn: boolean;
  isLoading: boolean = false;  
  listingSeller: listingSeller;
  notification:notification;
  sellerUser:user;
  version = VERSION;
  isBuyer: boolean = false;
  result: any;
  postcodeCoordinates: any;
  user: any;
  uid: any;
  getUser: any;
  userDetails: any;
  id: any;
  dataItem;
  Name: any;
  email: any;
  Phone: any;
  DOB: any;
  Currentaddress: any;
  prefrence: any;
  title: any;
  Currentpostcode: any;
  CurrentAddress: any;
  CurrentTown: any;
  Currentstate: any;
  newdata;
  dataId: any;
  register:boolean = false
  sellerPicture; 
  sellerPictureUrl;
  constructor(
    private activatedRoute: ActivatedRoute,
    private SellerformService: SellerformService,
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    private stateService: StateServiceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private _location: Location,
    private postcodeService: HttpService,
    private  ConfirmsellerDetailService: ConfirmsellerDetailService,
    private router:Router,
    private http: HttpClient,
   
  
  ) {}

  ngOnInit() {
    this.getUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.uid = this.getUser.id
    if (this.getUser != null) {
      this.userDetails = JSON.parse(localStorage.getItem("userDetail"))
      console.log(this.userDetails)
      this.id = this.getUser.id
      this.userData = this.getUser.user;
      this.isLoggedIn = true;
      this.LoggedIn()
      this.postcodeService.getUsers(this.getUser.id).subscribe((data) => {
        this.dataItem = data
        this.Name = this.dataItem.username,
          this.email = this.dataItem.email
        this.Phone = this.dataItem.Phone
        this.DOB = this.dataItem.dob
        this.Currentaddress = this.dataItem.Address
        this.prefrence = this.dataItem.prefrences
        this.title = this.dataItem.title
        this.Currentpostcode = this.dataItem.Currentpostcode
        this.CurrentAddress = this.dataItem.CurrentAddress
        this.CurrentTown = this.dataItem.CurrentTown
        this.Currentstate = this.dataItem.Currentstate
      })

    }
    
      this.sellerPicture = JSON.parse(localStorage.getItem('uploadedImage'));
     
    console.log(JSON.parse(this.sellerPicture))
   
  

    this.listingSeller = this.stateService.listingSeller;
   
    //For Seller
    this.postcodeService.getLat(this.listingSeller.Lookingpostcode.trim()).subscribe(data => {
      this.postcodeCoordinates = data;
      (this.listingSeller.longitude = this.postcodeCoordinates.result.longitude),
      (this.listingSeller.latitude = this.postcodeCoordinates.result.latitude),
    
      (this.isBuyer = true);
      this.isBuyer = false;
    });
  }

  submitForm() {
    this.listingSeller.UserId = this.userData.uid
    this.isLoading = true;
    this.listingSeller.username =  this.user.Name
  this.listingSeller.usertitle = this.user.title
    this.return = this.SellerformService.createCustomer(
      this.userData.uid,
      this.listingSeller
    ).then(data => {
      if (data == true) {
        this.isLoading = false;
        const dialogRef = this.dialog.open(AlertDialogComponent, {
          data: {
            message: "HelloWorld",
       
            buttonText: {
              cancel: "Done"
            }
          }
        });
      }
    });
  }

  private LoggedIn() {
    this.isLoggedIn = true;
  }
  private LoggedOut() {
    this.isLoggedIn = false;
  }
  backClicked() {
    this._location.getState();   
  }
  
  sellerForm()
  {
    this.isLoading = true

      this.postcodeService.getLat(this.listingSeller.Lookingpostcode.trim()).subscribe(data => {
        this.postcodeCoordinates = data;
        (this.listingSeller.longitude = this.postcodeCoordinates.result.longitude),
        (this.listingSeller.latitude = this.postcodeCoordinates.result.latitude),
        (this.isBuyer = true);
        this.isBuyer = false;
        this.http.post<any>("http://134.209.93.8/listing-sellers",{
          Country:this.stateService.listingSeller.Country,
         LookingAddress:this.stateService.listingSeller.LookingAddress,
          LookingStreetname:this.stateService.listingSeller.LookingTown,
          LookingTown:this.stateService.listingSeller.LookingTown,
          Lookingpostcode:this.stateService.listingSeller.Lookingpostcode,
         Lookingstate:this.stateService.listingSeller.Lookingstate,
          MaxAmount:this.stateService.listingSeller.MaxAmount,
          Maxbathrooms:this.stateService.listingSeller.Maxbathrooms,
          Maxreception:this.stateService.listingSeller.Maxreception,
          PropertyCondition:this.stateService.listingSeller.PropertyCondition,
          PropertyFor:this.stateService.listingSeller.PropertyFor,
          PropertyType:this.stateService.listingSeller.PropertyType,
          features:this.stateService.listingSeller.features,
          latitude:this.listingSeller.latitude,
          longitude:this.listingSeller.longitude,
         ownership:this.stateService.listingSeller.ownership,
          username:this.Name,
         usertitle:this.title,
         UserId:this.uid,
         Maxrooms:this.stateService.listingSeller.Maxrooms,
         Currentpostcode:this.Currentpostcode,
         Currentstate:this.Currentstate,
         CurrentTowncity:this.CurrentTown,
         Currentaddress:this.CurrentAddress,
         Picturl:this.sellerPicture
       },
     ).subscribe((data) => {   
      this.register = false
       this.isLoading = false;
       this.dataId = data.id
         const dialogRef = this.dialog.open(AlertDialogComponent, {
           data: {
             message: "HelloWorld",
             id:  this.dataId,
             buttonText: {
               cancel: "Done"
             }
           }
         });});
 

      
       
 
     });
  
 
    }
    overLay()
    {
      this.register = true
    }
  
}
