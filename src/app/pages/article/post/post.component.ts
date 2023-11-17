import {Component, OnInit} from '@angular/core';
import {Post} from '../model/post';
import {Subscription} from 'rxjs';
import {TokenStorageService} from '../../../services/auth/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../../services/article/post.service';
import {CommonsService} from "../../../services/commons/commons.service";


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
              private commonsService: CommonsService,
              private tokenStorage: TokenStorageService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.tokenStorage.getToken() && this.tokenStorage.getUser().roles.includes('ROLE_ADMIN')) {
      this.isAdmin = true;
      this.isLoggedIn = true;
      this.getAllPostByUsername();
    } else {
      this.commonsService.redirectToHomePage()
    }
  }


  public getAllPostByUsername() {
    this.sub = this.route.params.subscribe(params => {
      const username = params['username'];
      this.username = username;
      if (username) {
        this.postService.getAllPostsByUsername(username).subscribe({
          next: response => {
            this.posts = response;
          },
          error: err => {
            console.log('An error with fetching posts has occurred', err);
            alert('An error with fetching posts has occurred');
          }
        })
      }
    });
  }

  deletePost(id: number) {
    if (confirm('Czy na pewno chcesz usunąć post?')) {
      this.postService.deletePost(id).subscribe({
        next: () => {
          this.posts.splice(id, 1);
          window.location.reload();
        },
        error: err => {
          console.log('Cannot delete post with id ' + id, err);
          alert('Cannot delete the post');
        }
      })
    }
  }
}
