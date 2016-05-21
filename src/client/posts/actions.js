import reqwest from 'reqwest';

export const POSTS_RETRIEVED = 'POSTS_RETRIEVED';
export const POSTS_START_RETRIEVING = 'POSTS_START_RETRIEVING';
export const USERS_RETRIEVED = 'USERS_RETRIEVED';
export const USER_FILTER_CHANGE = 'USER_FILTER_CHANGE';


export const postStartRetrieving = () => {
    return { type: POSTS_START_RETRIEVING };  
};

export const postDataRetrieved = (data) => {
    return { type: POSTS_RETRIEVED, data: data };  
};

export const usersDataRetrieved = (data) => {
    return { type: USERS_RETRIEVED, data: data };  
};

export const userFilterChange = (value) => {
    return { type: USER_FILTER_CHANGE, value: value };  
};

export const getData = () => {
    return function(dispatch) {
        dispatch(postStartRetrieving());
        setTimeout(() => {
            reqwest({
                url: 'http://jsonplaceholder.typicode.com/posts'
                , type: 'json'
                })
                .then(
                    (resp) => dispatch(postDataRetrieved(resp))
                )
                .fail((err, msg) => {
                    console.log('ERROR: ' + err);
                })
        }, 5000);
            
        reqwest({
            url: 'http://jsonplaceholder.typicode.com/users'
            , type: 'json'
            })
            .then(
                (resp) => dispatch(usersDataRetrieved(resp))
            )
            .fail((err, msg) => {
                console.log('ERROR: ' + err);
            });
    }
};

