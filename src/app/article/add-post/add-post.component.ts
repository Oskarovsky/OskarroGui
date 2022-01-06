import {Component, OnInit, ViewChild} from '@angular/core';
import {Post} from '../model/post';
import {User} from '../../services/user/user';
import {Comment} from '../model/comment';
import {PostService} from '../../services/article/post.service';
import {CommentService} from '../../services/article/comment.service';
import {TokenStorageService} from '../../services/auth/token-storage.service';
import {Router} from '@angular/router';
import {Track} from '../../tracks/track/model/track';
import {HttpClient, HttpEventType, HttpResponse} from "@angular/common/http";
import {UploadFileService} from "../../services/storage/upload-file.service";
import {AlertService} from "../../services/alert/alert.service";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  name = 'ng2-ckeditor';
  ckeConfigForDescription: any;
  ckeConfigForContent: any;
  content: string;
  log: string;
  res: any;
  @ViewChild('Post', {static: false}) Post: any;

  posts: Post[] = [];
  comments: Comment[] = [];
  isUserLogged = false;
  user: null;
  post = new Post();
  isAdmin = false;

  modelPost: Post = {
    id: null,
    title: '',
    description: '',
    content: '',
    user: null,
    createdAt: null
  };

  modelUser: User = {
    id: null,
    username: '',
    email: '',
    password: '',
    createdAt: '',
    favoriteTracks: null,
    imageUrl: '',
    provider: '',
    providerId: null
  };


  constructor(private httpClient: HttpClient,
              private postService: PostService,
              private uploadFileService: UploadFileService,
              private commentService: CommentService,
              private alertService: AlertService,
              private tokenStorageService: TokenStorageService,
              private router: Router) { }

  dbImage: any;
  postResponse: any;
  successResponse: string;
  image: any;
  currentFile: File;
  selectedFile: { item: (arg0: number) => File; };
  currentFileName = '';
  message = '';

  selectFile(event: any) {
    this.selectedFile = event.target.files;
  }

  imageUploadAction(articleId: string) {
    if (this.selectedFile) {
      this.currentFile = this.selectedFile.item(0);
      this.uploadFileService.uploadArticleImage(this.currentFile, this.modelUser.username, articleId).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.currentFileName = 'trackCover_'.concat(this.currentFile.name);
            this.alertService.success('Zdjęcie zostało dodane !');
          }
        },
        err => {
          this.alertService.error('Nie udało się dodać zdjęcia.');
          this.currentFile = undefined;
        });
    }
  }

  ngOnInit() {
    this.isUserLogged = !!this.tokenStorageService.getToken();
    if (this.isUserLogged) {
      this.isAdmin = this.tokenStorageService.getUser().roles.includes('ROLE_ADMIN');
      this.modelUser.username = this.tokenStorageService.getUser().username;
      this.modelUser.id = this.tokenStorageService.getUser().id;
      this.modelUser.email = this.tokenStorageService.getUser().email;
      this.modelUser.password = this.tokenStorageService.getUser().password;
      this.modelUser.provider = this.tokenStorageService.getUser().provider;
      this.modelUser.imageUrl = this.tokenStorageService.getUser().imageUrl;

      if (!this.isAdmin) {
        this.redirect();
      }
    } else {
      this.redirect();
    }
    this.getAllPosts();
    this.ckeConfigForDescription = {
      allowedContent: false,
      forcePasteAsPlainText: true,
      height: 100,
    };
    this.ckeConfigForContent = {
      allowedContent: false,
      forcePasteAsPlainText: true,
      height: 350,
    };
  }

  onSubmit() {
    this.postService.addPost(this.post).subscribe(
      () => {
        alert('Data saved successfully');
      }
    );

  }

  public getAllPosts() {
    this.postService.getAllPosts().subscribe(
      res => {
        this.posts = res;
      },
      error => {
        alert('An error with fetching posts has occurred');
      }
    );
  }

  createPost(title: string, description: string, content: string) {
    const newPost: Post = {
      id: null,
      title,
      description,
      content,
      user: this.modelUser,
      createdAt: null
    };
    this.postService.addPost(newPost).subscribe(
      () => {
        newPost.title = title;
        newPost.description = description;
        newPost.content = content;
        this.posts.push(newPost);
      },
      () => {
        alert('An error has occurred while saving the post');
      },
    );
    this.imageUploadAction('1')
  }

  redirect() {
    this.router.navigate(['/']);
  }
}
