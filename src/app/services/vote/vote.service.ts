import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {VotePayload} from '../../pages/tracks/track-vote-button/model/vote-payload';

const API: string = environment.serverUrl;
const VOTE_API = API + '/vote';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) { }

  addVoteForTrackById(id: number, username: string): Observable<any> {
    return this.http.get(VOTE_API + '/track/' + id + '/add/' + username);
  }

  voteForTrack(votePayload: VotePayload): Observable<any> {
    return this.http.post(VOTE_API + '/track', votePayload);
  }

  getAllVotedTracksIdsByUser(username: string): Observable<any> {
    return this.http.get(VOTE_API + '/' + username + '/tracks/ids');
  }

  checkIfUserVotedForTrack(trackId: number, userId: number): Observable<any> {
    return this.http.get(VOTE_API + '/track/' + trackId + '/checkVote/' + userId);
  }
}
