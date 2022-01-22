import { Component, OnInit } from '@angular/core';
import { Track } from '../track/model/track';
import {Subscription} from 'rxjs';
import {TokenStorageService} from '../../services/auth/token-storage.service';
import {TrackService} from '../../services/track/track.service';
import {User} from '../../services/user/user';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert/alert.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {UploadFileService} from '../../services/storage/upload-file.service';
import {Cover} from '../track/model/cover';
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-track-add',
  templateUrl: './track-add.component.html',
  styleUrls: ['./track-add.component.scss']
})
export class TrackAddComponent implements OnInit {

  track: Track;
  tempTrack: Track;
  sub: Subscription;
  isLoggedIn = false;
  username: string;
  showAdminBoard = false;
  currentFileName = '';

  currentUser: any;
  selectedFile: { item: (arg0: number) => File; };
  currentFile: File;
  message = '';

  modelTrack: Track = {
    id: null,
    title: '',
    artist: '',
    points: null,
    genre: null,
    version: '',
    createdAt: '',
    url: '',
    urlSource: null,
    urlPlugin: '',
    safeUrl: '',
    position: null,
    playlist: null,
    video: null,
    favoriteUsers: null,
    user: null,
    cover: null
  };

  modelUser: User = {
    id: null,
    username: '',
    email: '',
    password: '',
    createdAt: '',
    favoriteTracks: null,
    imageUrl: '',
    provider: '',
    providerId: null
  };

  genres: string[] = ['VIXA', 'CLUB', 'RETRO', 'DANCE', 'DISCO', 'TECHNO', 'MIXY/SETY'];

  urlSources: string[] = ['ZIPPYSHARE', 'KRAKENFILES'];

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router,
              private uploadService: UploadFileService,
              private alertService: AlertService,
              private userService: UserService,
              private trackService: TrackService) { }

  ngOnInit() {
    if (this.tokenStorageService.getToken() && this.tokenStorageService.getUser().roles.includes('ROLE_ADMIN')) {
      this.isLoggedIn = true;
      this.userService.collectUserData(this.tokenStorageService, this.modelUser)
    } else {
      this.redirect();
    }
  }

  public addNewTrack(title: string, artist: string, version: string, genre: string, url: string, urlSource: string) {
    const newTrack: Track = {
      id: null,
      title,
      artist,
      points: 0,
      genre,
      version,
      url,
      urlSource,
      urlPlugin: '',
      createdAt: '',
      safeUrl: '',
      position: null,
      playlist: null,
      video: null,
      favoriteUsers: null,
      user: this.modelUser,
      cover: null
    };

    const newCover: Cover = {
      id: null,
      name: '',
      type: '',
      url: '',
      track: null
    };

    if (genre === 'MIXY/SETY') {
      newTrack.genre = 'SET';
    } else {
      newTrack.genre = genre;
    }


    this.trackService.addTrack(newTrack).subscribe(
      response => {
        newTrack.title = title;
        newTrack.artist = artist;
        newTrack.genre = genre;
        newTrack.version = version;
        newTrack.url = url;
        newTrack.cover = newCover;
        this.track = response;
        this.router.navigateByUrl('/');
        this.alertService.success('Utwór został dodany na stronę!');
      },
      error => {
        this.alertService.error('Nie udało się dodać utworu. Sprawdź wprowadzone informacje i spróubuj jeszcze raz!');
      }
    );
  }


  // @ts-ignore
  selectFile(event) {
    this.selectedFile = event.target.files;
  }

  uploadCover(trackUrl: string) {
    if (this.selectedFile) {
      this.currentFile = this.selectedFile.item(0);
      this.uploadService.uploadCover(this.currentFile, this.modelUser.username, trackUrl).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.currentFileName = 'trackCover_'.concat(this.currentFile.name);
            this.alertService.success('Zdjęcie zostało dodane !');
          }
        },
        err => {
          this.alertService.error('Nie udało się dodać zdjęcia.');
          this.currentFile = undefined;
        });
    }
  }

  redirect() {
    this.router.navigate(['/'])
      .then(r => console.log("Permission denied. Redirect to main view.", r));
  }

}
