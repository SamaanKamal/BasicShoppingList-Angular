import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  
  authObservable: Observable<AuthResponseData>;

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
      this.authObservable = this.authService.signUp(form.value.email, form.value.password);
    }
    else {
      this.authObservable = this.authService.logIn(form.value.email, form.value.password);
    }

    this.authObservable.subscribe({
      next: (resonseData) => {
        console.log(resonseData);
        this.isLoading = false;
      },
      error: (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      },
    });

    form.reset();
  }
}
