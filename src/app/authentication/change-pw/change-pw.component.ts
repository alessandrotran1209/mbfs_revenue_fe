import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
@Component({
  selector: 'app-change-pw',
  templateUrl: './change-pw.component.html',
  styleUrls: [
    './change-pw.component.scss',
    '../login/login.component.scss',
    '../../../utils/dist/css/adminlte.min.css',
    '../../../utils/plugins/icheck-bootstrap/icheck-bootstrap.min.css',
  ],
})
export class ChangePwComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}
  form!: FormGroup;
  ngOnInit(): void {
    this.reactiveForm();
  }

  reactiveForm() {
    this.form = this.fb.group({
      password: this.fb.control('', [Validators.required]),
      confirmPassword: this.fb.control('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      reconfirmPassword: this.fb.control('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    this.form.addValidators([
      this.passwordMatcherValidator(),
      this.confirmpasswordMatcherValidator(),
    ]);
  }

  confirmpasswordMatcherValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const condition =
        this.form.controls['confirmPassword'].value !=
        this.form.controls['reconfirmPassword'].value;
      return condition ? { mismatch: true } : null;
    };
  }

  passwordMatcherValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (
        this.form.controls['password'].value == '' &&
        this.form.controls['confirmPassword'].value == ''
      ) {
        return null;
      }
      const condition =
        this.form.controls['password'].value ==
        this.form.controls['confirmPassword'].value;
      return condition ? { passwordmatcher: true } : null;
    };
  }

  onSubmit() {}
}
