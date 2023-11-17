import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  AfterViewInit,
  Input,
  HostBinding
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from '../../services/auth/token-storage.service';
import {NavItem, navItems} from './nav-item';
import {VERSION} from '@angular/material/core';
import {NavigationService} from '../../services/navigation/navigation.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnInit {

  private roles: string[] | undefined;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string | undefined;

  private readonly isMobileResolution: boolean;
  version = VERSION;

  @Output() public sidenavToggle = new EventEmitter();

  expanded: boolean | undefined;
  @HostBinding('attr.aria-expanded') ariaExpanded = this["expanded"];
  @Input() depth: number;
  @Input() item: NavItem | undefined;

  constructor(private http: HttpClient,
              public router: Router,
              public navigationService: NavigationService,
              private tokenStorageService: TokenStorageService) {
    this.isMobileResolution = window.innerWidth < 768;
    this.depth = 0;
  }

  title = 'Oskarro.com';

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

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  public getIsMobileResolution(): boolean {
    return this.isMobileResolution;
  }

}
