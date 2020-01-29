import api from '../services/api';

export function fetchPosts() {
  return dispatch => {
    api.get('/posts')
      .then(response => {
        let items = response.data;
        dispatch(fetchPostsSuccess(items));
      });
  }
}

export const fetchPostsSuccess = items => ({
  type: 'FETCH_POSTS_SUCCESS',
  items,
  loaded: true
});