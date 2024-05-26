import React, { act, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import logo from '../../../public/logo.png'
import { FaKey, FaUserAstronaut } from 'react-icons/fa'
import { SignupView } from '../signup/signup-view'

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [action, setAction] = useState('Login')

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault()

    const data = {
      username: username,
      password: password,
    }
    //fetch('https://movie-api-o5p9.onrender.com/login', {
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user))
          localStorage.setItem('token', data.token)
          onLoggedIn(data.user, data.token)
        } else {
          alert('No such user')
        }
      })
      .catch(() => {
        alert('Something went wrong')
      })
  }

  return (
    <div className="wrapper">
      {action === 'Login' ? (
        <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
          <img
            src={logo}
            alt="logo"
            className="thumbnail mx-auto d-block mb-lg-4"
          />
          <div className="title">{action}</div>
          <Form.Group className="mb-2" controlId="formUsername">
            <Form.Label>
              <FaUserAstronaut className="icon" /> Username
            </Form.Label>
            <Form.Control
              placeholder="Enter username"
              type="text"
              minLength={3}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formPassword">
            <Form.Label>
              <FaKey className="icon" />
              Password
            </Form.Label>
            <Form.Control
              placeholder="Enter password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button className="w-100" variant="primary" type="submit">
            Login
          </Button>

          <div className="d-grid justify-content-end">
            <Button
              className="text-muted px-0"
              variant="link"
              onClick={() => setAction('Register')}
            >
              Register
            </Button>
          </div>
        </Form>
      ) : (
        <div>
          <SignupView />
        </div>
      )}
    </div>
  )
}
