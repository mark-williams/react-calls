import reducer, { postsReducer, usersReducer, filterReducer, uiReducer }  from '../posts/reducers';
import { UI_LOADING, UI_LOADED } from '../posts/reducers';
import { startRetrievingData, postDataRetrieved, usersDataRetrieved, userFilterChange } from '../posts/actions';
import deepFreeze from 'deep-freeze';

/* eslint no-undefined: 0 */
var chai = require('chai');
var expect = chai.expect;

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
      expect(newState).to.have.length(0);
    });

    it('retrieved action should set posts to the data delivered', () => {
      var newState = postsReducer(null, postDataRetrieved(posts));
      expect(newState).to.have.length(posts.length);
    });
  });

  describe('usersReducer', () => {
    it('should set users to empty for an unsupported action', () => {
      var newState = usersReducer(undefined, { type: 'INVALID', data: null });
      expect(newState).to.have.length(0);
    });

    it('valid action should set the users to the data delivered', () => {
      var newState = usersReducer(null, usersDataRetrieved(users));
      expect(newState).to.have.length(users.length);
    });
  });

  describe('filterReducer', () => {
    it('should default to zero for unsupported actions', () => {
      var newState = filterReducer(undefined, { type: 'INVALID', data: null });
      expect(newState).to.equal(0);
    });

    it('valid action should set the data to that passed in', () => {
      var newState = filterReducer(null, userFilterChange(3));
      expect(newState).to.equal(3);
    });
  });

  describe('uiState reducer', () => {
    it('should default to \'loading\' for unsupported actions', () => {
      var newState = uiReducer(undefined, { type: 'INVALID' });
      expect(newState).to.equal(UI_LOADING);
    });

    it('should default to \'loading\' for start retrieving action', () => {
      var newState = uiReducer(undefined, startRetrievingData());
      expect(newState).to.equal(UI_LOADING);
    });

    it('should default to \'loaded\' for posts retrieved action', () => {
      var newState = uiReducer(undefined, postDataRetrieved(posts));
      expect(newState).to.equal(UI_LOADED);
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
      expect(newState.posts).to.have.length(3);
    });

    it('should not mutate the state when setting users', () => {
      var initialState = {
        posts: [],
        users: [],
        userFilter: 0
      };

      deepFreeze(initialState);

      let newState = reducer(initialState, usersDataRetrieved(users));
      expect(newState.users).to.have.length(3);
    });

    it('should not mutate the state when setting userFilter', () => {
      var initialState = {
        posts: [],
        users: [],
        userFilter: 0
      };

      deepFreeze(initialState);

      let newState = reducer(initialState, userFilterChange(3));
      expect(newState.userFilter).to.equal(3);
    });
  });
});

