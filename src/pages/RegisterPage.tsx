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

import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'

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

const RegisterPage = () => {
  const history = useHistory()
  const classes = useStyles()

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

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
    setConfirmPasswordError('')

    if (email === '') {
      return setEmailError('Email is required')
    }
    if (!validEmail.test(email)) {
      return setEmailError('Please Enter a valid email')
    }
    if (password === '') {
      return setPasswordError('Password is required')
    }
    if (password.length < 8) {
      return setPasswordError('Password must be at least 8 characters')
    }
    if (!validPassword.test(password)) {
      return setPasswordError('Password must contain a number and alphabet')
    }
    if (confirmPassword === '') {
      return setConfirmPasswordError('Password Confirmation is required')
    }
    if (confirmPassword !== password) {
      return setPasswordError('Password and confirm password must match')
    }
    const user = { email, password }
    const users = localStorage.getItem('users')
    if (users) {
      const newUsers = JSON.parse(users)
      const isUserRegistered = newUsers.find(
        (user: any) => user.email === email
      )
      if (isUserRegistered) {
        return setEmailError('User Already Registered')
      }
      newUsers.push(user)
      localStorage.setItem('users', JSON.stringify(newUsers))
    } else {
      const createUsers = []
      createUsers.push(user)
      localStorage.setItem('users', JSON.stringify(createUsers))
    }
    setOpen(true)

    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setTimeout(() => {
      return history.push('/login')
    }, 1000)
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
        message='User Created Successfully'
      />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign Up
        </Typography>
        <form onSubmit={(e) => onFormSubmit(e)} noValidate>
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
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            name='confirm_password'
            label='Confirm Password'
            type='password'
            id='password'
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              setConfirmPasswordError('')
              setPasswordError('')
            }}
            error={confirmPasswordError ? true : false}
            helperText={confirmPasswordError}
            value={confirmPassword}
          />

          <Button type='submit' fullWidth variant='contained' color='primary'>
            Register
          </Button>
          <Grid container className={classes.footer}>
            <Grid item>
              <Link to='/login'>{'Do you have an account? Sign In'}</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default RegisterPage
