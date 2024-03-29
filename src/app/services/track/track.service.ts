import {Injectable} from '@angular/core';
import {HttpClient, HttpContext, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Track} from 'src/app/pages/tracks/track/model/track';
import {environment} from '../../../environments/environment';
import {TrackResponse} from '../../pages/tracks/track/model/track-response';
import {TrackComment} from '../../pages/tracks/track/model/track-comment';

const API: string = environment.serverUrl;
const TRACK_API = API + '/tracks';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'x-Trigger': 'CORS'
  })
};

@Injectable({providedIn: 'root'})
export class TrackService {

  constructor(private http: HttpClient) {
  }

  getAllTracks(): Observable<Track[]> {
    return this.http.get<Track[]>(TRACK_API);
  }

  getTrackById(id: number): Observable<Track> {
    return this.http.get<Track>(TRACK_API + '/' + id, httpOptions);
  }

  addTrack(track: Track): Observable<Track> {
    return this.http.post<Track>(TRACK_API, track);
  }

  deleteTrackFromPlaylist(id: number): Observable<any> {
    return this.http.delete(TRACK_API + '/' + id);
  }

  getRandomTrack(): Observable<Track> {
    return this.http.get<Track>(TRACK_API + '/random');
  }

  addTrackToFavorites(id: number, username: string): Observable<any> {
    return this.http.get<any>(TRACK_API + '/' + id + '/user/' + username + '/favorites');
  }

  getMostPopularTrackByGenre(genre: string): Observable<Track> {
    return this.http.get<Track>(TRACK_API + '/genre/' + genre + '/top');
  }

  getTopListByGenre(genre: string, numberOfTracks: number) {
    return this.http.get(TRACK_API + '/genre/' + genre + '/top/' + numberOfTracks);
  }

  getLastAddedTracksByUsername(username: string, numberOfTracks: number): Observable<Track[]> {
    return this.http.get<Track[]>(TRACK_API + '/user/' + username + '/' + numberOfTracks);
  }

  getTrackPageByGenre(genre: string, page: number): Observable<TrackResponse> {
    return this.http.get<TrackResponse>(TRACK_API + '/genre/' + genre + '/pages/' + page, httpOptions);
  }

  getTrackPageByUserUsername(username: string, page: number): Observable<TrackResponse> {
    return this.http.get<TrackResponse>(TRACK_API + '/user/' + username + '/pages/' + page);
  }

  getAllTrackCommentsByTrackId(trackId: number): Observable<TrackComment[]> {
    return this.http.get<TrackComment[]>(TRACK_API + '/' + trackId + '/comments');
  }

  addTrackComment(trackComment: TrackComment): Observable<TrackComment> {
    return this.http.post<TrackComment>(TRACK_API + '/comment/add', trackComment);
  }

  deleteTrackCommentById(commentId: number) {
    return this.http.delete(TRACK_API + '/comment/' + commentId);
  }

  getAllFavoritesTracksByUsername(username: string): Observable<any> {
    return this.http.get<Track[]>(TRACK_API + '/favorites/user/' + username);
  }

  getAllFavoritesTracksIdsByUsername(username: string): Observable<any> {
    return this.http.get<number[]>(TRACK_API + '/favorites/user/' + username + '/ids');
  }
}
