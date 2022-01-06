import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavigationComponent} from "./navigation/navigation.component";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSortModule} from "@angular/material/sort";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatPaginatorModule} from "@angular/material/paginator";
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MenuListItemComponent} from "./navigation/menu-list-item/menu-list-item.component";
import {SidebarRightComponent} from "./sidebar/sidebar-right/sidebar-right.component";
import {FooterComponent} from "./footer/footer.component";
import {HomeComponent} from "./home/home.component";
import {CKEditorModule} from "ng2-ckeditor";
import {AddPostComponent} from "./article/add-post/add-post.component";
import {PostComponent} from "./article/post/post.component";
import {PlaylistFilterPipe} from "./services/playlist/playlist-filter.pipe";
import {PostDetailsComponent} from "./article/post-details/post-details.component";
import {SidebarLeftComponent} from "./sidebar/sidebar-left/sidebar-left.component";
// import { AngularFontAwesomeModule } from "angular-font-awesome";
import {NotFoundComponent} from "./not-found/not-found.component";
import {DateAgoPipe} from "./pipes/date-ago.pipe";
import {TrackComponent} from "./tracks/track/track.component";
import {TrackAddComponent} from "./tracks/track-add/track-add.component";
import {TrackCommentAddComponent} from "./tracks/track-comment-add/track-comment-add.component";
import {TopListComponent} from "./tracks/top-list/top-list.component";
import {TrackVoteButtonComponent} from "./tracks/track-vote-button/track-vote-button.component";
import {TracksClubComponent} from "./tracks/tracks-by-genre/genre/tracks-club/tracks-club.component";
import {TracksDanceComponent} from "./tracks/tracks-by-genre/genre/tracks-dance/tracks-dance.component";
import {TracksDiscoComponent} from "./tracks/tracks-by-genre/genre/tracks-disco/tracks-disco.component";
import {TracksRetroComponent} from "./tracks/tracks-by-genre/genre/tracks-retro/tracks-retro.component";
import {TracksSetComponent} from "./tracks/tracks-by-genre/genre/tracks-set/tracks-set.component";
import {TracksTechnoComponent} from "./tracks/tracks-by-genre/genre/tracks-techno/tracks-techno.component";
import {TracksVixaComponent} from "./tracks/tracks-by-genre/genre/tracks-vixa/tracks-vixa.component";
import {TrackTileComponent} from "./tracks/tracks-by-genre/track-tile/track-tile.component";
import {TracksPartComponent} from "./tracks/tracks-by-genre/tracks-part/tracks-part.component";
import {ZippyPlayerComponent} from "./tracks/zippy-player/zippy-player.component";
import {PlaylistComponent} from "./playlists/playlist/playlist.component";
import {NgxPaginationModule} from "ngx-pagination";
import {PlaylistEditComponent} from "./playlists/playlist-edit/playlist-edit.component";
import {PlaylistDetailsComponent} from "./playlists/playlist-details/playlist-details.component";
import {PlaylistAllComponent} from "./playlists/playlist-all/playlist-all.component";
import {PlaylistAddComponent} from "./playlists/playlist-add/playlist-add.component";
import {AuditsComponent} from "./admin/audits/audits.component";
import {ArticlePartComponent} from "./admin/components/article-part/article-part.component";
import {UserPartComponent} from "./admin/components/user-part/user-part.component";
import {UserFilterPipe} from "./pipes/user-filter.pipe";
import {UserManagementComponent} from "./admin/user-management/user-management.component";
import {BoardAdminComponent} from "./user/board-admin/board-admin.component";
import {BoardModeratorComponent} from "./user/board-moderator/board-moderator.component";
import {BoardUserComponent} from "./user/board-user/board-user.component";
import {ForgotPasswordComponent} from "./user/forgot-password/forgot-password.component";
import {UserChangePasswordComponent} from "./user/user-change-password/user-change-password.component";
import {UserEditComponent} from "./user/user-edit/user-edit.component";
import {UserProfileComponent} from "./user/user-profile/user-profile.component";
import {VideoComponent} from "./videos/video/video.component";
import {VideoAddComponent} from "./videos/video-add/video-add.component";
import {VideoAllComponent} from "./videos/video-all/video-all.component";
import {VideoDetailsComponent} from "./videos/video-details/video-details.component";
import {VideoEditComponent} from "./videos/video-edit/video-edit.component";
import {VideoFilterPipe} from "./services/video/video-filter.pipe";
import {LoginComponent} from "./auth/login/login.component";
import {Oauth2RedirectHandlerComponent} from "./auth/oauth2-redirect-handler/oauth2-redirect-handler.component";
import {RegisterComponent} from "./auth/register/register.component";
import {TokenConfirmationComponent} from "./auth/token-confirmation/token-confirmation.component";
import {UserTrackTileComponent} from "./profile/user-track-tile/user-track-tile.component";
import {UserTracksComponent} from "./profile/user-tracks/user-tracks.component";
import {UserTracksPartComponent} from "./profile/user-tracks-part/user-tracks-part.component";
import {ProfileComponent} from "./profile/profile.component";
import {AboutComponent} from "./info/about/about.component";
import {ContactComponent} from "./info/contact/contact.component";
import {AdminPanelComponent} from "./admin/admin-panel/admin-panel.component";
import {AlertModule} from "./alert/alert.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ByPassSecurityPipe} from "./pipes/by-pass-security-pipe";


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
    ZippyPlayerComponent,

    AuditsComponent,
    ArticlePartComponent,
    UserPartComponent,
    UserManagementComponent,

    AdminPanelComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    ForgotPasswordComponent,
    UserChangePasswordComponent,
    UserEditComponent,
    UserProfileComponent,

    UserTrackTileComponent,
    UserTracksComponent,
    UserTracksPartComponent,
    ProfileComponent,

    AboutComponent,
    ContactComponent,

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
    ByPassSecurityPipe
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
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatSortModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatSidenavModule,
    /* endregion */

    CKEditorModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
