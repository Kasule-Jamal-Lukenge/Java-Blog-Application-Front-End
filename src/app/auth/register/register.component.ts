import { Component, signal } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  constructor(private fb : FormBuilder, private authService : AuthService, private router: Router){
    this.registrationForm = this.fb.group({
      username : ['', Validators.required],
      email : ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    });
  }

  submit(){
    if(this.registrationForm.invalid){
      return;
    }

    const { username, email, password } = this.registrationForm.value;

    this.authService.register({username, email, password}).subscribe({
      next: () => {
        console.log("Registered Successfully");
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error("Oops!!! Something went wrong");
      }
    });

  }

}
