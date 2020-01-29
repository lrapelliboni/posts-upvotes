import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import AddPost from '../components/AddPost'
import HomePage from './HomePage'
import TopMenu from '../components/TopMenu'
const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <TopMenu />
      <Route path="/" exact={true} component={HomePage} />
      <Route path="/add-post" component={AddPost} />
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}
export default Root