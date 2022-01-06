import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { TokenStorageService } from '../../services/auth/token-storage.service';
import { FACEBOOK_AUTH_URL } from '../../../assets/constants/app.const';
import {AlertService} from '../../services/alert/alert.service';
import {User} from "../../services/user/user";
import {UserService} from "../../services/user/user.service";
import {ActivatedRoute} from "@angular/router";

/**
 * Component binds form data (email, password) from template to AuthService.login() method that returns an Observable object.
 * If login is successful, it stores the token and calls the login() method.
 * */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  currentUser: any;
  errorMessage = '';
  roles: string[] = [];

  facebookAuthUrl = FACEBOOK_AUTH_URL;

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private route: ActivatedRoute,
              private userService: UserService,
              private alertService: AlertService) { }

  ngOnInit() {
    const token: string = this.route.snapshot.queryParamMap.get('token');
    const error: string = this.route.snapshot.queryParamMap.get('error');
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    else if(token){
      this.tokenStorage.saveToken(token);
      this.userService.getCurrentUser().subscribe(
        data => {
          this.login(data);
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    }
    else if(error){
      this.errorMessage = error;
      this.isLoginFailed = true;
    }
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      error => {
        this.alertService.error('Wystąpił błąd w trakcie logowania. Spróbuj ponownie!');
      }
    );
  }

  login(user:User): void {
    this.tokenStorage.saveUser(user);
    this.isLoggedIn = true;
    this.isLoginFailed = false;
    this.currentUser = this.tokenStorage.getUser();
    this.reloadPage()
  }

  reloadPage() {
    window.location.reload();
  }

}
