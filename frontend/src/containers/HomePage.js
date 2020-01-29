import { connect } from 'react-redux'
import HomePage from '../components/HomePage'
import { fetchPosts } from '../actions'

const mapStateToProps = (state, ownProps) => ({
    items: state.home.items,
    loaded: state.home.loaded
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchPosts: () => dispatch(fetchPosts())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage)