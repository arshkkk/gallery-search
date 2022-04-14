import React, {Component, createContext, useEffect, useState} from 'react';
import {FlickerService} from './services/getPhotos';
import {PhotoResponse} from './types/photoResponse';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {Route, Routes} from 'react-router-dom';
import {PhotosList} from './views/photosList';
import {PhotoDetail} from './views/photoDetail';

export interface AppState {
  photoResponse: PhotoResponse;
  isLoading: boolean;
}

export enum Actions {
  PHOTO_RESPONSE = 'PHOTO_RESPONSE',
  API_LOADING = 'API_LOADING',
}

// @ts-ignore
export const AppContext = createContext<{state: AppState; dispatch: any}>();

function reducer(state: AppState, action: any): AppState {
  switch (action.type) {
    case Actions.PHOTO_RESPONSE: {
      return {...state, isLoading: false, photoResponse: action.payload};
    }

    case Actions.API_LOADING: {
      return {...state, isLoading: action.payload || true};
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function App() {
  // @ts-ignore
  const [state, dispatch] = React.useReducer(reducer, {photoResponse: {photo: []}, isLoading: false});
  const value = {state, dispatch};

  return (
    <AppContext.Provider value={value}>
      <div>
        <div className="max-w-5xl mx-auto py-4 px-6">
          <Routes>
            <Route path="/" element={<PhotosList />} />
            <Route path="/:photoId" element={<PhotoDetail />} />
          </Routes>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
