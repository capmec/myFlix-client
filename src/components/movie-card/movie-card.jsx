import React from 'react'
import PropTypes from 'prop-types'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const MovieCard = ({ movie }) => {
	return (
		<Card className='h-100'>
			<Card.Img variant='top' src={movie.image} />
			<Card.Body>
				<Card.Title>{movie.title}</Card.Title>
				<Card.Text>{movie.description}</Card.Text>
				<Link to={`/movies/${movie.id}`}>
					<Button variant='link'>Open</Button>
				</Link>
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
}
