import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../http.service"
@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
  privacyPolicy: any;

  constructor(public HttpService:HttpService) { }

  ngOnInit() {

    this.HttpService.getPrivacy().subscribe((data)=>{

      this.privacyPolicy = data[0].PrivacyPolicy
    })
  }

}
