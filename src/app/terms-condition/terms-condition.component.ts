import { Component, OnInit } from '@angular/core';
import {HttpService}  from "../http.service"

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.css']
})
export class TermsConditionComponent implements OnInit {
  termsCondition: any;

  constructor(
    public HttpService:HttpService
  ) {
 

  }

  ngOnInit() {
    this.HttpService.getTerms().subscribe((data)=>{
    this.termsCondition  = data[0].Terms
    })
  }

}
