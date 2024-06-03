import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import logo from '../../../public/logo.png'
import { FaKey, FaUserAstronaut, FaBirthdayCake } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { LoginView } from '../login-view/login-view'

export const SignupView = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [birthday, setBirthday] = useState('')
  const [action, setAction] = useState('Register')

  //clear form after submit
  const clearForm = () => {
    setUsername('')
    setPassword('')
    setEmail('')
    setBirthday('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    }
    fetch('https://movie-api-o5p9.onrender.com/users', {
      //fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('You have successfully signed up! Please log in.')
        clearForm()
        //redirect to login
        setAction('Login')
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <div className="wrapper">
      {action === 'Register' ? (
        <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
          <img
            src={logo}
            alt="logo"
            className="thumbnail mx-auto d-block mb-lg-4"
          />
          <div className="title">{action}</div>
          <Form.Group className="mb-2" controlId="formUsername">
            <Form.Label>
              <FaUserAstronaut className="icon" />
              Username
            </Form.Label>
            <Form.Control
              type="text"
              minLength={3}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="formPassword">
            <Form.Label>
              {' '}
              <FaKey className="icon" />
              Password
            </Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formEmail">
            <Form.Label className="mt-2">
              <MdEmail className="icon" />
              Email
            </Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="formBirthday">
            <Form.Label className="mt-2">
              {' '}
              <FaBirthdayCake className="icon" /> Birthday
            </Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </Form.Group>

          <Button className="w-100" variant="primary" type="submit">
            Register
          </Button>

          <div className="d-grid justify-content-end">
            {/* when the button is clicked show the <LoginView/> */}
            <Button
              className="text-muted px-0"
              variant="link"
              onClick={() => setAction('Login')}
            >
              Login
            </Button>
          </div>
        </Form>
      ) : (
        <div>
          <LoginView />
        </div>
      )}
    </div>
  )
}
