import reducer, { postsReducer, usersReducer, filterReducer, uiReducer }  from '../posts/reducers';
import { UI_LOADING, UI_LOADED } from '../posts/reducers';
import { startRetrievingData, postDataRetrieved, usersDataRetrieved, userFilterChange } from '../posts/actions';
import deepFreeze from 'deep-freeze';

/* eslint no-undefined: 0 */
describe('Reducer tests', () => {
  let posts = [];
  let users = [];

  beforeEach(() => {
    posts = [
      { id: 1, userId: 100 },
      { id: 2, userId: 100 },
      { id: 3, userId: 101 }
    ];

    users = [
      { id: 1, name: 'Fred' },
      { id: 2, name: 'Sarah' },
      { id: 3, name: 'John' }
    ];
  });

  describe('postsReducer', () => {
    it('should set posts to empty for an unsuported action', () => {
      var newState = postsReducer(undefined, { type: 'INVALID', data: null });
      expect(newState.length).toBe(0);
    });

    it('retrieved action should set posts to the data delivered', () => {
      var newState = postsReducer(null, postDataRetrieved(posts));
      expect(newState.length).toEqual(posts.length);
    });
  });

  describe('usersReducer', () => {
    it('should set users to empty for an unsupported action', () => {
      var newState = usersReducer(undefined, { type: 'INVALID', data: null });
      expect(newState.length).toEqual(0);
    });

    it('valid action should set the users to the data delivered', () => {
      var newState = usersReducer(null, usersDataRetrieved(users));
      expect(newState.length).toEqual(users.length);
    });
  });

  describe('filterReducer', () => {
    it('should default to zero for unsupported actions', () => {
      var newState = filterReducer(undefined, { type: 'INVALID', data: null });
      expect(newState).toEqual(0);
    });

    it('valid action should set the data to that passed in', () => {
      var newState = filterReducer(null, userFilterChange(3));
      expect(newState).toEqual(3);
    });
  });

  describe('uiState reducer', () => {
    it('should default to \'loading\' for unsupported actions', () => {
      var newState = uiReducer(undefined, { type: 'INVALID' });
      expect(newState).toEqual(UI_LOADING);
    });

    it('should default to \'loading\' for start retrieving action', () => {
      var newState = uiReducer(undefined, startRetrievingData());
      expect(newState).toEqual(UI_LOADING);
    });

    it('should default to \'loaded\' for posts retrieved action', () => {
      var newState = uiReducer(undefined, postDataRetrieved(posts));
      expect(newState).toEqual(UI_LOADED);
    });
  });

  describe('Immutable state', () => {
    it('should not mutate the state when setting posts', () => {
      var initialState = {
        posts: [],
        users: [],
        userFilter: 0
      };

      deepFreeze(initialState);

      let newState = reducer(initialState, postDataRetrieved(posts));
      expect(newState.posts.length).toEqual(3);
    });

    it('should not mutate the state when setting users', () => {
      var initialState = {
        posts: [],
        users: [],
        userFilter: 0
      };

      deepFreeze(initialState);

      let newState = reducer(initialState, usersDataRetrieved(users));
      expect(newState.users.length).toEqual(3);
    });

    it('should not mutate the state when setting userFilter', () => {
      var initialState = {
        posts: [],
        users: [],
        userFilter: 0
      };

      deepFreeze(initialState);

      let newState = reducer(initialState, userFilterChange(3));
      expect(newState.userFilter).toEqual(3);
    });
  });
});

