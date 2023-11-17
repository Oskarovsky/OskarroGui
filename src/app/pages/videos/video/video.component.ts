import {Component, OnInit} from '@angular/core';
import {VideoService} from '../../../services/video/video.service';
import {Video} from './model/video';
import {Track} from '../../tracks/track/model/track';
import {DomSanitizer} from '@angular/platform-browser';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {PlaylistService} from '../../../services/playlist/playlist.service';
import {TokenStorageService} from '../../../services/auth/token-storage.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  videos: Video[];
  tracks: Track[];
  searchText: string;
  safeVideoUrl: any;
  sub: Subscription;
  videoCategory: string;
  isLoggedIn = false;
  showAdminBoard = false;
  category: string

  constructor(private videoService: VideoService,
              private tokenStorage: TokenStorageService,
              private playlistService: PlaylistService,
              private sanitizer: DomSanitizer,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.category = params['category']
    });

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.showAdminBoard = this.tokenStorage.getUser().roles.includes('ROLE_ADMIN');
    }
    this.getVideosByCategory();
  }

  getVideosByCategory() {
    this.sub = this.route.params.subscribe(params => {
      const category = params['category'];
      this.videoCategory = category;
      if (category) {
        this.videoService.getVideosByCategory(category).subscribe({
          next: response => {
            this.videos = response;
            this.secureAllUrl(this.videos);
          },
          error: err => {
            alert('An error with fetching videos has occurred')
            console.log('An error with fetching videos has occurred', err)
          }
        })
      }
    })
  }


  secureAllUrl(allVideos: Video[]) {
    for (const video of allVideos) {
      video.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video.url}`);
    }
  }

}
