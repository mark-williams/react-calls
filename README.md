# gulp-webpack-react
Small project to investigate driving a webpack/React build pipeline using Gulp.

##Initial
Tiny React app that lists some posts obtained from a test api: http://jsonplaceholder.typicode.com/.

Initially the data is retrieved from within componentDidMount, but I plan to add redux to the app and update its state by dispatching an action once the data is retrieved.

Finally I'll add some sort of UI (say, a filter), the state of which will also be held in the redux store.
