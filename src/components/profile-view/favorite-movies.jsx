import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Container } from 'react-bootstrap'

import { MovieCard } from '../movie-card/movie-card'
import './favorite-movies.scss'

export const FavoriteMovies = ({ user, favoriteMovies }) => {
  return (
    <Container className="similar_movies">
      <h5 className="text-left mt-2 font-weight-bold">Favorite Movies</h5>
      {/* //if there are no favorite movies, display a message */}
      {favoriteMovies.length === 0 && (
        <p className="text-left">You have no favorite movies yet!</p>
      )}

      <Row>
        {favoriteMovies.map((movie) => (
          <Col key={movie._id} md={2} sm={6}>
            <MovieCard
              key={movie._id}
              isFavorite={
                user && user.favoriteMovies
                  ? user.favoriteMovies.includes(movie._id)
                  : false
              }
              movie={movie}
              className="movie-thumbnail"
            />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

FavoriteMovies.propTypes = {
  favoriteMovies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      genre: PropTypes.array,
      director: PropTypes.string,
      actors: PropTypes.array.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  user: PropTypes.shape({
    favoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
}
