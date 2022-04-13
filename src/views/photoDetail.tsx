import {useContext, useEffect, useState} from 'react';
import {AppContext} from '../App';
import {useParams} from 'react-router-dom';
import {PhotoType} from '../types/photo';
import {FlickerService} from '../services/getPhotos';

export const PhotoDetail = () => {
  const {photoId} = useParams<{photoId: string}>();
  const [isLoading, setLoading] = useState(false);
  const [photo, setPhoto] = useState<PhotoType>();

  useEffect(() => {
    (async () => {
      setLoading(true);
      //@ts-ignore
      const _photo = await FlickerService.getPhotoDetails(photoId);
      console.log('photo', _photo);
      setLoading(false);
      //@ts-ignore
      setPhoto(_photo);
    })();
  }, []);

  if (isLoading) return <div className={'h-96 aspect-square mx-auto animate-pulse bg-gray-300'}></div>;

  if (!photo) return <h1>Photo not found</h1>;

  return (
    <div>
      <img className={'h-[400px] mx-auto'} src={photo.url} />
      <p className={'text-gray-500 text-lg font-bold mt-4 mx-auto w-fit'}>{photo.title._content}</p>
    </div>
  );
};
