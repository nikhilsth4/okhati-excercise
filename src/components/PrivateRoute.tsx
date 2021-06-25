import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ ...rest }) => {
  const userStorage = localStorage.getItem('user')
  let isAuthenticated = false
  if (userStorage && userStorage.length > 0) {
    const user = JSON.parse(userStorage)
    if (user.isAuthenticated) {
      isAuthenticated = true
    }
  }

  //   const isAuthenticate = user ? true : false

  return isAuthenticated ? <Route {...rest} /> : <Redirect to='/login' />
}

export default PrivateRoute
