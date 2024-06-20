import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FavoriteMovies } from './favorite-movies'
import { UpdateUser } from './update-user'
import { Card, Button, Container } from 'react-bootstrap'
import { FaUserAstronaut } from 'react-icons/fa'
import './profile-view.scss'

export const ProfileView = ({ token, user, onSubmit }) => {
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [birthday, setBirthday] = useState(user.birthday)
  const [password, setPassword] = useState('')
  const [favoriteMovies, setFavoriteMovies] = useState([])

  useEffect(() => {
    //fetch(`http://localhost:8080/users/${user._id}/favoriteMovies`, {
    fetch(
      `https://movie-api-o5p9.onrender.com/users/${user._id}/favoriteMovies`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const updatedMovies = data.map((movie) => ({
          ...movie,
          director: String(movie.director),
        }))
        setFavoriteMovies(updatedMovies)
      })
      .catch((error) => console.error('Error:', error))
  }, [user._id, token])

  const formData = {
    username: username,
    email: email,
    password: password,
    birthday: birthday
      ? new Date(birthday).toISOString().substring(0, 10)
      : null,
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetch(`https://movie-api-o5p9.onrender.com/users/${user._id}`, {
      //fetch(`http://localhost:8080/users/${user._id}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('user', JSON.stringify(data))
        onSubmit(data)
      })
      .catch((error) => console.error('Error updating user:', error))
  }

  const handleUpdate = (e) => {
    const { type, value } = e.target
    switch (type) {
      case 'text':
        setUsername(value)
        break
      case 'email':
        setEmail(value)
        break
      case 'password':
        setPassword(value)
        break
      case 'date':
        setBirthday(value)
        break
      default:
    }
  }

  const handleDeleteAccount = () => {
    //fetch(`http://localhost:8080/users/${user._id}`, {
    fetch(`https://movie-api-o5p9.onrender.com/users/${user._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          alert('The account has been successfully deleted.')
          localStorage.clear()
          window.location.reload()
        } else {
          alert('Something went wrong.')
        }
      })
      .catch((error) => console.error('Error deleting account:', error))
  }

  return (
    <>
      <Card>
        <Card.Body>
          <div className='header_profile'>
            <Row>
              <Col className='hello_header'>
                <FaUserAstronaut className='p-8' size={80} />
                <h2> Hello {user.username}! </h2>
              </Col>
            </Row>
          </div>
        </Card.Body>
        <Button
          onClick={handleDeleteAccount}
          className='button-delete mt-3'
          type='submit'
          variant='outline-danger'
        >
          Delete account
        </Button>
      </Card>

      <div className='container'>
        <div className='row'>
          <div className='col'>
            <UpdateUser
              formData={formData}
              handleUpdate={handleUpdate}
              handleSubmit={handleSubmit}
            />
          </div>
          <div className='col'>
            <FavoriteMovies user={user} favoriteMovies={favoriteMovies} />
          </div>
        </div>
      </div>
      {/* <Col>

      </Col>

       */}
    </>
  )
}
