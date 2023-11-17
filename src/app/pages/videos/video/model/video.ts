import {SafeResourceUrl} from '@angular/platform-browser';
import {Playlist} from "../../../playlists/playlist/model/playlist";

export class Video {
  id: number;
  name: string;
  url: string;
  category: string;
  commentCount: number;
  viewCount: number;
  likeCount: number;
  playlist: Playlist;
  safeUrl: SafeResourceUrl;
}
