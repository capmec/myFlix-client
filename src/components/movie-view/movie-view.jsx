import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Image, Card } from 'react-bootstrap'
import { MovieCard } from '../movie-card/movie-card'
import { FaStar } from 'react-icons/fa6'

import './movie-view.scss'

export const MovieView = ({ movies }) => {
  const { movieId } = useParams()

  const storedToken = localStorage.getItem('token')
  const storedUser = JSON.parse(localStorage.getItem('user'))

  const [user, setUser] = useState(storedUser ? storedUser : null)
  const [token, setToken] = useState(storedToken ? storedToken : null)
  const [isFav, setIsFav] = useState(false)

  const movie = movies.find((movie) => movie._id === movieId)

  useEffect(() => {
    if (!movie || !user) return

    // Check if the movie is in the user's favorite list
    const isFavorite = user.favoriteMovies.includes(movie._id)
    setIsFav(isFavorite)
  }, [movie, user])

  const handleToggleFavorite = () => {
    if (!movie || !user) return

    const url = `http://localhost:8080/users/${user.username}/movies/${movie._id}`
    //const url = `https://movie-api-o5p9.onrender.com/users/${user.username}/movies/${movie.id}`
    const method = isFav ? 'DELETE' : 'POST'

    //console.log(`Sending ${method} request to ${url}`)

    fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        //console.log('Response status:', response.status)
        if (!response.ok) {
          throw new Error(`Failed to update favorites. Method: ${method}`)
        }
        return response.json()
      })
      .then((updatedUser) => {
        //console.log('Updated user:', updatedUser)
        if (updatedUser) {
          localStorage.setItem('user', JSON.stringify(updatedUser))
          setUser(updatedUser)
          setIsFav(!isFav)
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  if (!movie) {
    return <div>Loading...</div>
  }

  // Find similar movies based on genre
  const similarMovies = movies.filter((m) => {
    return (
      m._id !== movie._id &&
      m.genre.some((genre) => movie.genre.includes(genre))
    )
  })

  return (
    <>
      <div
        className="header"
        style={{ backgroundImage: `url(${movie.image})` }}
      >
        <div className="header-content">
          <Container className="custom-container">
            <Row>
              <Col
                md={3}
                className="d-flex justify-content-center align-items-center"
              >
                <Image
                  src={movie.image}
                  alt={movie.title}
                  fluid
                  className="img-fluid"
                />
              </Col>
              <Col md={9}>
                <h1>
                  <strong>{movie.title}</strong>{' '}
                  <small className="light-text">({movie.year})</small>
                </h1>
                <div className="d-flex align-items-center mb-2">
                  <span>{movie.genre.join(', ')}</span>
                </div>
                <h3>Overview</h3>
                <p className="text-justify">{movie.description}</p>
                <p>
                  <strong>Director:</strong> {movie.director}
                </p>
                <p>
                  <strong>Actors:</strong> {movie.actors.join(', ')}
                </p>
                <Link to={`/`}>
                  <button className="back-button">Back</button>
                </Link>
                <div className="add_star">
                  <FaStar
                    size={20}
                    color={isFav ? 'yellow' : 'white'}
                    onClick={handleToggleFavorite}
                    style={{ cursor: 'pointer' }}
                  />
                  <p> Add to Favorites</p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <Container className="similar_movies">
        <h5 className="text-left mt-2 font-weight-bold">Similar Movies</h5>
        <Row>
          {similarMovies.map((movie) => (
            <Col key={movie.id} md={2} sm={6}>
              <MovieCard className="movie-thumbnail" movie={movie} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}
