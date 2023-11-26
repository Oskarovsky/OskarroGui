import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auto-open-menu',
  templateUrl: './auto-open-menu.component.html',
  styleUrls: ['./auto-open-menu.component.scss']
})
export class AutoOpenMenuComponent {

  timedOutCloser: any;

  constructor() { }

  mouseEnter(trigger: any) {
    if (this.timedOutCloser) {
      clearTimeout(this.timedOutCloser);
    }
    trigger.openMenu();
  }

  mouseLeave(trigger: any) {
    this.timedOutCloser = setTimeout(() => {
      trigger.closeMenu();
    }, 50);
  }

}
