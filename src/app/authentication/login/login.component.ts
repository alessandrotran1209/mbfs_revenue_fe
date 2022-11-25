import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss',
    '../../../utils/dist/css/adminlte.min.css',
    '../../../utils/plugins/icheck-bootstrap/icheck-bootstrap.min.css',
    '../../../utils/plugins/fontawesome-free/css/all.min.css',
  ],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.reactiveForm();

    if (this.tokenStorage.isAuthenticated()) {
      this.isLoggedIn = true;
      this.router.navigate(['']);
    }
  }

  form!: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  onSubmit() {
    const form_data = this.form.value;

    this.authService.login(form_data.username, form_data.password).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.access_token);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['/dashboard']);

        // this.reloadPage();
      },
      (err) => {
        console.log(err);
        this.errorMessage = err.error.detail;
        this.isLoginFailed = true;
      }
    );
  }

  reactiveForm() {
    this.form = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    });
  }
}
