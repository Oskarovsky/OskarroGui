import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Playlist} from '../../playlists/playlist/model/playlist';
import {User} from './user';

const API: string = environment.serverUrl;
const AUTH_API = API + '/auth';
const USER_API = API + '/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  getPublicContent(): Observable<any> {
    return this.httpClient.get(AUTH_API + '/all', {responseType: 'text'});
  }

  getUserBoard(): Observable<any> {
    return this.httpClient.get(AUTH_API + '/user', {responseType: 'text'});
  }

  /** GET one user by username */
  getUserByUsername(username: string): Observable<User> {
    return this.httpClient.get<User>(USER_API + '/' + username);
  }

  /** GET last added users */
  getLastAddedUsers(numberOfUsers: string): Observable<User[]> {
    return this.httpClient.get<User[]>(USER_API + '/lastAdded/' + numberOfUsers);
  }

  getUserById(userId: string): Observable<User> {
    return this.httpClient.get<User>(USER_API + '/id/' + userId);
  }

  /** GET one Top Uploader */
  getTopUploader(periodOfTime: string): Observable<User> {
    return this.httpClient.get<User>(USER_API + '/top/uploader/' + periodOfTime);
  }

  /** GET specific count Top Uploaders */
  getTopUploaders(periodOfTime: string, numberOfUsers: number): Observable<User[]> {
    return this.httpClient.get<User[]>(USER_API + '/top/uploader/' + periodOfTime + '/' + numberOfUsers);
  }

  getNumberOfTracksAddedInGivenPeriodByUsername(username: string, periodOfTime: string): Observable<number> {
    return this.httpClient.get<number>(USER_API + '/' + username + '/tracks/' + periodOfTime + '/count');
  }

  /** POST update user */
  updateUser(userId: string, userDto: { username: any; firstName: any; facebookUrl: any; youtubeUrl: any; city: any; }): Observable<any> {
    return this.httpClient.patch(USER_API + '/' + userId,
      {
        id: userId,
        username: userDto.username,
        firstName: userDto.firstName,
        facebookUrl: userDto.facebookUrl,
        youtubeUrl: userDto.youtubeUrl,
        city: userDto.city
      }, httpOptions);
  }
}
