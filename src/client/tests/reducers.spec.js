import reducer, { postsReducer, usersReducer, filterReducer }  from '../posts/reducers';
import { postDataRetrieved, usersDataRetrieved, userFilterChange } from '../posts/actions';
import deepFreeze from 'deep-freeze';

var chai = require('chai');
var expect = chai.expect;

describe('Reducer tests', function () {

    let posts = [];
    let users = [];

    beforeEach(function () {
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

        it('should set posts to empty for an unsuported action', function () {
            var newState = postsReducer(undefined, { type: 'INVALID', data: null });
            expect(newState).to.have.length(0);
        });

        it('given a valid action should set posts to the data delivered', function () {
            var newState = postsReducer(null, postDataRetrieved(posts));
            expect(newState).to.have.length(posts.length);
        });
    });

    describe('usersReducer', () => {

        it('should set users to empty for an unsupported action', function () {
            var newState = usersReducer(undefined, { type: 'INVALID', data: null });
            expect(newState).to.have.length(0);
        });

        it('given a valid action should set the users to the data delivered', function () {
            var newState = usersReducer(null, usersDataRetrieved(users));
            expect(newState).to.have.length(users.length);
        });
    });

    describe('filterReducer', () => {

        it('should default to zero for unsupported actions', function () {
            var newState = filterReducer(undefined, { type: 'INVALID', data: null });
            expect(newState).to.equal(0);
        });

        it('given a valid action should set the data to that passed in', function () {
            var newState = filterReducer(null, userFilterChange(3));
            expect(newState).to.equal(3);
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

