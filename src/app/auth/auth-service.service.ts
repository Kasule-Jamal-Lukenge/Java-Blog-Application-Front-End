import { HttpClient } from '@angular/common/http';
import { Injectable, signal, effect } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  //signal to track login state
  isLoggedIn = signal(!!localStorage.getItem('token'));

  constructor(private http: HttpClient, private router: Router) { 
    effect(() => {
      console.log('Login state changed', this.isLoggedIn());
    });
  }

  login(email: string, password:string){
    return this.http.post<{token:string}>('/api/auth/login', {email,password}).subscribe({
      next:(res) => {
        localStorage.setItem('token', res.token);
        this.isLoggedIn.set(true);
        this.router.navigate(['/posts']);
      },
      error: (err) => console.error('Login failed', err)
    });
  }

  register(name:string, email:string, password:string){
    return this.http.post('/api/auth/register', {name, email, password}).subscribe({
      next:()=>{
        console.log('Registration successful, redirecting to login...');
        this.router.navigate(['/login']);
      },
      error:(err) => console.error("Registration failed" + err)
    });
  }

  logout(){
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  getToken(){
    return localStorage.getItem('token');
  }

}
