import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AgenthttpService {

  baseUrl: "http://134.209.93.8"
  userData: any; // Save logged in user data
  public authToken: string;

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  constructor(private http: HttpClient) { }

  //Strapi Database Name Agents
  AgentDetails(Fullname, Email, Phonenumber, SinglePercentage, Multipercentage, Postcode, Companyname, Address, Jobtitle, uid, Image) {
    return this.http.post("http://134.209.93.8/Agents", { Fullname, Email, Phonenumber, SinglePercentage, Multipercentage, Postcode, Companyname, Address, Jobtitle, uid, Image })
  }





  //Update DB in USERS  as Signup is Agent
  userTypeAgent(id, AgentType,FullName) {
    return this.http.put("http://134.209.93.8/Users/" + id, { AgentType,FullName })
  }





}
