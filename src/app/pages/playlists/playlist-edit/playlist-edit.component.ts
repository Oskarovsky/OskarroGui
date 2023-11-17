import { Component, OnInit } from '@angular/core';
import {Playlist} from '../playlist/model/playlist';
import {Track} from '../../tracks/track/model/track';
import {PlaylistService} from '../../../services/playlist/playlist.service';
import {TrackService} from '../../../services/track/track.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Route} from '@angular/router';
import {User} from '../../../services/user/user';
import {TokenStorageService} from '../../../services/auth/token-storage.service';
import {UserService} from "../../../services/user/user.service";

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
              private userService: UserService,
              private tokenStorageService: TokenStorageService,
              private trackService: TrackService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.userService.collectUserData(this.tokenStorageService, this.modelUser)
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
        this.playlistService.getPlaylist(id).subscribe({
          next: response => {
            this.playlist = response;
          },
          error: err => {
            alert('An error with fetching playlist has occurred');
            console.log('An error with fetching playlist has occurred', err)
          }
        })
      }
    });
  }

  public getAllTracksFromPlaylist() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.playlistService.getAllTracksFromPlaylist(id).subscribe({
          next: response => {
            this.tracks = response;
          },
          error: err => {
            console.log('An error with fetching tracks has occurred', err)
            alert('An error with fetching tracks has occurred')
          }
        })
      }
    });
  }

  public updateTrack(updatedTrack: Track) {
    this.trackService.addTrack(updatedTrack).subscribe({
      next: () => {
        console.log('New track has been added to playlist')
      },
      error: () => {
        alert('An error with updating tracks has occurred');
      }
    });
  }

  deleteTrack(id: number) {
    if (confirm('Czy na pewno chcesz usunąć ten utwór?')) {
      this.trackService.deleteTrackFromPlaylist(id).subscribe({
        next: () => {
          this.tracks.splice(Number(id), 1);
          console.log('Track has been deleted with id ' + id);
          window.location.reload();
        },
        error: err => {
          console.log('An error has occurred while deleting tracks from playlist', err);
          alert('An error has occurred while deleting tracks from playlist')
        }
      })
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

    this.trackService.addTrack(newTrack).subscribe({
      next: () => {
        this.tracks.push(newTrack);
      },
      error: () => {
        alert('An error with adding track to playlist has occurred');
      }
    });
  }
}
