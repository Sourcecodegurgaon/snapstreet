import { Component, OnInit } from '@angular/core';
import {HttpService}   from '../../http.service'
@Component({
  selector: 'app-Footer',
  templateUrl: './Footer.component.html',
  styleUrls: ['./Footer.component.css']
})
export class FooterComponent implements OnInit {
facebook;
Instagram;
Twitter;
social;
  constructor( private HttpService: HttpService,) { }

  ngOnInit() {
    this.HttpService.getFooterSocial().subscribe((footer)=>{
      this.social = footer
      this.facebook =  this.social.Facebook
      this.Instagram = this.social.Instagram
      this.Twitter  = this.social.Twitter
 
    })
  }
  
}
