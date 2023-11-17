import {User} from '../services/user/user';
import {Track} from '../pages/tracks/track/model/track';

export class Vote {
  id: number;
  user: User;
  track: Track;
}
