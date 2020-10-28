import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { listingBuyer } from './Model/listingBuyer';
import { map } from 'rxjs/operators';

export interface Config {
  Currentpostcode: string;
  Lookingpostcode: any;
  latitude: any;
  longitude: any;
  result:any;
}
@Injectable({
  providedIn: "root"
})
export class HttpService {
  headers: any;
  latUrl="https://api.postcodes.io/postcodes/"
  configUrl = "https://api-full.addressian.co.uk/postcode/";
  listingBuyer: any;

  StrapiUrl = "http://134.209.93.8"

  
  constructor(private http: HttpClient) {

  }

  search(query: string): any {
    const headerDict = {
      "x-api-key": "BcLIABSb6J3HsvGTpI5jA8FrtOaQqR67736r1Hip"
    };

    const url = "https://api-full.addressian.co.uk/postcode/";
    return this.http.get(url + query, {
      headers: new HttpHeaders(headerDict)
    });
  }

 
getLat(Lookingpostcode) {

  return this.http.get(this.latUrl + Lookingpostcode);
 }

sentEmail(url,data)
{
  return this.http.post(url,data)
}

buyerEntries(UserId)
{
  return this.http.get<any>(this.StrapiUrl + "/listing-buyers?&UserId=" + UserId)
}


sellerEntries(UserId)
{
  return this.http.get<any>(this.StrapiUrl + "/listing-sellers?&UserId=" + UserId)
}

buyerMatches()
{
  return this.http.get<any>(this.StrapiUrl + "/listing-sellers")
}
sellerMatches()
{
  return this.http.get<any>(this.StrapiUrl + "/listing-buyers")
}

matchesBuyer(Lookingpostcode,Lookingstate,LookingTown,PropertyCondition,MaxAmount,LookingAddress,ownership,PropertyType,features,UserId,Maxrooms,Maxreception,PropertyFor,matchStatus,Maxbathrooms,MinAmount,myId)
{
  return this.http.post(this.StrapiUrl + "/matches-buyers",{
    Lookingpostcode,Lookingstate,LookingTown,PropertyCondition,MaxAmount,LookingAddress,ownership,PropertyType,features,UserId,Maxrooms,Maxreception,PropertyFor,matchStatus,Maxbathrooms,MinAmount,myId
  })
}
matchesSeller(Lookingpostcode,LookingStreetname,PropertyType,Conditions,ChainStatus,FinancialPosition,MinAmount,MaxAmount,Validity,Type,Position,UserId,PropertyFor,matchStatus,myId,buyerId)
{
  return this.http.post(this.StrapiUrl + "/matches-sellers",{
    Lookingpostcode,LookingStreetname,PropertyType,Conditions,ChainStatus,FinancialPosition,MinAmount,MaxAmount,Validity,Type,Position,UserId,PropertyFor,matchStatus,myId,buyerId
  })
}
matchesSellerSeller(Lookingpostcode,LookingStreetname,PropertyType,Conditions,ChainStatus,FinancialPosition,MinAmount,MaxAmount,Validity,Type,Position,UserId,PropertyFor,matchStatus,myId,Roomsmax,Ownership,Maxbathrooms,Maxreception,features,PropBuyerId)
{
  return this.http.post(this.StrapiUrl + "/matches-sellers",{
    Lookingpostcode,LookingStreetname,PropertyType,Conditions,ChainStatus,FinancialPosition,MinAmount,MaxAmount,Validity,Type,Position,UserId,PropertyFor,matchStatus,myId,Roomsmax,Ownership,Maxbathrooms,Maxreception,features,PropBuyerId
  })
}



matchesSellerBuyer(Lookingpostcode,Lookingstate,LookingTown,PropertyCondition,MaxAmount,LookingAddress,ownership,PropertyType,features,UserId,Maxrooms,Maxreception,PropertyFor,matchStatus,Maxbathrooms,MinAmount,myId,Roomsmax,sellerId)
{
  return this.http.post(this.StrapiUrl + "/matches-buyers",{
    Lookingpostcode,Lookingstate,LookingTown,PropertyCondition,MaxAmount,LookingAddress,ownership,PropertyType,features,UserId,Maxrooms,Maxreception,PropertyFor,matchStatus,Maxbathrooms,MinAmount,myId,Roomsmax,sellerId

  })
 
}




sellerEditing(id,Country,LookingAddress,LookingStreetname,LookingTown,Lookingpostcode,Lookingstate,MaxAmount,Maxbathrooms,Maxreception,PropertyCondition,PropertyFor,PropertyType,features,latitude,longitude,ownership,username,usertitle,UserId,Maxrooms,Currentpostcode,Currentstate,CurrentTowncity,Currentaddress)
{
 return this.http.put<any>( this.StrapiUrl + "/listing-sellers/"+ id , {
  Country,LookingAddress,LookingStreetname,LookingTown,Lookingpostcode,
  Lookingstate,MaxAmount,Maxbathrooms,Maxreception,PropertyCondition,
   PropertyFor,PropertyType,features,latitude,
   longitude,ownership,username,usertitle,
   UserId,Maxrooms,Currentpostcode,Currentstate,CurrentTowncity,Currentaddress


 });
}

propertyId(propertyId,UserId,Type)
{
  return this.http.post<any>( this.StrapiUrl + "/expressed-interests"  ,{
    propertyId,UserId,Type
  } )
}

getPropertyId()
{
  return this.http.get<any>( this.StrapiUrl + "/expressed-interests")
}

postPropertyIdMatches(propertyId,UserId,Type)
{
  return this.http.post<any>( this.StrapiUrl + "/expressmatches",{
    propertyId,UserId,Type
  })
}
getPropertyIdMatches()
{
  return this.http.get<any>( this.StrapiUrl +"/expressmatches")
}

getMatchesBuyer()
{
   return this.http.get<any>(this.StrapiUrl +"/matches-buyers")
}
getMatchesSeller()
{
   return this.http.get<any>(this.StrapiUrl +"/matches-sellers")
}


getAgents()
{
  return this.http.get<any>(this.StrapiUrl + "/Agents")
}
getAgentsProfile(id)
{
  return this.http.get<any>( this.StrapiUrl + "/Agents?&uid=" + id)
}
 putAgents(id,Fullname,Address,Postcode,Phonenumber,Jobtitle,SinglePercentage,Multipercentage)
 {
  return this.http.put(this.StrapiUrl + "/Agents/" + id ,{Fullname,Address,Postcode,Phonenumber,Jobtitle,SinglePercentage,Multipercentage})

 }
 getagentByid(id)
 {
  return this.http.get<any>( this.StrapiUrl + "/Agents/" + id)

 }



getNotification()
{
  return this.http.get<any>(this.StrapiUrl + "/notifications")

}

postNotification(id,Time,Type,UserId,Lastseen)
{
  return this.http.put<any>( this.StrapiUrl + "/notifications/" + id,{Time,Type,UserId,Lastseen})
}

createNotification(Time,Type,UserId)
{
  return this.http.post<any>(this.StrapiUrl + "/notifications",{Time,Type,UserId})

}

postAgentBuyer(Lookinpostcode,ChainStatus,Roomsmax,PropertyCondition,Conditions,MinAmount,type,MaxAmount,UserId,uid)
{
  return this.http.post<any>(this.StrapiUrl + "/agentbuyers",{Lookinpostcode,ChainStatus,Roomsmax,PropertyCondition,Conditions,MinAmount,type,MaxAmount,UserId,uid})

}

postAgentSeller(LookingAddress,LookingTown,Lookingpostcode,Lookingstate,MaxAmount,Maxbathrooms,Maxbathroom,Maxreception,Roomsmax,PropertyCondition,PropertyType,UserId,features,ownership,uid)
{
  return this.http.post<any>(this.StrapiUrl + "/agent-sellers",{LookingAddress,LookingTown,Lookingpostcode,Lookingstate,MaxAmount,Maxbathrooms,Maxbathroom,Maxreception,Roomsmax,PropertyCondition,PropertyType,UserId,features,ownership,uid})
}

getagentBuyer()
{
  return this.http.get<any>(this.StrapiUrl + "/agentbuyers")

}
getagentSeller()
{
  return this.http.get<any>(this.StrapiUrl + "/agent-sellers")

}


getExpressedMatches(uid)
{
  return this.http.get<any>(this.StrapiUrl + "/expressmatches?&UserId=" + uid)
}
getExpressedInterest(uid)
{
  return this.http.get<any>( this.StrapiUrl + "/expressed-interests?&UserId=" + uid)
}

deleteAnBuyerEntry(id)
{
  return this.http.delete(this.StrapiUrl + "/listing-buyers/" + id)
}
deleteAnSellerrEntry(id)
{
  return this.http.delete(this.StrapiUrl + "/listing-sellers/" + id)
}

getUsers(id)
{
  return this.http.get(this.StrapiUrl + "/Users/" + id)
}
getAllUsers(email)
{
  return this.http.get(this.StrapiUrl + "/Users?email=" + email )
}

editUsers(id,username,email,Phone,dob,CurrentAddress,prefrences)
{
  return this.http.put(this.StrapiUrl + "/Users/" + id,{
    username,email,Phone,dob,CurrentAddress,prefrences
  })
}
addUsersDetails(id,FullName,email,Phone,dob,title)
{
  return this.http.put(this.StrapiUrl + "/Users/" + id,{
    FullName,email,Phone,dob,title
  })
}

addUsersSellerDetails(id,username,email,Phone,dob,title,Currentpostcode,CurrentAddress,CurrentTown,Currentstate)
{
  return this.http.put( this.StrapiUrl + "/Users/" + id,{
    username,email,Phone,dob,title,Currentpostcode,CurrentAddress,CurrentTown,Currentstate
  })
}

sellerProperties(id)
{
  return this.http.get<any>(this.StrapiUrl+ "/listing-sellers/" + id)
}
buyerProperties(id)
{
   return this.http.get<any>(this.StrapiUrl + "/listing-buyers/" + id)
}

getHomePageImage()
{
  return this.http.get( this.StrapiUrl + "/home-pages")

}
getHomeMatchesPageImage()
{
  return this.http.get(this.StrapiUrl + "/home-matches-pages")
}
getBlueNotificationContent()
{
return this.http.get(this.StrapiUrl + "/blue-notification-texts")
}
addUsersSignupDetails(id,AgentType)
{
  return this.http.put(this.StrapiUrl + "/Users/" + id,{
    AgentType
  })
}
detailsToAgent(BuyerUid,SellerUid,AgentUid,Postcode,PropertyType,MinAmount,MaxAmount,ChainStatus,PropertyFor)
{
  return this.http.post(this.StrapiUrl + "/property-detail-agents",{
    BuyerUid,SellerUid,AgentUid,Postcode,PropertyType,MinAmount,MaxAmount,ChainStatus,PropertyFor
  })
}
getdetailsToAgent()
{
  return this.http.get<any>(this.StrapiUrl + "/property-detail-agents")
}

getTerms()
{
  return this.http.get<any>(this.StrapiUrl + "/termsandconditions")
}
getPrivacy()
{
  return this.http.get<any>(this.StrapiUrl + "/privacy-policies")
}

getAllExpressedInterest(uid,property)
{
  return this.http.get<any>( this.StrapiUrl + "/expressed-interests?&UserId=" + uid + "&propertyId=" + property)
}
getAllExpressedMatches(uid,property)
{
  return this.http.get<any>( this.StrapiUrl + "/expressmatches?&UserId=" + uid + "&propertyId=" + property)
}

getSignupUpTerms()
{
  return this.http.get<any>(this.StrapiUrl + "/signup-terms")
}
getSellerAllData(id)
{
  return this.http.get<any>( this.StrapiUrl + "/listing-sellers?&id=" + id)
}

getBuyerAllData(id)
{
  return this.http.get<any>( this.StrapiUrl + "/listing-buyers?&id=" + id)
}

getValidityError()
{
  return this.http.get<any>( this.StrapiUrl + "/validity-errors" )
}

getAgentsingupLogin()
{
  return this.http.get<any>(this.StrapiUrl + "/agent-signup-areas")
}

getTextalreadyexpressed()
{
  return this.http.get<any>( this.StrapiUrl + "/text-already-expresseds")
}
userDetailName(id,FullName) {
  return this.http.put("http://134.209.93.8/Users/" + id, {FullName })
}

getHomePageBlogs()
{
  return this.http.get( this.StrapiUrl + "/blogs")
}


getRightFormImages()
{
  return this.http.get(  this.StrapiUrl +  "/form-right-images/1")

}

getFooterSocial()
{
  return this.http.get( this.StrapiUrl +  "/footers/1")
}
}