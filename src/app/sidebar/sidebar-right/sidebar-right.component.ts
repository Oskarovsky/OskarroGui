import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../services/auth/token-storage.service';
import {VideoService} from '../../services/video/video.service';
import {AlertService} from '../../services/alert/alert.service';
import {Video} from "../../videos/video/model/video";
import {NavigationComponent} from "../../navigation/navigation.component";

@Component({
  selector: 'app-sidebar-right',
  templateUrl: './sidebar-right.component.html',
  styleUrls: ['./sidebar-right.component.css']
})
export class SidebarRightComponent implements OnInit {

  isLoggedIn = false;
  username: string;

  videoList: Video[];

  constructor(private tokenStorageService: TokenStorageService,
              public navigationComponent: NavigationComponent,
              private videoService: VideoService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.getMostPopularVideos();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
    }
  }

  /** Fetch videos with the most views */
  getMostPopularVideos() {
    this.videoService.getMostPopularVideos().subscribe({
      next: data => {
        this.videoList = data.filter(video => video.viewCount !== null)
      },
      error: () => {
        this.alertService.error("Nie udało się pobrać całej listy video")
      },
    })
  }

}
