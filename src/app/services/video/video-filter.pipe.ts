import { Pipe, PipeTransform } from '@angular/core';
import { Video } from '../../pages/videos/video/model/video';

@Pipe({
  name: 'videoFilter'
})
export class VideoFilterPipe implements PipeTransform {

  transform(videos: Video[], text: string): Video[] {
    if (text == null || text === '') {
      return videos;
    }
    return videos.filter(n => n.name.includes(text));
  }

}
