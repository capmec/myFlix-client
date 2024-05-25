import React from 'react'
import PropTypes from 'prop-types'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { Link } from 'react-router-dom'
import { MovieCard } from '../movie-card/movie-card'
import './favorite-movies.scss'

export const FavoriteMovies = ({ user, favoriteMovies }) => {
	if (!favoriteMovies.length) {
		return <p>No favorite movies to display</p> // Display a message if the array is empty
	}

	return (
		<Col className='mb-5'>
			<h3 className='title'>List of favorite movies</h3>
			<Row>
				{favoriteMovies.map((movie) => (
					<Col key={movie._id} md={6}>
						<Link to={`/movies/${movie._id}`}>{movie.title}</Link> {/* Display the movie title as a link */}
						<MovieCard key={movie._id} isFavorite={user.FavoriteMovies.includes(movie._id)} movie={movie} />{' '}
						{/* Use movie._id if FavoriteMovies contains _ids */}
					</Col>
				))}
			</Row>
		</Col>
	)
}
