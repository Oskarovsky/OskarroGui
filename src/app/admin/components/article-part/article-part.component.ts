import {Component, OnInit} from '@angular/core';
import {Post} from '../../../article/model/post';
import {Subscription} from 'rxjs';
import {PostService} from '../../../services/article/post.service';
import {TokenStorageService} from '../../../services/auth/token-storage.service';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-article-part',
  templateUrl: './article-part.component.html',
  styleUrls: ['./article-part.component.css']
})
export class ArticlePartComponent implements OnInit {

  posts: Post[];
  sub: Subscription;
  isLoggedIn = false;
  username: string;

  constructor(private postService: PostService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.username = this.tokenStorage.getUser().username;
      this.getLastAddedPosts(5);
    }
  }

  public getLastAddedPosts(numberOfPosts: number) {
    this.postService.getLastAddedPosts(numberOfPosts).subscribe({
      next: response => {
        this.posts = response;
      },
      error: err => {
        console.log('An error with fetching posts has occurred', err);
        alert('An error with fetching posts has occurred');
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
        error: (err) => {
          console.log('Could not delete article post', err);
          alert('Could not delete article post');
        }
      })
    }
  }
}
