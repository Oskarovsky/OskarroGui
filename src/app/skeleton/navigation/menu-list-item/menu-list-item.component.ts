import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import {Component, HostBinding, Input, OnInit} from '@angular/core';
import { NavItem } from '../nav-item';
import {NavigationService} from '../../../services/navigation/navigation.service';


@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuListItemComponent implements OnInit {
  expanded: boolean | undefined;
  @Input() item: NavItem | undefined;
  @Input() depth: number;

  constructor(public navService: NavigationService,
              public router: Router) {
    this.depth = 0;
  }

  ngOnInit() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item !== undefined && this.item.route && url) {
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
      }
    });
  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
      this.navService.closeNav();
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
}
