import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavItem, navItems} from "../navigation/nav-item";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {NavigationService} from "../../services/navigation/navigation.service";
import {TokenStorageService} from "../../services/auth/token-storage.service";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit, AfterViewInit {

  private roles: string[] | undefined;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string | undefined;
  private readonly isMobileResolution: boolean;

  @ViewChild('appDrawer') appDrawer: ElementRef;
  navItems: NavItem[] = navItems;

  constructor(private http: HttpClient,
              public router: Router,
              public navigationService: NavigationService,
              private tokenStorageService: TokenStorageService) {
    this.isMobileResolution = window.innerWidth < 768;
  }

  ngOnInit() {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.username = this.tokenStorageService.getUser().username;
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      if (this.roles != undefined) {
        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      }
    }
  }

  public getIsMobileResolution(): boolean {
    return this.isMobileResolution;
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  ngAfterViewInit() {
    this.navigationService.appDrawer = this.appDrawer;
  }

}
