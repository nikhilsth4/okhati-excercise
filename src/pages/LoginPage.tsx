import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import {
  Grid,
  TextField,
  Button,
  Container,
  Avatar,
  CssBaseline,
  Snackbar,
} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    footer: {
      margin: theme.spacing(2, 0, 0, 0),
    },
  })
)

const LoginPage = () => {
  const history = useHistory()
  const classes = useStyles()

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [open, setOpen] = useState(false)

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      return history.push('/')
    }
  }, [history])

  const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$')
  const validPassword = new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setEmailError('')
    setPasswordError('')
    if (!localStorage.getItem('users')) {
      return setEmailError('Please Register first')
    }
    if (email === '') {
      return setEmailError('Email is required')
    }
    if (!validEmail.test(email)) {
      console.log(email)
      return setEmailError('Please Enter a valid email')
    }
    if (password === '') {
      return setPasswordError('Password is required')
    }
    if (!validPassword.test(password)) {
      return setPasswordError('Password must contain a number and alphabet')
    }

    const user = { email, password, isAuthenticated: true }
    const users = localStorage.getItem('users')
    if (users && users.length > 0) {
      const newUsers = JSON.parse(users)
      const isUserRegistered = newUsers.find(
        (user: any) => user.email === email && user.password === password
      )
      if (!isUserRegistered) {
        return setEmailError('Invalid email or Password')
      }
      localStorage.setItem('user', JSON.stringify(user))

      setOpen(true)

      setEmail('')
      setPassword('')
      setTimeout(() => {
        return history.push('/')
      }, 1000)
    }
  }
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message='Logged in Successfully'
      />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form
          className={classes.form}
          onSubmit={(e) => onFormSubmit(e)}
          noValidate
        >
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoFocus
            type='email'
            onChange={(e) => {
              setEmail(e.target.value)
              setEmailError('')
            }}
            error={emailError ? true : false}
            helperText={emailError}
            value={email}
          />
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            onChange={(e) => {
              setPassword(e.target.value)
              setPasswordError('')
            }}
            error={passwordError ? true : false}
            helperText={passwordError}
            value={password}
          />
          <Button type='submit' fullWidth variant='contained' color='primary'>
            Sign In
          </Button>
          <Grid container className={classes.footer}>
            <Grid item>
              <Link to='/register'>{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default LoginPage
