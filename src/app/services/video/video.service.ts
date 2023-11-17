import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Track} from '../../pages/tracks/track/model/track';
import {Observable} from 'rxjs';
import {Playlist} from '../../pages/playlists/playlist/model/playlist';
import {Video} from '../../pages/videos/video/model/video';
import {environment} from '../../../environments/environment';

const API: string = environment.serverUrl;
const VIDEO_API = API + '/video';

@Injectable({providedIn: 'root'})
export class VideoService {

  tracks: Track[] = [];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET all video */
  getAllVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(VIDEO_API);
  }

  /** GET video by id */
  getVideo(id: string): Observable<any> {
    return this.http.get<Video>(VIDEO_API + '/' + id);
  }

  addVideo(video: Video): Observable<Video> {
    return this.http.post<Video>(VIDEO_API, video);
  }

  getVideosByCategory(category: string): Observable<Video[]> {
    return this.http.get<Video[]>(VIDEO_API + '/category/' + category);
  }

  deleteVideo(id: number): Observable<any> {
    return this.http.delete<Video>(VIDEO_API + '/' + id);
  }

  /** GET all tracks from Video */
  getAllTracksFromVideo(videoId: string): Observable<Track[]> {
    return this.http.get<Track[]>(VIDEO_API + '/' + videoId + '/tracks');
  }

  /** GET tracklist from Video */
  getPlaylistFromVideo(videoId: number): Observable<Playlist> {
    return this.http.get<Playlist>(VIDEO_API + '/' + videoId + '/playlist');
  }

  /** GET list the most popular videos */
  getMostPopularVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(VIDEO_API + '/top');
  }

  /** GET list the all videos sorted by views number */
  getAllVideosSortedByViews(): Observable<Video> {
    return this.http.get<Video>(VIDEO_API + '/sorted');
  }
}
