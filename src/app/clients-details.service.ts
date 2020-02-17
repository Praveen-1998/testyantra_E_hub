import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsDetailsService {
  clientsDetails: any;
  backendUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {
   }

  postClientDetails(details, imagename): Observable<any> {
    console.log(details.clientName);
    const obj = {
      details,
      imagename
    };
    console.log(obj);
    return this.http.post(`${this.backendUrl}/postClientDetails`, obj);
  }



  getClientsDetails() {
  return this.http.get(`${this.backendUrl}/getClientDetails`);
      }

  updateClientDetails(clientsDetails): Observable<any> {
    const obj = {
      clientsDetails
    };
    return this.http.post(`${this.backendUrl}/updateClientDetails`, obj);
      }

    deleteClientdetails(id) {
    return this.http.delete(`${this.backendUrl}/deleteClientDetails/${id}`);

    }
}
