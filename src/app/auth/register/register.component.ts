import { Component, signal } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth-service.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  registrationForm : FormGroup;
  errorMessage = signal('');
  successMessage = signal('');

  constructor(private fb : FormBuilder, private authService : AuthService, private router: Router){
    this.registrationForm = this.fb.group({
      username : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit(){
    if(this.registrationForm.invalid){
      this.registrationForm.markAllAsTouched();
      return;
    }

    const { username, email, password } = this.registrationForm.value;

    this.authService.register({username, email, password}).subscribe({
      next: () => {
        console.log("Registered Successfully");
        this.successMessage.set("Registered Successfully!!! Please Proceed To Login");
        setTimeout(()=>this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        console.error("Oops!!! Something went wrong");
        this.errorMessage.set("Oops!!! Something went wrong");
      }
    });

  }

}
