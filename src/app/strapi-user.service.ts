import { Injectable, NgZone } from '@angular/core';
import {StrapiUser} from "./strapiUser"
import { auth } from 'firebase/app';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import {StrapiAuthService} from "./strapi-auth.service"

@Injectable({
  providedIn: 'root'
})
export class StrapiUserService {

  private authApiBase: string = 'http://134.209.93.8';
  
  constructor(
    private httpClient: HttpClient,    
    public authService: StrapiAuthService,
  ) {    

  }

  // Sign in with email/password
  users() {
    return this.httpClient.get<any>(`${this.authApiBase}/users`, 
      { headers: {
        Authorization: `Bearer ${this.authService.authToken}`,
      }})
      .pipe(map(response => {
          return response;
      }));
  }

  me() {
    return this.httpClient.get<any>(`${this.authApiBase}/users/me`, 
      { headers: {
        Authorization: `Bearer ${this.authService.authToken}`,
      }})
      .pipe(map(response => {
          return response;
      }));
  }
}
