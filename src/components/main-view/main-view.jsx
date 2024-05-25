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
  const [movies, setMovies] = useState([])
  const [token, setToken] = useState(storedToken ? storedToken : null)

  useEffect(() => {
    if (!token) {
      return
    }
    //fetch('http://localhost:8080/movies', {
    fetch('https://movie-api-o5p9.onrender.com/movies', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((movies) => {
        const moviesApi = movies.map((movie) => {
          return {
            id: movie._id,
            title: movie.title,
            year: movie.year,
            genre: movie.genre,
            director: movie.director.name,
            description: movie.description,
            actors: movie.actors,
            image: movie.image,
          }
        })
        localStorage.setItem('movies', JSON.stringify(moviesApi))
        setMovies(moviesApi)
      })
  }, [token])

  return (
    <BrowserRouter>
      {/* not show the navbar if !user */}
      {user ? (
        <NavigationBar
          user={user}
          onLoggedOut={() => {
            setUser(null)
            setToken(null)
            localStorage.clear()
          }}
        />
      ) : null}

      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/ " />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={2}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          {/* route to profile view :id */}
          <Route
            path="/users/:userId"
            element={
              <>
                {user ? (
                  <ProfileView user={user} />
                ) : (
                  <Navigate to="/login" replace />
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-5" key={movie.id} sm={6} md={4} lg={3}>
                        <MovieCard
                          isFavorite={
                            user && user.FavoriteMovies
                              ? user.FavoriteMovies.includes(movie.title)
                              : false
                          }
                          movie={movie}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  )
}
