import { Component, OnInit } from "@angular/core";
import { MyListingService } from "./myListing.service";
import {MatDialog} from '@angular/material/dialog';
import {DeleteDataComponent} from "./deleteData.component";
import {HttpService} from "../../http.service"
@Component({
  selector: "app-myListing",
  templateUrl: "./myListing.component.html",
  styleUrls: ["./myListing.component.css"]
})

export class MyListingComponent implements OnInit {
  uid: any;
  user: any;
  propertyDetails = [];
  propertyRequirementDetails :any;
  docid:any;
  docs: any;
  itemscollection: any;
  newUser:boolean = false
  sellId: any;
  listingLength: any;
  buyerItemLength: any;
  sellerLength: number;
  getUser: any;
  
  constructor(private myrequirement_service: MyListingService,public dialog: MatDialog,private HttpService:HttpService) {}

  ngOnInit() {
    // User ID
    this.getUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.uid = this.getUser.id


this.getBuyerEntries()
 this.getSellerEntries()

  }


  deleteOrder(sellid)
  

  {
    this.HttpService.deleteAnSellerrEntry(sellid).subscribe((data)=>{
      const dialogRef = this.dialog.open(DeleteDataComponent);
      this.getSellerEntries()

    })
  }
 

  deletdeleteBuyer(buyid)
  {
    
    this.HttpService.deleteAnBuyerEntry(buyid).subscribe((data)=>{
      const dialogRef = this.dialog.open(DeleteDataComponent);
      this.getBuyerEntries()
    })
   
  }


  
  getBuyerEntries()
  {
    this.HttpService.buyerEntries(this.uid).subscribe((element)=>{
      this.propertyRequirementDetails = element
      this.buyerItemLength = this.propertyRequirementDetails.length
    
    });

  }

  getSellerEntries()
  {
    this.HttpService.sellerEntries(this.uid).subscribe((element)=>{
      this.propertyDetails = element
      console.log( this.propertyDetails)
      this.sellerLength = this.propertyDetails.length
    
    });

  }

}
