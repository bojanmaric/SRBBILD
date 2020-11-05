import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoginService}from '../../servisi/login.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  korisnikReg = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['',Validators.required],
    password: ['', Validators.required]

  });


  hide= true;
  showSpiner=false;
  constructor(private fb: FormBuilder,private _snackBar: MatSnackBar, private logservice:LoginService) { }

  ngOnInit(): void {
  }

  registration(){
    this.showSpiner=true;
      if(this.korisnikReg.valid){
        this.logservice.registerUser(this.korisnikReg.value).subscribe(
          res=>{
            this.showSpiner=false;
            this._snackBar.open('Uspešno ste se registrovali','Undo',{
              duration:1500
            });

          },
          err=>{
            this.showSpiner=false;
            this._snackBar.open('Greska prilikom registrovanja','Undo',{
              duration:1500
            });
          }

        )
      }else{
        this.showSpiner=false;
        this._snackBar.open('Greska','Undo',{
          duration:1500
        });
      }
    
  }
}
