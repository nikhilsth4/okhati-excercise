import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: 'blue',
      color: 'white',
      flexDirection: 'column',
    },
    headerTitle: {},
  })
)

const HomePage = () => {
  const classes = useStyles()
  const history = useHistory()

  let email = null

  const userStorage = localStorage.getItem('user')
  if (userStorage && userStorage.length > 0) {
    const user = JSON.parse(userStorage)
    if (user.email) {
      email = user.email
    }
  }

  return (
    <div className={classes.headerContainer}>
      <Typography variant='h3' className={classes.headerTitle}>
        Welcome to home page {email ? `${email}` : ''}
      </Typography>
      <br />
      <Button
        variant='contained'
        color='secondary'
        onClick={() => {
          localStorage.removeItem('user')
          history.push('/login')
        }}
      >
        Logout
      </Button>
    </div>
  )
}

export default HomePage
