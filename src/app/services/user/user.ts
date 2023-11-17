import {Track} from '../../pages/tracks/track/model/track';

export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  favoriteTracks: Track[];
  imageUrl: string;
  provider: string;
  providerId: number;
}
