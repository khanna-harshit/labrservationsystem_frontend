import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
   providedIn: 'root'
})
export class AuthService {
   isUserLoggedIn: boolean = false;
   users = 'http://localhost:3000/users';
   constructor(private http:HttpClient){}
   login(data:any): Observable<any> {
      
      
      let results= this.http.post(`${this.users}`, data);
      if(results){
        this.isUserLoggedIn = true;
        localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false"); 
      }
      return results;

   
   }

   logout(): void {
   this.isUserLoggedIn = false;
      localStorage.removeItem('isUserLoggedIn'); 
   }
   updatePassword(data:any):Observable<any>{
      return this.http.post(`${this.users}/changepassword`, data);
   }
  
}