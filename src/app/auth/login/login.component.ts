import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth-service.service';


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

  constructor(private fb:FormBuilder, private authService: AuthService){
    this.loginForm = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit(){
    if(this.loginForm.invalid){
      return;
    }
    // const{email, password} = this.loginForm.value;
    const email = this.loginForm.value;
    const password = this.loginForm.value;

    this.authService.login(email, password);
  }
  
}
