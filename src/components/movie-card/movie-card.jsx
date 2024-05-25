import React from 'react'
import PropTypes from 'prop-types'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './movie-card.scss'

export const MovieCard = ({ movie }) => {
  return (
    <Card className="card text-center bg-dark animate__animated animate__fadeInUp">
      <div className="overflow">
        <Link to={`/movies/${movie.id}`}>
          {' '}
          <Card.Img className="card-img-top" src={movie.image}></Card.Img>
        </Link>
      </div>
    </Card>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    genre: PropTypes.array,
    director: PropTypes.string,
    actors: PropTypes.array.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
}
