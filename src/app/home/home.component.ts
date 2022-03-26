import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user/user.service';
import {Subscription} from 'rxjs';
import {TokenStorageService} from '../services/auth/token-storage.service';
import {PostService} from '../services/article/post.service';
import {Post} from '../article/model/post';
import {UploadFileService} from "../services/storage/upload-file.service";
import {DomSanitizer, SafeResourceUrl, SafeHtml} from "@angular/platform-browser";
import {NavigationComponent} from "../navigation/navigation.component";

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

  imagesToShow: Map<number, any> = new Map<number, any>();
  idList: Array<number> = new Array<number>();

  constructor(private userService: UserService,
              private postService: PostService,
              private sanitizer: DomSanitizer,
              public fileService: UploadFileService,
              public navigationComponent: NavigationComponent,
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
        this.posts.forEach(t => {
          if (!this.idList.includes(t.id)) {
            this.idList.push(t.id);
            this.getArticleImage(t.id);
          }
        });
      },
      () => {
        alert('An error with fetching posts has occurred');
      }
    );
  }

  getArticleImage(articleId: number) {
    this.fileService.getArticleImage(articleId).subscribe(data => {
      this.createArticleImageFromBlob(articleId, data);
    }, error => {
      console.log('Could not create image from blob ' + error);
    });
  }

  createArticleImageFromBlob(articleId: number, image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imagesToShow.set(articleId, reader.result as string);
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

}
