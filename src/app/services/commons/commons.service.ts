import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CommonsService {

  constructor(private router: Router) { }

  redirectToHomePage() {
    this.router.navigate(['/'])
      .then(r => console.log("Permission denied. Redirect to main view.", r));
  }
}
