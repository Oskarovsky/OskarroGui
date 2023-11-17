import { Component, OnInit } from '@angular/core';
import { TrackService} from '../../../services/track/track.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {TokenStorageService} from '../../../services/auth/token-storage.service';
import {Track} from '../track/model/track';
import {VoteService} from '../../../services/vote/vote.service';

@Component({
  selector: 'app-track-list',
  templateUrl: './top-list.component.html',
  styleUrls: ['./top-list.component.scss']
})
export class TopListComponent implements OnInit {

  displayedColumns: string[] = ['#', 'Tytuł', 'Artysta', 'Wersja', 'Punkty', 'Ulubione', 'Zagłosuj', 'Link'];

  tracks: Array<any>;

  genres: Array<any>;

  sub: Subscription;

  isLoggedIn = false;

  favoriteTracksByUser: Track[] = [];

  favoriteTrack: Track;

  votedTrack: Track;

  votedTracksIds: number[] = [];

  favoriteTracksIds: number[] = [];

  username: string;

  clicked: any  = [];

  clickedVote: any  = [];

  numberOfTracks = 5;


  constructor(private trackService: TrackService,
              private tokenStorage: TokenStorageService,
              private voteService: VoteService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      this.isLoggedIn = true;
      const user = this.tokenStorage.getUser();
      this.username = user.username;
      this.getAllFavoritesTracksIdsByUser(user.username);
      this.getAllVotedTracksIdsByUser(user.username);
      this.numberOfTracks = 10;
    }

    this.sub = this.route.params.subscribe(params => {
      // @ts-ignore
      const genre = params.genre;
      if (genre) {
        if (this.isLoggedIn === true) {
          this.trackService.getTopListByGenre(genre, 20).subscribe((track: any) => {
            this.tracks = track;
          });
        } else {
          this.trackService.getTopListByGenre(genre, 10).subscribe((track: any) => {
            this.tracks = track;
          });
        }
      }
    });
  }

  getAllFavoritesTracksIdsByUser(username: string) {
    this.trackService.getAllFavoritesTracksIdsByUsername(username).subscribe((id: any) => {
      this.favoriteTracksIds = id;
    });
  }

  getAllVotedTracksIdsByUser(username: string) {
    this.voteService.getAllVotedTracksIdsByUser(username).subscribe((id: any) => {
      this.votedTracksIds = id;
    });
  }

  addTrackToFavorites(id: number, username: string) {
    this.trackService.addTrackToFavorites(id, username).subscribe((data: any) => {
      this.favoriteTrack = data;
    });
  }

  addVoteForTrack(trackId: number, username: string) {
    this.voteService.addVoteForTrackById(trackId, username).subscribe((data: any) => {
      this.votedTrack = data;
    });
  }
}
