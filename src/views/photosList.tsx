import {LazyLoadImage} from 'react-lazy-load-image-component';
import React, {useContext, useEffect, useState} from 'react';
import {FlickerService} from '../services/getPhotos';
import {Actions, AppContext} from '../App';
import {useParams, useSearchParams} from 'react-router-dom';

const DEFAULT_SEARCH = 'Iron Man';

export const PhotosList = () => {
  // filter is not stored in global context
  // because it changes with every key stroke on input field
  // will cause the whole Photo List to Re-render since
  // due to context every consumer gets re-render even if they are not using that part of state ex. filter
  // const [filter, setFilter] = useState('dogs');
  const [searchParams, setSearchParams] = useSearchParams();

  const {state, dispatch} = useContext(AppContext);

  const fetchImages = () => {
    dispatch({type: Actions.API_LOADING});

    //@ts-ignore
    FlickerService.getPhotos(searchParams.get('q') || DEFAULT_SEARCH).then((_photoResponse) => {
      console.log('Photo response', _photoResponse);
      dispatch({type: Actions.PHOTO_RESPONSE, payload: _photoResponse});
    });
  };

  console.log('App state', state);

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      <form
        className="flex space-x-2 mb-2 mx-auto relative items-center w-full max-w-[400px] md:max-w-2xl"
        onSubmit={(e) => {
          e.preventDefault();
          fetchImages();
        }}
      >
        <input
          className="px-4 py-2 rounded-full outline-none focus:ring-2 block border text-lg w-full "
          placeholder="Search Photos with a text"
          //@ts-ignore
          value={searchParams.get('q')}
          onChange={(e) => setSearchParams(`q=${e.target.value}`)}
        />
        <button
          type={'submit'}
          className={'px-4 py-1 bg-sky-500 text-white rounded-full absolute right-2 text-lg font-bold'}
        >
          {state.isLoading ? 'Loading...' : 'Search'}
        </button>
      </form>
      <p className={'text-xs font-medium text-gray-500 w-full max-w-[400px] md:max-w-2xl block mx-auto mb-8 pl-4'}>
        By Default Searching with filter as `
        <a href={`/?q=${DEFAULT_SEARCH}`}>
          <span className={'italic underline font-bold'}>{DEFAULT_SEARCH}</span>
        </a>
        `
      </p>
      <h1 className={'text-lg font-bold'}>{state.photoResponse.message}</h1>
      {state.isLoading && !state.photoResponse.message && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 animate-pulse duration-75">
          {Array(6)
            .fill(1)
            .map((_, idx) => (
              <div className="bg-gray-300 aspect-square rounded-md" key={idx}></div>
            ))}
        </div>
      )}
      {/*<pre>{JSON.stringify(photoResponse, null, 2)}</pre>*/}
      {!state.isLoading && !state.photoResponse.message && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {state.photoResponse.photo.map((_) => (
            <a
              key={_.id}
              href={`/${_.id}`}
              className={'block rounded-md cursor-pointer hover:shadow-md hover:scale-105 transition overflow-hidden'}
            >
              <LazyLoadImage
                //@ts-ignore
                alt={_.title}
                className={'md:aspect-square object-none object-center'}
                src={_.url} // use normal <img> attributes as props
              />
            </a>
          ))}
        </div>
      )}
    </>
  );
};
