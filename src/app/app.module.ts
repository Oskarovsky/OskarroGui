import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavigationComponent} from "./skeleton/navigation/navigation.component";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {MenuListItemComponent} from "./skeleton/navigation/menu-list-item/menu-list-item.component";
import {SidebarRightComponent} from "./skeleton/sidebar/sidebar-right/sidebar-right.component";
import {FooterComponent} from "./skeleton/footer/footer.component";
import {HomeComponent} from "./pages/home/home.component";
import {CKEditorModule} from "ng2-ckeditor";
import {AddPostComponent} from "./pages/article/add-post/add-post.component";
import {PostComponent} from "./pages/article/post/post.component";
import {PlaylistFilterPipe} from "./services/playlist/playlist-filter.pipe";
import {PostDetailsComponent} from "./pages/article/post-details/post-details.component";
import {SidebarLeftComponent} from "./skeleton/sidebar/sidebar-left/sidebar-left.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {DateAgoPipe} from "./pipes/date-ago.pipe";
import {TrackComponent} from "./pages/tracks/track/track.component";
import {TrackAddComponent} from "./pages/tracks/track-add/track-add.component";
import {TrackCommentAddComponent} from "./pages/tracks/track-comment-add/track-comment-add.component";
import {TopListComponent} from "./pages/tracks/top-list/top-list.component";
import {TrackVoteButtonComponent} from "./pages/tracks/track-vote-button/track-vote-button.component";
import {TracksClubComponent} from "./pages/tracks/tracks-by-genre/genre/tracks-club/tracks-club.component";
import {TracksDanceComponent} from "./pages/tracks/tracks-by-genre/genre/tracks-dance/tracks-dance.component";
import {TracksDiscoComponent} from "./pages/tracks/tracks-by-genre/genre/tracks-disco/tracks-disco.component";
import {TracksRetroComponent} from "./pages/tracks/tracks-by-genre/genre/tracks-retro/tracks-retro.component";
import {TracksSetComponent} from "./pages/tracks/tracks-by-genre/genre/tracks-set/tracks-set.component";
import {TracksTechnoComponent} from "./pages/tracks/tracks-by-genre/genre/tracks-techno/tracks-techno.component";
import {TracksVixaComponent} from "./pages/tracks/tracks-by-genre/genre/tracks-vixa/tracks-vixa.component";
import {TrackTileComponent} from "./pages/tracks/tracks-by-genre/track-tile/track-tile.component";
import {TracksPartComponent} from "./pages/tracks/tracks-by-genre/tracks-part/tracks-part.component";
import {PlaylistComponent} from "./pages/playlists/playlist/playlist.component";
import {NgxPaginationModule} from "ngx-pagination";
import {PlaylistEditComponent} from "./pages/playlists/playlist-edit/playlist-edit.component";
import {PlaylistDetailsComponent} from "./pages/playlists/playlist-details/playlist-details.component";
import {PlaylistAllComponent} from "./pages/playlists/playlist-all/playlist-all.component";
import {PlaylistAddComponent} from "./pages/playlists/playlist-add/playlist-add.component";
import {ArticlePartComponent} from "./pages/admin/components/article-part/article-part.component";
import {UserPartComponent} from "./pages/admin/components/user-part/user-part.component";
import {UserFilterPipe} from "./pipes/user-filter.pipe";
import {BoardAdminComponent} from "./pages/user/board-admin/board-admin.component";
import {ForgotPasswordComponent} from "./pages/user/forgot-password/forgot-password.component";
import {UserChangePasswordComponent} from "./pages/user/user-change-password/user-change-password.component";
import {UserEditComponent} from "./pages/user/user-edit/user-edit.component";
import {UserProfileComponent} from "./pages/user/user-profile/user-profile.component";
import {VideoComponent} from "./pages/videos/video/video.component";
import {VideoAddComponent} from "./pages/videos/video-add/video-add.component";
import {VideoAllComponent} from "./pages/videos/video-all/video-all.component";
import {VideoDetailsComponent} from "./pages/videos/video-details/video-details.component";
import {VideoEditComponent} from "./pages/videos/video-edit/video-edit.component";
import {VideoFilterPipe} from "./services/video/video-filter.pipe";
import {LoginComponent} from "./auth/login/login.component";
import {Oauth2RedirectHandlerComponent} from "./auth/oauth2-redirect-handler/oauth2-redirect-handler.component";
import {RegisterComponent} from "./auth/register/register.component";
import {TokenConfirmationComponent} from "./auth/token-confirmation/token-confirmation.component";
import {UserTrackTileComponent} from "./pages/profile/user-track-tile/user-track-tile.component";
import {UserTracksComponent} from "./pages/profile/user-tracks/user-tracks.component";
import {UserTracksPartComponent} from "./pages/profile/user-tracks-part/user-tracks-part.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {AdminPanelComponent} from "./pages/admin/admin-panel/admin-panel.component";
import {AlertModule} from "./alert/alert.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ByPassSecurityPipe} from "./pipes/by-pass-security-pipe";
import {RegulationsComponent} from './pages/info/regulations/regulations.component';
import {PostEditComponent} from './pages/article/post-edit/post-edit.component';
import {BodyComponent} from './skeleton/body/body.component';
import {MaterialModule} from "./material.module";
import {AutoOpenMenuComponent} from './skeleton/navigation/auto-open-menu/auto-open-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SidebarRightComponent,
    SidebarLeftComponent,
    FooterComponent,
    HomeComponent,
    MenuListItemComponent,

    PlaylistComponent,
    PlaylistEditComponent,
    PlaylistDetailsComponent,
    PlaylistAllComponent,
    PlaylistAddComponent,

    VideoComponent,
    VideoAddComponent,
    VideoAllComponent,
    VideoDetailsComponent,
    VideoEditComponent,

    TrackComponent,
    TrackAddComponent,
    TrackCommentAddComponent,
    TopListComponent,
    TrackVoteButtonComponent,
    TracksClubComponent,
    TracksDanceComponent,
    TracksDiscoComponent,
    TracksRetroComponent,
    TracksSetComponent,
    TracksTechnoComponent,
    TracksVixaComponent,
    TrackTileComponent,
    TracksPartComponent,

    ArticlePartComponent,
    UserPartComponent,

    AdminPanelComponent,
    BoardAdminComponent,
    ForgotPasswordComponent,
    UserChangePasswordComponent,
    UserEditComponent,
    UserProfileComponent,

    UserTrackTileComponent,
    UserTracksComponent,
    UserTracksPartComponent,
    ProfileComponent,

    AddPostComponent,
    PostComponent,
    PostDetailsComponent,

    LoginComponent,
    Oauth2RedirectHandlerComponent,
    RegisterComponent,
    TokenConfirmationComponent,

    NotFoundComponent,


    PlaylistFilterPipe,
    UserFilterPipe,
    VideoFilterPipe,
    DateAgoPipe,
    ByPassSecurityPipe,
    RegulationsComponent,
    PostEditComponent,
    BodyComponent,
    AutoOpenMenuComponent
  ],
  imports: [
    AppRoutingModule,
    NoopAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxPaginationModule,
    FlexLayoutModule,
    FlexModule,
    AlertModule,

    /* region MATERIAL ANGULAR */
    MaterialModule,
    /* endregion */

    CKEditorModule,
    ReactiveFormsModule
  ],
  providers: [NavigationComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
