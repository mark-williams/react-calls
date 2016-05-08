#React-Redux and API
Small project to investigate driving a webpack/React build pipeline using Gulp.

##Initial
Tiny React app that lists some posts obtained from a test api: http://jsonplaceholder.typicode.com/.

Initially the data is retrieved from within componentDidMount, but I plan to add redux to the app and update its state by dispatching an action once the data is retrieved.

Finally I'll add some sort of UI (say, a filter), the state of which will also be held in the redux store.

##Redux
Introduced a very basic redux implementation - when posts are retrieved that are dispatched as a an action to the store which hold the posts data. The PostList component will react to changes in the store to render the items.

##Filtering by user
Now supports filtering of posts by user. This is implemented by a fairly dumb component, PostFilter, that receives a list of users as props and a callback to invoke when the selected user changes. Again, this will trigger an action to be dispatched to the store and effect the appropriate change in the store's state.

Currently one reducer is handling all actions; I will try and tidy this up, looking to have separate reducers for each action.

