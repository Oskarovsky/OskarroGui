import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Track} from '../../../track/model/track';
import {TrackService} from '../../../../../services/track/track.service';
import {TokenStorageService} from '../../../../../services/auth/token-storage.service';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-tracks-club',
  templateUrl: './tracks-club.component.html',
  styleUrls: ['./tracks-club.component.scss']
})
export class TracksClubComponent implements OnInit, AfterViewChecked {

  sub: Subscription;

  tracks: Track[];
  totalNumberOfTracks: number;
  totalNumberOfPages: number;
  numberOfPage: number;
  isLoggedIn = false;

  genre = 'club';
  currentPage: number;

  constructor(private trackService: TrackService,
              private tokenStorage: TokenStorageService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer) {
    this.sub = this.route.params.subscribe(params => {
      this.currentPage = params['page'] || 1;
    });

    this.trackService.getTrackPageByGenre(this.genre, +this.currentPage - 1).subscribe(trackResponse => {
      this.totalNumberOfTracks = trackResponse.totalElements;
      this.numberOfPage = trackResponse.numberPage;
      this.totalNumberOfPages = trackResponse.totalPages;
      this.tracks = trackResponse.trackList;
      this.secureAllUrl(this.tracks);
    });
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  ngAfterViewChecked() {
    this.tracks.forEach(t => {
      // this.getCoverImage(t.id);
      // console.log('ASSIGNED COVER FOR TRACK WITH ID: ' + t.id);
    });
  }

  secureAllUrl(allTracks: Track[]) {
    for (const track of allTracks) {
      const urlNoAuto = track.urlPlugin.replace('false', 'true');
      track.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(urlNoAuto);
    }
  }

  // tslint:disable-next-line:variable-name
  createRange(number: number) {
    const items: number[] = [];
    for (let i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

  nextPage(currentPage: string | number) {
    return +currentPage + 1;
  }

  previousPage(currentPage: number) {
    return currentPage - 1;
  }

}
