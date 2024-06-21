import React from 'react'
import PropTypes from 'prop-types'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './movie-card.scss'

export const MovieCard = ({ movie }) => {
  // Function to check if the token is expired
  const isTokenExpired = (token, user) => {
    if (!token || !user) {
      return true
    }
    const decodedToken = jwtDecode(token)
    const currentTime = Date.now() / 1000 // Convert to seconds
    return decodedToken.exp < currentTime
  }

  const handleNavigation = (path) => {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))

    if (isTokenExpired(token, user)) {
      onLoggedOut()
      navigate('/login')
    } else {
      navigate(path)
    }
  }

  return (
    <Card>
      <div className='overflow'>
        <Link onClick={() => handleNavigation(`/movies/${movie._id}`)}>
          <Card.Img className='card-img-top' src={movie.image}></Card.Img>
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
