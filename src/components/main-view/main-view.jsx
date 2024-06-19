import React, { useEffect, useState } from 'react'
import { MovieCard } from '../movie-card/movie-card'
import { MovieView } from '../movie-view/movie-view'
import { LoginView } from '../login-view/login-view'
import { Col, Row, Form, Button } from 'react-bootstrap'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { NavigationBar } from '../navigation-bar/navigation-bar'
import { ProfileView } from '../profile-view/profile-view'

import './main-view.scss'

export const MainView = () => {
  let storedUser = null
  let storedToken = null

  // Use try-catch to catch JSON.parse errors
  try {
    storedUser = JSON.parse(localStorage.getItem('user'))
  } catch (error) {
    console.error('Error parsing storedUser:', error)
    storedUser = null
  }

  try {
    storedToken = localStorage.getItem('token')
  } catch (error) {
    console.error('Error retrieving storedToken:', error)
    storedToken = null
  }

  const [user, setUser] = useState(storedUser)
  const [token, setToken] = useState(storedToken)
  const [movies, setMovies] = useState([])

  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredMovies = movies.filter((movie) => {
    const title = movie.title?.toLowerCase() ?? ''
    const description = movie.description?.toLowerCase() ?? ''
    const genreName = movie.genre?.name?.toLowerCase() ?? ''
    const genreDescription = movie.genre?.description?.toLowerCase() ?? ''
    const director = movie.director?.toLowerCase() ?? ''

    return (
      title.includes(searchTerm.toLowerCase()) ||
      description.includes(searchTerm.toLowerCase()) ||
      genreName.includes(searchTerm.toLowerCase()) ||
      genreDescription.includes(searchTerm.toLowerCase()) ||
      director.includes(searchTerm.toLowerCase())
    )
  })

  useEffect(() => {
    if (!token) {
      return
    }

    //fetch('https://movie-api-o5p9.onrender.com/movies', {
    fetch('http://localhost:8080/movies', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          _id: movie._id,
          title: movie.title,
          year: movie.year,
          genre: movie.genre,
          director: movie.director.name, // Ensure director is a string
          description: movie.description,
          actors: movie.actors,
          image: movie.image,
        }))
        setMovies(moviesFromApi)
      })
  }, [token])

  const onLoggedOut = () => {
    setUser(null)
    setToken(null)
    localStorage.clear()
  }

  return (
    <BrowserRouter>
      {user && <NavigationBar user={user} onLoggedOut={onLoggedOut} />}

      <Row className='justify-content-md-center'>
        <Routes>
          <Route
            path='/login'
            element={
              user ? (
                <Navigate to='/' />
              ) : (
                <Col md={5}>
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user)
                      setToken(token)
                    }}
                  />
                </Col>
              )
            }
          />
          <Route
            path='/movies/:movieId'
            element={
              !user ? (
                <Navigate to='/login' replace />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <Col>
                  <MovieView movies={movies} />
                </Col>
              )
            }
          />
          <Route
            path='/users/:userId'
            element={
              !user ? (
                <Navigate to='/login' replace />
              ) : (
                <ProfileView
                  user={user}
                  token={token}
                  movies={movies}
                  onSubmit={setUser}
                />
              )
            }
          />
          <Route
            path='/'
            element={
              !user ? (
                <Navigate to='/login' replace />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <>
                  <Col xs={11} md={6} className='pt-5'>
                    <div className='row'>
                      <div className='search'>
                        <Form>
                          <Form.Control
                            type='search'
                            placeholder='Search'
                            className='mr-sm-2 no-outline'
                            onChange={handleSearch}
                            value={searchTerm}
                          />
                        </Form>
                        <span className='input-group-append'>
                          <Button type='submit' variant='outline-info'>
                            Search
                          </Button>
                        </span>
                      </div>
                    </div>
                  </Col>
                  <Col md={12} className='pt-5'></Col>
                  {searchTerm && filteredMovies.length > 0
                    ? filteredMovies.map((movie) => (
                        <Col
                          className='mb-4'
                          key={movie._id}
                          xs={11}
                          sm={6}
                          md={4}
                          lg={3}
                        >
                          <MovieCard movie={movie} />
                        </Col>
                      ))
                    : movies.map((movie) => (
                        <Col className='mb-4' key={movie._id} md={2}>
                          <MovieCard movie={movie} />
                        </Col>
                      ))}
                </>
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  )
}
