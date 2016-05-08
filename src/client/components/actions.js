export const POSTS_RETRIEVED = 'POSTS_RETRIEVED';
export const USERS_RETRIEVED = 'USERS_RETRIEVED';
export const USER_FILTER_CHANGE = 'USER_FILTER_CHANGE';

export const postDataRetrieved = (data) => {
    return { type: POSTS_RETRIEVED, data: data };  
};

export const usersDataRetrieved = (data) => {
    return { type: USERS_RETRIEVED, data: data };  
};

export const userFilterChange = (value) => {
    return { type: USER_FILTER_CHANGE, value: value };  
};
