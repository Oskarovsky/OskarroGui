import {Component, OnInit,} from '@angular/core';
import {TokenStorageService} from '../services/auth/token-storage.service';
import {UploadFileService} from '../services/storage/upload-file.service';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {Track} from '../tracks/track/model/track';
import {TrackService} from '../services/track/track.service';
import {DomSanitizer} from '@angular/platform-browser';
import {AlertService} from '../services/alert/alert.service';
import {first} from 'rxjs/operators';
import {UserService} from '../services/user/user.service';
import {NavigationComponent} from "../navigation/navigation.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  selectedFile: { item: (arg0: number) => File; };
  currentFile: File;
  message = '';
  imageToShow: any;
  tracks: Array<any>;
  isImage = false;
  favoriteTracksByUser: Track[] = [];

  constructor(private tokenStorage: TokenStorageService,
              private http: HttpClient,
              public navigationComponent: NavigationComponent,
              private userService: UserService,
              private alertService: AlertService,
              private uploadService: UploadFileService,
              private trackService: TrackService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.currentUser = this.tokenStorage.getUser();

      this.userService.getUserById(this.currentUser.id)
        .pipe(first())
        .subscribe(x => this.currentUser = x);

      this.getLastAddedTracksByUsername(this.currentUser.username, 5);
      this.getAllFavoritesTracksByUser(this.currentUser.username);
      this.getImageFromService(this.currentUser.username);
    }
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

  // @ts-ignore
  selectFile(event) {
    this.selectedFile = event.target.files;
  }

  upload() {
    if (this.selectedFile) {
      this.currentFile = this.selectedFile.item(0);
      this.uploadService.upload(this.currentFile, this.currentUser.username, 'AVATAR').subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.alertService.success('Zdjęcie zostało dodane. Odśwież stronę.');
          }
        },
        err => {
          this.alertService.error('Nie udało się dodać zdjęcia.');
          this.currentFile = undefined;
        });
    }
  }

  public getLastAddedTracksByUsername(username: string, numberOfTracks: number) {
    this.trackService.getLastAddedTracksByUsername(username, numberOfTracks).subscribe(
      response => {
        this.tracks = response;
      },
      err => {
        this.alertService.error('An error has occurred while fetching tracks.');
      }
    );
  }

  getAllFavoritesTracksByUser(username: string) {
    this.trackService.getAllFavoritesTracksByUsername(username)
      .subscribe((track: any) => {
        this.favoriteTracksByUser = track;
    });
  }

}
