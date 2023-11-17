import {Component, OnInit} from '@angular/core';
import {Track} from '../../tracks/track/model/track';
import {Subscription} from 'rxjs';
import {Video} from '../video/model/video';
import {TrackService} from '../../../services/track/track.service';
import {ActivatedRoute, Router} from '@angular/router';
import {VideoService} from '../../../services/video/video.service';
import {DomSanitizer} from '@angular/platform-browser';
import {TokenStorageService} from "../../../services/auth/token-storage.service";
import {PlaylistService} from "../../../services/playlist/playlist.service";
import {Playlist} from "../../playlists/playlist/model/playlist";
import {AlertService} from "../../../services/alert/alert.service";
import {CommonsService} from "../../../services/commons/commons.service";

@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.css']
})
export class VideoEditComponent implements OnInit {

  tracks: Track[] = [];
  sub: Subscription;
  video: Video;
  videoId: string;
  videoPlaylist: Playlist

  constructor(private tokenStorage: TokenStorageService,
              private videoService: VideoService,
              private trackService: TrackService,
              private commonsService: CommonsService,
              private alertService: AlertService,
              private playlistService: PlaylistService,
              private sanitizer: DomSanitizer,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.videoId = params['id'];
    });
    if (this.tokenStorage.getToken()) {
      this.getVideoById();
      this.getPlaylistFromVideo(Number(this.videoId));
      this.getAllTracksFromVideo();
    } else {
      this.commonsService.redirectToHomePage();
    }
  }

  public getVideoById() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.videoService.getVideo(id).subscribe({
          next: response => {
            this.video = response;
            this.secureAllUrl(this.video);
          },
          error: err => {
            console.log('An error during fetching video has occurred with id', id, err);
            alert('An error with fetching video has occurred');
          }
        })
      }
    })
  }

  public getPlaylistFromVideo(videoId: number) {
    this.videoService.getPlaylistFromVideo(videoId).subscribe({
      next: response => {
        this.videoPlaylist = response;
      },
      error: err => {
        console.log('An error during playlist for video has occurred with id', videoId, err);
        alert('An error with fetching playlist for video has occurred');
      }
    })
  }

  public getAllTracksFromVideo() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.videoService.getAllTracksFromVideo(id).subscribe({
          next: response => {
            this.tracks = response;
          },
          error: err => {
            console.log('An error during fetching tracks has occurred from video with id', id, err);
            alert('An error with fetching tracks has occurred');
          }
        });
      }
    });
  }

  public updateTrack(updatedTrack: Track) {
    this.trackService.addTrack(updatedTrack).subscribe({
      next: () => {
        this.alertService.success('Track has been updated with id ', updatedTrack.id)
      },
      error: err => {
        console.log('An error occurred while updating tracks with id ' + updatedTrack.id, err);
        alert('An error occurred while updating tracks with id ' + updatedTrack.id);
      }
    });
  }

  addTrackToVideoPlaylist(title: string, artist: string, version: string, url: string, position: string) {
    const newTrack: Track = {
      id: null,
      title: title,
      artist: artist,
      points: 0,
      position: +position,
      version: version,
      url: url,
      playlist: this.videoPlaylist,
    };
    this.playlistService.addTrackToPlaylist(newTrack, this.videoPlaylist.id).subscribe({
      next: () => {
        this.tracks.push(newTrack);
      },
      error: () => {
        alert('An error with adding track to video has occurred');
      }
    });
  }

  deleteTrack(id: number) {
    if (confirm('Czy na pewno chcesz usunąć ten utwór?')) {
      this.trackService.deleteTrackFromPlaylist(id).subscribe({
       next: () => {
         this.tracks.splice(Number(id), 1);
         window.location.reload();
       },
       error: err => {
         alert('An error has occurred while deleting tracks from playlist');
         console.log('An error has occurred while deleting tracks with id', id, err);
       }
      })
    }
  }

  secureAllUrl(video: Video) {
    video.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video.url}`);
  }

}
