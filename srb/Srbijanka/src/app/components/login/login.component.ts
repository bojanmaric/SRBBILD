import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core';
import { LoginService } from '../../servisi/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  korisnik = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['']

  });
  constructor(private fb: FormBuilder, private router: Router, private logiService: LoginService, private _snackBar: MatSnackBar) { }
  hide = true;
  showSpiner = false;
  ngOnInit(): void {
  }
  logi() {

    if (this.korisnik.valid) {
      this.showSpiner = true;
      this.logiService.loginUser(this.korisnik.value).subscribe(
        res => {
          this.showSpiner = false;
          if (res['token'] == null) {
            this.korisnik.reset();

            this._snackBar.open('Greska', 'Undo', {
              duration: 2000
            });
          } else {
            this.logiService.storeUserData(res['token']);
            localStorage.setItem("user", JSON.stringify(res['user']));
            this.router.navigateByUrl('/');
            this._snackBar.open('Uspesno ste se ulogovali', 'Undo', {
              duration: 2000
            });
          }
        }, err => {
          this.showSpiner = false;
          this._snackBar.open(err['message'], 'Undo');

        })

    } else {
      this.showSpiner = false;
      this._snackBar.open('Greska', 'Undo', {
        duration: 1500
      });

    }


  }


}
