import React, { useEffect, useState } from 'react'
import { MovieCard } from '../movie-card/movie-card'
import { MovieView } from '../movie-view/movie-view'
import { LoginView } from '../login-view/login-view'
import { Col, Row } from 'react-bootstrap'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { NavigationBar } from '../navigation-bar/navigation-bar'
import { ProfileView } from '../profile-view/profile-view'

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

  useEffect(() => {
    if (!token) {
      return
    }
    fetch('http://localhost:8080/movies', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          title: movie.title,
          year: movie.year,
          genre: movie.genre,
          director: movie.director.name,
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
      {user && (
        <NavigationBar
          user={user}
          onLoggedOut={onLoggedOut}
        />
      )}

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
                      localStorage.setItem('user', JSON.stringify(user))
                      localStorage.setItem('token', token)
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
                <Navigate
                  to='/login'
                  replace
                />
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
                <Navigate
                  to='/login'
                  replace
                />
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
                <Navigate
                  to='/login'
                  replace
                />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                movies.map((movie) => (
                  <Col
                    className='mb-4'
                    key={movie.id}
                    md={2}>
                    <MovieCard movie={movie} />
                  </Col>
                ))
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  )
}
