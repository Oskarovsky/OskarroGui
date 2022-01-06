import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user/user.service';
import {Subscription} from 'rxjs';
import {TokenStorageService} from '../services/auth/token-storage.service';
import {PostService} from '../services/article/post.service';
import {Post} from '../article/model/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  sub: Subscription;
  isLoggedIn = false;
  currentUser: any;
  posts: Post[];

  constructor(private userService: UserService,
              private postService: PostService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.getLastAddedPosts(5);
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
    }
  }

  public getLastAddedPosts(numberOfPosts: number) {
    this.postService.getLastAddedPosts(numberOfPosts).subscribe(
      (response: Post[]) => {
        this.posts = response;
      },
      () => {
        alert('An error with fetching posts has occurred');
      }
    );
  }

}
