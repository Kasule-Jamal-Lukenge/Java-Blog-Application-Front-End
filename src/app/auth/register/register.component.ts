import { Component, signal } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  registrationForm : FormGroup;
  errorMessage = signal('');

  constructor(private fb : FormBuilder, private authService : AuthService){
    this.registrationForm = this.fb.group({
      name : ['', Validators.required],
      email : ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    });
  }

  submit(){
    if(this.registrationForm.invalid){
      return;
    }

    const { name, email, password } = this.registrationForm.value;

    this.authService.register(name, email, password);

  }

}
