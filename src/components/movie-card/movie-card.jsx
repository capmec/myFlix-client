import React from 'react'
import PropTypes from 'prop-types'

export const MovieCard = ({ movie, onMovieClick }) => {
	return (
		<div
			onClick={() => {
				onMovieClick(movie)
			}}>
			{movie.title}
		</div>
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
