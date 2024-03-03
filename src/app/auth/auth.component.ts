import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error:string = '';

  constructor(private authService:AuthService){}

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid)
    {
      return;  
    }
    this.isLoading = true;
    if (!this.isLoginMode)
    {
      this.authService.signUp(form.value.email, form.value.password).subscribe({
        next: (resonseData) => {
          console.log(resonseData);
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error);
          this.error='an error occured!'
          this.isLoading = false;
        },
      });
    }
    else {
      this.authService.logIn(form.value.email,form.value.password);
    }
    form.reset();
  }
}
