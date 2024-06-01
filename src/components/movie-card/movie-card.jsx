import React from 'react'
import PropTypes from 'prop-types'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './movie-card.scss'

export const MovieCard = ({ movie, isFavorite }) => {
  return (
    <Card className="card text-center bg-dark animate__animated animate__fadeInUp">
      <div className="overflow">
        <Link to={`/movies/${movie._id}`}>
          <Card.Img
            className="card-img-top"
            src={movie.image}
            alt={movie.title}
          />
        </Link>
      </div>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        {isFavorite && <Button variant="primary">Favorite</Button>}
      </Card.Body>
    </Card>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    genre: PropTypes.array,
    director: PropTypes.string,
    actors: PropTypes.array.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
}
