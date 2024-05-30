import React, { useEffect, useState } from 'react'
import { MovieCard } from '../movie-card/movie-card'
import { MovieView } from '../movie-view/movie-view'
import { LoginView } from '../login-view/login-view'
import { Col, Row } from 'react-bootstrap'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { NavigationBar } from '../navigation-bar/navigation-bar'
import { ProfileView } from '../profile-view/profile-view'

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'))
  const storedToken = localStorage.getItem('token')

  const [user, setUser] = useState(storedUser ? storedUser : null)
  const [token, setToken] = useState(storedToken ? storedToken : null)
  const [movies, setMovies] = useState([])

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

  return (
    <BrowserRouter>
      {user && (
        <NavigationBar
          user={user}
          onLoggedOut={() => {
            setUser(null)
            setToken(null)
            localStorage.clear()
          }}
        />
      )}

      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
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
            path="/movies/:movieId"
            element={
              !user ? (
                <Navigate to="/login" replace />
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
            path="/users/:userId"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <ProfileView user={user} />
              )
            }
          />
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                movies.map((movie) => (
                  <Col className="mb-4" key={movie.id} md={2}>
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
