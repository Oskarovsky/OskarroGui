import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TrackComponent} from './pages/tracks/track/track.component';
import {TopListComponent} from './pages/tracks/top-list/top-list.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {PlaylistComponent} from './pages/playlists/playlist/playlist.component';
import {PlaylistAddComponent} from './pages/playlists/playlist-add/playlist-add.component';
import {PlaylistEditComponent} from './pages/playlists/playlist-edit/playlist-edit.component';
import {PlaylistDetailsComponent} from './pages/playlists/playlist-details/playlist-details.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {BoardAdminComponent} from './pages/user/board-admin/board-admin.component';
import {VideoComponent} from './pages/videos/video/video.component';
import {VideoAddComponent} from './pages/videos/video-add/video-add.component';
import {VideoDetailsComponent} from './pages/videos/video-details/video-details.component';
import {VideoEditComponent} from './pages/videos/video-edit/video-edit.component';
import {PlaylistAllComponent} from './pages/playlists/playlist-all/playlist-all.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {HomeComponent} from './pages/home/home.component';
import {PostComponent} from './pages/article/post/post.component';
import {AddPostComponent} from './pages/article/add-post/add-post.component';
import {AdminPanelComponent} from './pages/admin/admin-panel/admin-panel.component';
import {PostDetailsComponent} from './pages/article/post-details/post-details.component';
import {TrackAddComponent} from './pages/tracks/track-add/track-add.component';
import {TokenConfirmationComponent} from './auth/token-confirmation/token-confirmation.component';
import {UserTracksPartComponent} from './pages/profile/user-tracks-part/user-tracks-part.component';
import {UserProfileComponent} from './pages/user/user-profile/user-profile.component';
import {TracksVixaComponent} from './pages/tracks/tracks-by-genre/genre/tracks-vixa/tracks-vixa.component';
import {TracksClubComponent} from './pages/tracks/tracks-by-genre/genre/tracks-club/tracks-club.component';
import {TracksDiscoComponent} from './pages/tracks/tracks-by-genre/genre/tracks-disco/tracks-disco.component';
import {TracksTechnoComponent} from './pages/tracks/tracks-by-genre/genre/tracks-techno/tracks-techno.component';
import {TracksRetroComponent} from './pages/tracks/tracks-by-genre/genre/tracks-retro/tracks-retro.component';
import {TracksDanceComponent} from './pages/tracks/tracks-by-genre/genre/tracks-dance/tracks-dance.component';
import {Oauth2RedirectHandlerComponent} from './auth/oauth2-redirect-handler/oauth2-redirect-handler.component';
import {UserEditComponent} from './pages/user/user-edit/user-edit.component';
import {ForgotPasswordComponent} from './pages/user/forgot-password/forgot-password.component';
import {UserChangePasswordComponent} from './pages/user/user-change-password/user-change-password.component';
import {TracksSetComponent} from './pages/tracks/tracks-by-genre/genre/tracks-set/tracks-set.component';
import {VideoAllComponent} from './pages/videos/video-all/video-all.component';
import {RegulationsComponent} from "./pages/info/regulations/regulations.component";
import {PostEditComponent} from "./pages/article/post-edit/post-edit.component";


const routes: Routes = [

  /* TRACKS */
  { path: 'toplist', component: TopListComponent },
  { path: 'toplist/:genre', component: TopListComponent },

  { path: 'track/:id', component: TrackComponent },
  { path: 'tracks/add', component: TrackAddComponent },

  { path: 'tracks/vixa', component: TracksVixaComponent },
  { path: 'tracks/club', component: TracksClubComponent },
  { path: 'tracks/dance', component: TracksDanceComponent },
  { path: 'tracks/retro', component: TracksRetroComponent },
  { path: 'tracks/techno', component: TracksTechnoComponent },
  { path: 'tracks/disco', component: TracksDiscoComponent },
  { path: 'tracks/set', component: TracksSetComponent },

  { path: 'tracks/vixa/:page', component: TracksVixaComponent },
  { path: 'tracks/club/:page', component: TracksClubComponent },
  { path: 'tracks/dance/:page', component: TracksDanceComponent },
  { path: 'tracks/retro/:page', component: TracksRetroComponent },
  { path: 'tracks/techno/:page', component: TracksTechnoComponent },
  { path: 'tracks/disco/:page', component: TracksDiscoComponent },
  { path: 'tracks/set/:page', component: TracksSetComponent },

  { path: 'playlist/all', component: PlaylistAllComponent },
  { path: 'playlist/all/:username', component: PlaylistComponent },
  { path: 'playlist/add', component: PlaylistAddComponent },
  { path: 'playlist/:id/edit', component: PlaylistEditComponent },
  { path: 'playlist/:id/details', component: PlaylistDetailsComponent },

  /* ARTICLE */
  { path: 'post/user/:username', component: PostComponent},
  { path: 'post/add', component: AddPostComponent},
  { path: 'post/:id/details', component: PostDetailsComponent},
  { path: 'post/:id/edit', component: PostEditComponent},

  { path: 'video/category/:category', component: VideoComponent },
  { path: 'video/:id/edit', component: VideoEditComponent },
  { path: 'video/:id/details', component: VideoDetailsComponent },
  { path: 'video/add', component: VideoAddComponent },
  { path: 'video/all', component: VideoAllComponent },

  /* INFO */
  { path: 'info/regulations', component: RegulationsComponent },

  /* USER */
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/edit', component: UserEditComponent },
  { path: 'profile/edit/changePassword', component: UserChangePasswordComponent },
  { path: 'profile/tracks/:page', component: UserTracksPartComponent },
  { path: 'profile/tracks', component: UserTracksPartComponent },
  { path: 'user/:username', component: UserProfileComponent },
  { path: 'confirmAccount/:token', component: TokenConfirmationComponent },
  { path: 'oauth2/redirect', component: Oauth2RedirectHandlerComponent },

  /* ADMIN */
  { path: 'admin', component: BoardAdminComponent },
  { path: 'admin/panel', component: AdminPanelComponent },

  /* GLOBAL */
  { path: '', component: HomeComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: true }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
