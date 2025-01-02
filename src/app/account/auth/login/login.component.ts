import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from 'src/service/alert.service';
import { LoginService } from 'src/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isSignup = true;
  registerForm: FormGroup;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private toster: AlertService, private loginser: LoginService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onSignup() {
    if (this.registerForm.valid) {
      const req = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };
      localStorage.setItem('email', req.email);
      this.loginser.register(req).subscribe((res: any) => {
        if (res.statusCode == 0) {
          localStorage.setItem('userId', res.responseContent.id);
          if (res.responseContent.role == 'ROLE_ADMIN') {
            this.toster.showCustomPopup("success", 'Login Successfully');
            this.router.navigate(['/admin/']);
          }
          else if (res.responseContent.role == 'ROLE_USER') {
            this.toster.showCustomPopup("success", 'Login Successfully');
            this.router.navigate(['/']);
          }
        } else {
          this.toster.showCustomPopup("error", res.errorMessage);
        }
      });
    } else {
      this.toster.showCustomPopup('error', 'Invalid form. Please fill in all fields correctly.');
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      const req = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
      console.log(req);
      localStorage.setItem('email', req.email);
      this.loginser.login(req).subscribe((res: any) => {
        if (res.statusCode == 0) {
          console.log(res.responseContent);
          localStorage.setItem('userId', res.responseContent.id);
          if (res.responseContent.role == 'ROLE_ADMIN') {
            this.toster.showCustomPopup("success", 'Login Successfully');
            this.router.navigate(['/admin/']);
          }
          else if (res.responseContent.role == 'ROLE_USER') {
            this.toster.showCustomPopup("success", 'Login Successfully');
            this.router.navigate(['/']);
          }
        }
        else {
          this.toster.showCustomPopup('error', 'Invalid email or password');
        }
      });
      console.log('Login data:', this.loginForm.value);
    }
    else {
      this.toster.showCustomPopup('error', 'Invalid email or password');
    }
  }
}
