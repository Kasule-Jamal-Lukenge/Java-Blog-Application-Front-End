import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = signal('');

  constructor(private fb:FormBuilder, private authService: AuthService, private router:Router){
    this.loginForm = this.fb.group({
      username : ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  submit(){
    if(this.loginForm.invalid){
      this.errorMessage.set("Please ensure that you have filled all fields.")
      return;
    }
    // const{email, password} = this.loginForm.value;
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.authService.login({username, password}).subscribe({
      next: ()=>{
        this.router.navigate(['/home']);
      },
      error:(err)=>{
        console.log("Something went wrong", err);
        this.errorMessage.set("Invalid Credentials");
      }
    });
  }
  
}
