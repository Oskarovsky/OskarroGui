import {Component, OnInit, SecurityContext} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, map, Observable, Subscription, throwError} from 'rxjs';

import {TrackService} from '../../services/track/track.service';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Track} from './model/track';
import {DomSanitizer} from '@angular/platform-browser';
import {TrackComment} from './model/track-comment';
import {User} from '../../services/user/user';
import {TokenStorageService} from '../../services/auth/token-storage.service';
import {UploadFileService} from '../../services/storage/upload-file.service';
import {UserService} from "../../services/user/user.service";

const krakenFilesJsonDomain = 'https://krakenfiles.com/json/'
const httpOptions = {
  headers: new HttpHeaders({
      'Access-Control-Allow-Origin' : '*',
      'x-Trigger': 'CORS' })
};

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {

  track: Track;
  newTrackComment: TrackComment;
  trackComments: TrackComment[] = [];
  tracks: Track[] = [];
  isLoggedIn = false;
  trackDataFromAPI: any;
  isImage = false;

  sub: Subscription;
  trackId: number;
  imagesToShow: Map<string, any> = new Map<string, any>();
  coversToShow: Map<number, any> = new Map<number, any>();


  modelTrackComment: TrackComment = {
    id: null,
    text: '',
    track: null,
    user: null,
    createdAt: ''
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

  constructor(private trackService: TrackService,
              private tokenStorageService: TokenStorageService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private sanitizer: DomSanitizer,
              private http: HttpClient,
              private uploadFileService: UploadFileService) {

    this.sub = this.route.params.subscribe(params => {
      this.trackId = params['id'];
    });
  }

  ngOnInit() {
    this.getTrackWithDetails(this.trackId);
    this.getAllTrackComments(this.trackId);
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.userService.collectUserData(this.tokenStorageService, this.modelUser)
    }
    this.getCoverImage(this.trackId);
    this.getUserImage(this.modelUser.username);
  }


  /* region TRACK INFORMATION */
  getTrackWithDetails(trackId: number) {
    this.trackService.getTrackById(trackId).subscribe({
      next: (track: Track) => {
        this.track = track;
        this.secureUrl(track);
        this.fetchDetailsInformationFromApi(track);
        console.log('TEST -- ' + this.track.urlSource + ' == ' + this.track.safeUrl)

      },
      error: () => {
        alert("Nie udało się pobrać całej listy video")
      }
    })
  }

  async fetchDetailsInformationFromApi(track: Track) {
    switch (track.urlSource) {
      case 'KRAKENFILES': {
        const jsonUrl = this.prepareJsonUrlFromKrakenFile(track.url)
        this.getJsonFromKrakenFiles(jsonUrl).subscribe({
          next: data => {
            this.trackDataFromAPI = data;
          },
          error: err => {
            console.log('Could not fetch information details from Krakenfiles. ' + err);
          }
        });
        break;
      }
      case 'ZIPPYSHARE': {
        /* TODO */
        break;
      }
      default: {
        /* TODO */
        break
      }
    }
  }

  /** Function to GET json from KRAKENFILES */
  getJsonFromKrakenFiles(url: string): Observable<any> {
    return this.http.get(url).pipe(
      map(TrackComponent.extractData),
      catchError(this.handleError)
    )
  }

  prepareJsonUrlFromKrakenFile(originalUrl: string): string {
    return krakenFilesJsonDomain + originalUrl.substring(
      originalUrl.lastIndexOf('/view/') + 6,
      originalUrl.lastIndexOf('/file')
    );
  }

  /** Function to extract the data when the server return some values */
  private static extractData(res: any) {
    return res || {};
  }

  /** Function to handle error when the server return an error */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code. The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }
  /* endregion */

  /* region COMMENTS */
  getAllTrackComments(trackId: number) {
    this.trackService.getAllTrackCommentsByTrackId(trackId).subscribe(
      (comments: any) => {
        this.trackComments = comments;
        for (const comment of comments) {
          this.getUserImage(comment.user.username);
        }
      },
      error => {
        alert('An error has occurred while fetching track comments');
      }
    );
  }

  addNewTrackComment(text: string) {
    const newTrackComment: TrackComment = {
      id: null,
      text,
      track: this.track,
      user: this.modelUser,
      createdAt: ''
    };
    this.trackService.addTrackComment(newTrackComment).subscribe(
      response => {
        newTrackComment.text = text;
        this.newTrackComment = response;
        window.location.reload();
      },
      error => {
        alert('An error has occurred while adding comment to track');
      }
    );
  }

  deleteTrackCommentById(commentId: number) {
    this.trackService.deleteTrackCommentById(commentId).subscribe(
      response => {
        window.location.reload();
      }, error => {
        alert('An error has occurred while deleting track comment');
      }
    );
  }
  /* endregion */

  /* region IMAGE */
  getUserImage(username: string) {
    this.uploadFileService.getFile(username).subscribe(data => {
      this.createImageFromBlob(username, data);
    }, error => {
      console.log(error);
    });
  }

  createImageFromBlob(username: string, image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imagesToShow.set(username, this.sanitizer.bypassSecurityTrustResourceUrl(reader.result as string));
    }, false);

    if (image) {
      if (image.size > 0) {
        this.isImage = true;
        reader.readAsDataURL(image);
      }
    }
  }

  getCoverImage(trackId: number) {
    this.uploadFileService.getCoverFile(trackId).subscribe(data => {
      this.createCoverFromBlob(trackId, data);
    }, error => {
      console.log(error);
    });
  }

  createCoverFromBlob(trackId: number, image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.coversToShow.set(trackId, this.sanitizer.bypassSecurityTrustResourceUrl(reader.result as string));
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
  /* endregion */

  secureUrl(track: Track) {
    track.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${track.urlPlugin}`);
  }

}
