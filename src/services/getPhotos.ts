import axios from 'axios';
import {PhotoType} from '../types/photo';
import {PhotoResponse} from '../types/photoResponse';

axios.defaults.baseURL = 'https://www.flickr.com/services/rest';

class _Flicker {
  getPhotoUrl(photo: PhotoType) {
    return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
  }
  //   page: 1
  //   pages: 1234
  //   perpage: 100
  //   photo: (100) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
  // total: 123358
  async getPhotos(search: string = 'dogs'): Promise<PhotoResponse> {
    const {
      data: {photos},
    }: {data: {photos: PhotoResponse}} = await axios.get(`/`, {
      params: {
        text: search,
        method: 'flickr.photos.search',
        format: 'json',
        api_key: process.env.REACT_APP_FLICKER_API_KEY,
        nojsoncallback: '1',
      },
    });

    console.log('data', photos);
    return {...photos, photo: photos.photo.map((_) => ({..._, url: this.getPhotoUrl(_)}))};
  }

  async getPhotoDetails(id: string): Promise<PhotoType | null> {
    const {data} = await axios.get(`/`, {
      params: {
        method: 'flickr.photos.getInfo',
        photo_id: id,
        format: 'json',
        api_key: process.env.REACT_APP_FLICKER_API_KEY,
        nojsoncallback: '1',
      },
    });

    if (data?.photo) return {...data?.photo, url: this.getPhotoUrl(data?.photo)};
    return null;
  }
}

export const FlickerService = new _Flicker();
