'use strict';
import reducer, { postsReducer, usersReducer, filterReducer }  from '../posts/reducers';
import { postDataRetrieved, usersDataRetrieved, userFilterChange } from '../posts/actions';

var chai = require('chai');
var expect = chai.expect;


describe('Reducer tests', function () {

    describe('postsReducer', () => {
        let posts = [];
        
        beforeEach(function () {
            posts = [
                { id: 1, userId: 100 },
                { id: 2, userId: 100 },
                { id: 3, userId: 101 }
            ];
        });

        it('PostsReducer_on_invalid_action_sets_posts_to empty', function () {
            var newState = postsReducer(undefined, { type: 'INVALID', data: null });
            expect(newState).to.have.length(0);
        });

        it('PostsReducer_on_postsreceived_action_sets_posts', function () {
            var newState = postsReducer(null, postDataRetrieved(posts));
            expect(newState).to.have.length(posts.length);
        });
    });
        
    describe('usersReducer', () => {
        let users = [];
        
        beforeEach(function () {
            users = [
                { id: 1, name: 'Fred' },
                { id: 2, name: 'Sarah' },
                { id: 3, name: 'John' }
            ];
        });

        it('UsersReducer_on_invalid_action_sets_users_to empty', function () {
            var newState = usersReducer(undefined, { type: 'INVALID', data: null });
            expect(newState).to.have.length(0);
        });

        it('UsersReducer_on_usersreceived_action_sets_users', function () {
            var newState = usersReducer(null, usersDataRetrieved(users));
            expect(newState).to.have.length(users.length);
        });
    });

    describe('filterReducer', () => {
        
        it('FilterReducer_on_invalid_action_sets_filter_to_zero', function () {
            var newState = filterReducer(undefined, { type: 'INVALID', data: null });
            expect(newState).to.equal(0);
        });

        it('FilterReducer_sets_filter_to_value_passed_in', function () {
            var newState = filterReducer(null, userFilterChange(3));
            expect(newState).to.equal(3);
        });
    });
});