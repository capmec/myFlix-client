import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { useEffect, useState } from 'react'
import { FavoriteMovies } from './favorite-movies'
import { UpdateUser } from './update-user'
import { Card, Button, Image } from 'react-bootstrap'
import { FaUserAstronaut } from 'react-icons/fa'
import './profile-view.scss'

export const ProfileView = ({ token, user, movies, onSubmit }) => {
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [birthday, setBirthday] = useState(user.birthday)
  const [password, setPassword] = useState('')

  const favoriteMovies =
    movies && user && user.FavoriteMovies
      ? movies.filter((m) => user.FavoriteMovies.includes(m.title))
      : []

  const formData = {
    username: username,
    email: email,
    password: password,
    birthday: birthday
      ? new Date(birthday).toISOString().substring(0, 10)
      : null,
  }

  const handleSubmit = (event) => {
    event.preventDefault(event)

    // Send updated user information to the server, endpoint /users/:username
    //fetch(`https://movie-api-o5p9.onrender.com/users/${storedUser.username}`, {
    fetch(`http://localhost:8080/users/${user._id}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert('Update successful')
          return response.json()
        }
        alert('Update failed')
      })
      .then((data) => {
        localStorage.setItem('user', JSON.stringify(data))
        onSubmit(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleUpdate = (e) => {
    switch (e.target.type) {
      case 'text':
        setUsername(e.target.value)
        break
      case 'email':
        setEmail(e.target.value)
        break
      case 'password':
        setPassword(e.target.value)
        break
      case 'date':
        setBirthday(e.target.value)
      default:
    }
  }

  const handleDeleteAccount = () => {
    //fetch(`https://movie-api-o5p9.onrender.com/users/${id}`, {
    fetch(`http://localhost:8080/users/${user._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        alert('The account has been successfully deleted.')
        localStorage.clear()
        window.location.reload()
      } else {
        alert('Something went wrong.')
      }
    })
  }

  return (
    <>
      <Row>
        <Card>
          <Card.Body className="d-flex justify-content-center align-items-center">
            <Row>
              <Col className="d-flex align-items-baseline mt-8">
                <FaUserAstronaut className="p-8" size={80} />
                <h2> Hello {user.username}! </h2>
              </Col>
            </Row>
          </Card.Body>
          <Button
            onClick={() => handleDeleteAccount(user._id)}
            className="button-delete mt-3"
            type="submit"
            variant="outline-danger"
          >
            Delete account
          </Button>
        </Card>
        <Col>
          <UpdateUser
            formData={formData}
            handleUpdate={handleUpdate}
            handleSubmit={handleSubmit}
          />
        </Col>
        <br />
      </Row>
      <hr />
      <Row className="justify-content-center">
        <FavoriteMovies user={user} favoriteMovies={favoriteMovies} />
      </Row>
    </>
  )
}
