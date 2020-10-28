import { Component, ViewChild,
  OnInit,
  Inject,
  ElementRef,
  PLATFORM_ID} from '@angular/core';
import { FormsService } from '../../../Home/Property/fillFormBuyer/fillFormBuyer.service';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { EdiProfileComponent } from "./ediProfileSubmission.component"
import {
  VERSION,
  MatDialogRef,
  MatDialog,
  MatSnackBar,
  MAT_DIALOG_DATA,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatDialogConfig
} from "@angular/material";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { HttpService } from "../../../http.service"
import { Location } from "@angular/common";

@Component({
  selector: 'app-editProfile',
  templateUrl: './editProfile.component.html',
  styleUrls: ['./editProfile.component.css']
})
export class EditProfileComponent implements OnInit {
  @ViewChild('Names',{static:false}) NameView : ElementRef
 @ViewChild ('phone',{static:false}) phoneView:ElementRef
 @ViewChild ('dateofbirth',{static:false}) dateofbirthView:ElementRef
 @ViewChild ('addressed',{static:false}) addressView:ElementRef
  user: any;
  return: any;
  uid: any;
  DOB: any;
  isLoading: boolean = false
  getUser: any;
  dataItem: any;
  Name: any;
  Email: any;
  Phone: any;
  Currentaddress: any;
  email: any;
  prefrence: any;
  id: any;
  getUsers: any;
  constructor(private fillFormsService: FormsService,
    private router: Router, private dialog: MatDialog,
    public HttpService: HttpService,
    private _location: Location) { }

  ngOnInit() {


    this.getUsers = JSON.parse(sessionStorage.getItem("currentUser"));
    this.id = this.getUsers.id
    this.dataItem = this.getUser
    this.HttpService.getUsers(this.id).subscribe((data) => {
      this.dataItem = data
      this.Name = this.dataItem.username,
      this.email = this.dataItem.email
      this.Phone = this.dataItem.Phone
      this.DOB = this.dataItem.dob
      this.Currentaddress = this.dataItem.CurrentAddress
      this.prefrence = this.dataItem.prefrences
    })





  }
  emailFormControl = new FormControl("", [
    Validators.required,

  ]);

  dobFormControl = new FormControl("", [
    Validators.required,

  ]);
  phoneFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),

  ]);
  addressFormControl = new FormControl("", [
    Validators.required,

  ]);

  userDetail(Name, email, Phone, DOB, Address, prefrence) {
    console.log(Name, email, Phone, DOB, Address, prefrence)
    if (this.Name == null || this.Name.length == 0) {
      const dialogRef = this.dialog.open(EdiProfileComponent, {
        data: { message: "Please fill username" }
      });
      this.NameView.nativeElement.focus()
      document.getElementById("name").style.border = "5px solid red"

    }
    else if (this.email == null) {
      const dialogRef = this.dialog.open(EdiProfileComponent, {
        data: { message: "Please fill email id" }
      });
      document.getElementById("name").style.border = "5px solid red"


    }
    else if (this.Phone == null || this.Phone.length == 0) {

      const dialogRef = this.dialog.open(EdiProfileComponent, {
        data: { message: "Please fill phone number" }
      });
      this.phoneView.nativeElement.focus()
      document.getElementById("name").style.border = "none"
      document.getElementById("phone").style.border = "5px solid red"


    }
    else if (this.DOB == null || this.DOB.length == 0) {
      const dialogRef = this.dialog.open(EdiProfileComponent, {
        data: { message: "Plaese fill date of birth" }
      });
      this.dateofbirthView.nativeElement.focus()
      document.getElementById("name").style.border = "none"
      document.getElementById("phone").style.border = "none"
      document.getElementById("dob").style.border = "5px solid red"
    }
    else if (Math.floor(Math.abs(Date.now() - new Date(this.DOB).getTime()) / (1000 * 3600 * 24) / 365.25)
      < 18) {
      const dialogRef = this.dialog.open(EdiProfileComponent, {
        data: { message: "Age must be 18+" }
      });
      document.getElementById("name").style.border = "none"
      document.getElementById("phone").style.border = "none"
      document.getElementById("dob").style.border = "5px solid red"
    }
    else if (this.Currentaddress == null || this.Currentaddress.length == 0) {
      const dialogRef = this.dialog.open(EdiProfileComponent, {
        data: { message: "Please fill current address" }
      });
      this.addressView.nativeElement.focus()
      document.getElementById("name").style.border = "none"
      document.getElementById("phone").style.border = "none"
      document.getElementById("dob").style.border = "none"
      document.getElementById("address").style.border = "5px solid red"
    }
    else if (this.prefrence == null) {
      const dialogRef = this.dialog.open(EdiProfileComponent, {
        data: { message: "Please choose your prefrences" }
      });
      document.getElementById("name").style.border = "none"
      document.getElementById("phone").style.border = "none"
      document.getElementById("dob").style.border = "none"
      document.getElementById("address").style.border = "none"
      document.getElementById("prefrence").style.border = "5px solid red"

    }
    else {
      this.isLoading = true
      document.getElementById("name").style.border = "none"
      document.getElementById("phone").style.border = "none"
      document.getElementById("dob").style.border = "none"
      document.getElementById("address").style.border = "none"
      document.getElementById("prefrence").style.border = "none"
      this.HttpService.editUsers(this.id, Name, email, Phone, DOB, Address, prefrence).subscribe((data) => {
        this.isLoading = false
        this.alert()
      });

    }
  }


  alert() {
    const dialogRef = this.dialog.open(EdiProfileComponent, {
      data: { message: "Your Profile has been updated" }
    });
  }

  backClicked() {
    this._location.back();
  }
}