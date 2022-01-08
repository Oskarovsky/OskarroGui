import { Component, OnInit } from '@angular/core';
import {Track} from '../../tracks/track/model/track';
import {TokenStorageService} from '../../services/auth/token-storage.service';
import {UploadFileService} from '../../services/storage/upload-file.service';
import {TrackService} from '../../services/track/track.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';
import {AlertService} from '../../services/alert/alert.service';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  currentUser: any;
  sub: Subscription;
  message = '';
  userAvatar: any;
  imageToShow: any;
  isImage = false;
  isImageLoading: any;
  tracks: Array<any>;
  favoriteTracksByUser: Track[] = [];
  userProfile: any;
  username: string;

  constructor(private tokenStorage: TokenStorageService,
              private uploadService: UploadFileService,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService,
              private userService: UserService,
              private sanitizer: DomSanitizer,
              private trackService: TrackService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.currentUser = this.tokenStorage.getUser();
      this.getUserProfile();
      this.getImageFromService(this.username);
      this.getLastAddedTracksByUsername(this.userProfile.username, 5);
      this.getAllFavoritesTracksByUser(this.userProfile.username);
    } else {
      this.alertService.warn('Zaloguj się, aby zobaczyć profil użytkownika.', { keepAfterRouteChange: true });
      this.redirect();
    }
  }

  getUserProfile() {
    this.sub = this.route.params.subscribe(params => {
      this.username = params['username'];
      if (this.username) {
        this.userService.getUserByUsername(this.username).subscribe(
          response => {
            this.userProfile = response;
          },
          error => {
            alert('An error with fetching user by username has occurred');
          }
        );
      }
    });
  }

  getImageFromService(username: string) {
    const reader = new FileReader();
    this.uploadService.getFile(username).subscribe(
      data => {
        reader.addEventListener('load', () => {
          this.imageToShow = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result as string);
        }, false);
        if (data) {
          if (data.size > 0) {
            this.isImage = true;
            reader.readAsDataURL(data);
          }
        }
      }, err => {
        console.log(err);
      });
  }

  public getLastAddedTracksByUsername(username: string, numberOfTracks: number) {
    this.trackService.getLastAddedTracksByUsername(username, numberOfTracks).subscribe(
      response => {
        this.tracks = response;
      },
      error => {
        alert('An error has occurred while fetching tracks');
      }
    );
  }

  getAllFavoritesTracksByUser(username: string) {
    this.trackService.getAllFavoritesTracksByUsername(username).subscribe((track: any) => {
      this.favoriteTracksByUser = track;
    });
  }

  redirect() {
    this.router.navigate(['/']);
  }

}
