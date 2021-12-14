import { Component, OnInit } from '@angular/core';
import {Playlist} from '../playlist/model/playlist';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {TrackService} from '../../services/track/track.service';
import {Track} from '../../tracks/track/model/track';
import {TokenStorageService} from '../../services/auth/token-storage.service';

@Component({
  selector: 'app-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.css']
})
export class PlaylistDetailsComponent implements OnInit {

  playlist: Playlist;
  tracks: Track[] = [];
  sub: Subscription;
  viewsNumber: number;
  isLoggedIn = false;

  constructor(private playlistService: PlaylistService,
              private trackService: TrackService,
              private tokenStorage: TokenStorageService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.getPlaylistById();
    this.getAllTracksFromPlaylist();
  }

  public getAllTracks() {
    this.trackService.getAllTracks().subscribe(
      result => {
        this.tracks = result;
      },
      error => {
        alert('An error has occurred while downloading tracks');
      }
    );
  }

  public getAllTracksFromPlaylist() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.playlistService.getAllTracksFromPlaylist(id).subscribe(
          response => {
            this.tracks = response;
          },
          error => {
            alert('An error with fetching tracks has occurred');
          }
        );
      }
    });
  }

  public getPlaylistById() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.playlistService.getPlaylist(id).subscribe(
          response => {
            this.playlist = response;
            this.updateViewsNumber(id);
          },
          error => {
            alert('An error with fetching playlist has occurred');
          });
      }
    });
  }

  public updateViewsNumber(id: number) {
    if (id) {
      this.playlistService.updatePlaylistViewsNumber(id).subscribe(
        response => {
          this.viewsNumber = response;
        },
        error => {
          alert('An error with updating views number has occurred');
        }
      );
    }
  }

}
