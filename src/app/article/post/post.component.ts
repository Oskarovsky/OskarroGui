import {Component, OnInit} from '@angular/core';
import {Post} from '../model/post';
import {Subscription} from 'rxjs';
import {TokenStorageService} from '../../services/auth/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../services/article/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts: Post[];
  sub: Subscription;
  isLoggedIn = false;
  username: string;
  isAdmin = false;

  constructor(private postService: PostService,
              private router: Router,
              private tokenStorage: TokenStorageService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      const user = this.tokenStorage.getUser();
      this.isAdmin = user.roles.includes('ROLE_ADMIN');
      if (!this.isAdmin) {
        this.redirect();
      }
      this.getAllPostByUsername();
    } else {
      this.redirect();
    }
  }


  public getAllPostByUsername() {
    this.sub = this.route.params.subscribe(params => {
      const username = params['username'];
      this.username = username;
      if (username) {
        this.postService.getAllPostsByUsername(username).subscribe(
          response => {
            this.posts = response;
          },
          error => {
            alert('An error with fetching posts has occurred');
          }
        );
      }
    });
  }

  deletePost(id: number) {
    if (confirm('Czy na pewno chcesz usunąć post?')) {
      this.postService.deletePost(id).subscribe(
        response => {
          this.posts.splice(id, 1);
          window.location.reload();
        },
        error => {
          alert('Could not delete post');
        }
      );
    }
  }

  redirect() {
    this.router.navigate(['/']);
  }
}
