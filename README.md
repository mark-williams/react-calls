#React-Redux and API
Small project to investigate driving a webpack/React build pipeline using Gulp.

###Initial
Tiny React app that lists some posts obtained from a test api: http://jsonplaceholder.typicode.com/.

Initially the data is retrieved from within componentDidMount, but I plan to add redux to the app and update its state by dispatching an action once the data is retrieved.

Finally I'll add some sort of UI (say, a filter), the state of which will also be held in the redux store.

###Redux
Introduced a very basic redux implementation - when posts are retrieved that are dispatched as a an action to the store which hold the posts data. The PostList component will react to changes in the store to render the items.

###Filtering by user
Now supports filtering of posts by user. This is implemented by a fairly dumb component, PostFilter, that receives a list of users as props and a callback to invoke when the selected user changes. Again, this will trigger an action to be dispatched to the store and effect the appropriate change in the store's state.

Currently one reducer is handling all actions; I will try and tidy this up, looking to have separate reducers for each action.

###Reducer composition
The initial reducer function has now been split into several reducers, each responsible for a particular part of the state. Possibly overkill in such a simple solution as this, however this is to illustrate *reducer composition* - in this case the constituent parts of the overall state are managed by separate reducers:

~~~~
const reducer = (state = initialState, action) => {
    return {
        posts: postsReducer(state.posts, action),
        users: usersReducer(state.users, action),
        userFilter: filterReducer(state.userFilter, action)
    }
}
~~~~

#####Tests
Added some basic tests for the reducers - will enhance these using *Deep-Freeze* to ensure immutability.

15 May 2016 - added tests for immutability using Deep-Freeze.

####Added uiState
Added an extra state property to indicate where data is being loaded (so we could show, say, a spinner or *loading* message). This of course has its own reducer. I've added a simple timeout before making the api call to simualte a slow call.


