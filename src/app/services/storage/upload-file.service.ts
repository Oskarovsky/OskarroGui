import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

const API: string = environment.serverUrl;
const STORAGE_API = API + '/storage';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) {}

  upload(file: File, username: string, destination: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('username', username);
    formData.append('destination', destination);
    const req = new HttpRequest('POST', STORAGE_API + '/uploadFile', formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  uploadCover(file: File, username: string, trackUrl: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('username', username);
    formData.append('trackUrl', trackUrl);
    const req = new HttpRequest('POST', STORAGE_API + '/uploadFileCoverTrack', formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  uploadArticleImage(file: File, username: string, articleId: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('username', username);
    formData.append('articleId', articleId);
    const req = new HttpRequest('POST', STORAGE_API + '/uploadArticleImage', formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getFile(username: string): Observable<Blob> {
    return this.http.get(STORAGE_API + '/avatar/' + username, { responseType: 'blob' });
  }

  getCoverFile(trackId: number): Observable<Blob> {
    return this.http.get(STORAGE_API + '/cover/' + trackId, { responseType: 'blob' });
  }

  getArticleImage(articleId: number): Observable<Blob> {
    return this.http.get(STORAGE_API + '/article/' + articleId, { responseType: 'blob' });
  }

}
