import { Component, OnInit } from '@angular/core';
import {Playlist} from '../playlist/model/playlist';
import {Track} from '../../tracks/track/model/track';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {TrackService} from '../../services/track/track.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Route} from '@angular/router';
import {User} from '../../services/user/user';
import {TokenStorageService} from '../../services/auth/token-storage.service';

@Component({
  selector: 'app-playlist-edit',
  templateUrl: './playlist-edit.component.html',
  styleUrls: ['./playlist-edit.component.css']
})
export class PlaylistEditComponent implements OnInit {

  tracks: Track[] = [];
  sub: Subscription;
  isLoggedIn = false;
  playlist: Playlist;
  playlistId: number;

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

  genres: string[] = ['CLUB', 'RETRO', 'DANCE', 'HOUSE', 'TECHNO'];

  constructor(private playlistService: PlaylistService,
              private tokenStorage: TokenStorageService,
              private trackService: TrackService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.modelUser.username = this.tokenStorage.getUser().username;
      this.modelUser.id = this.tokenStorage.getUser().id;
      this.modelUser.email = this.tokenStorage.getUser().email;
      this.modelUser.password = this.tokenStorage.getUser().password;
      this.modelUser.provider = this.tokenStorage.getUser().provider;
      this.modelUser.imageUrl = this.tokenStorage.getUser().imageUrl;
    }

    this.getPlaylistById();
    this.getAllTracksFromPlaylist();
  }
  getPlaylist() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      this.playlistId = id;
      if (id) {
        this.playlistService.getPlaylist(id).subscribe((playlist: any) => {
          this.playlist = playlist;
        });
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
          },
          error => {
            alert('An error with fetching playlist has occurred');
          });
      }
    });
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

  public updateTrack(updatedTrack: Track) {
    this.trackService.saveTrackToPlaylist(updatedTrack).subscribe(
      response => {
      },
      error => {
        alert('An error with updating tracks has occurred');
      }
    );
  }

  updatePlaylist(updatedPlaylist: Playlist) {
    updatedPlaylist.id = this.playlistId;
    this.playlistService.addPlaylist(updatedPlaylist).subscribe(
      result => {

      },
      error => {
        alert('An error with updating playlists has occurred');
      }
    );
  }

  deleteTrack(id: number) {
    if (confirm('Czy na pewno chcesz usunąć ten utwór?')) {
      this.trackService.deleteTrackFromPlaylist(id).subscribe(
        response => {
          this.tracks.splice(Number(id), 1);
          window.location.reload();
        },
        error => {
          alert('An error has occurred while deleting tracks from playlist');
        }
      );
    }
  }

  addTrackToPlaylist(title: string, artist: string, version: string, genre: string) {
    const newTrack: Track = {
      id: null,
      title,
      artist,
      points: null,
      genre,
      version,
      createdAt: '',
      url: '',
      urlSource: '',
      urlPlugin: '',
      safeUrl: '',
      position: null,
      playlist: this.playlist,
      video: null,
      favoriteUsers: null,
      user: this.modelUser,
      cover: null
    };

    this.trackService.saveTrackToPlaylist(newTrack).subscribe(
      response => {
        this.tracks.push(newTrack);
      },
      error => {
        alert('An error with adding track to playlist has occurred');
      }
    );
  }
}
