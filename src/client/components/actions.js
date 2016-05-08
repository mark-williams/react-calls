export const POSTS_RETRIEVED = 'POSTS_RETRIEVED';

export const postDataRetrieved = (data) => {
    return { type: POSTS_RETRIEVED, data: data };  
};
