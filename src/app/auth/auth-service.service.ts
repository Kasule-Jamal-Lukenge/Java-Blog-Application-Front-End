import { HttpClient } from '@angular/common/http';
import { Injectable, signal, effect } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  //signal to track login state
  isLoggedIn = signal<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) { 
    effect(() => {
      console.log('Login state changed', this.isLoggedIn());
    });
  }

  // login(credentials: { username: string, password:string}){
  //   return this.http.post<{token:string}>('/api/auth/login', {email,password}).subscribe({
  //     next:(res) => {
  //       localStorage.setItem('token', res.token);
  //       this.isLoggedIn.set(true);
  //       this.router.navigate(['/posts']);
  //     },
  //     error: (err) => console.error('Login failed', err)
  //   });
  // }

  // register(data: {name:string, email:string, password:string}){
  //   return this.http.post(`${this.apiUrl}/register`, data).subscribe({
  //     next:()=>{
  //       console.log('Registration successful, redirecting to login...');
  //       this.router.navigate(['/login']);
  //     },
  //     error:(err) => console.error("Registration failed" + err)
  //   });
  // }

  login(credentials: { username: string; password: string; }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        this.setToken(response.token);
        this.isLoggedIn.set(true);
      })
    );
  }

  register(data: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  private setToken(token: string): void{
    localStorage.setItem('token', token);
  }

  logout(){
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  getToken(){
    return localStorage.getItem('token');
  }
  private hasToken(): boolean{
    // return !!localStorage.getItem('token');
    if(this.isBrowser()){
      return !!localStorage.getItem('token');
    }
    return false;
  }

  //helper function to check if we are in a browser
  private isBrowser(): boolean{
    return typeof window !== 'undefined' && typeof localStorage != 'undefined';
  }

}
