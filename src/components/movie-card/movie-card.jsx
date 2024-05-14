import React from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'

export const MovieCard = ({ movie, onMovieClick }) => {
	return (
		<Card className='h-100'>
			<Card.Img variant='top' src={movie.image} onClick={() => onMovieClick(movie)} />
			<Card.Body>
				<Card.Title>{movie.title}</Card.Title>
				<Card.Text>{movie.description}</Card.Text>
			</Card.Body>
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
	onMovieClick: PropTypes.func.isRequired,
}
