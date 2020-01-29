const store = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_POSTS_SUCCESS':
            return {
                ...state,
                items: action.items,
                loaded: action.loaded
            }
        default:
            return state
    }
}
export default store
