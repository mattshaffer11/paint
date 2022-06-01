import { Injectable } from '@angular/core';
import { State } from '~/core/interfaces';
import { GREEN, LOCAL_STORAGE_KEY, MIN_BRUSH_SIZE } from '~/app.constants';

const defaultInitialState: State = {
  past: [],
  current: {
    color: GREEN,
    strokeWidth: MIN_BRUSH_SIZE,
    elements: [],
  },
  future: [],
};

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {
  load(): State {
    const cachedState = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (typeof cachedState !== 'string') {
      return defaultInitialState;
    }

    try {
      return JSON.parse(cachedState) as State;
    } catch (e) {
      return defaultInitialState;
    }
  }

  save(state: State) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }
}
