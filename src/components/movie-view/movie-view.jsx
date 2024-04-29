export const MovieView = ({ movie, onBackClick }) => {
	return (
		<>
			<div>
				<img src={movie.image} alt='movie-poster' />
			</div>
			<div>
				<span>Title: </span>
				<span>{movie.title}</span>
			</div>

			<div>
				<span>Director: </span>
				<span>{movie.director}</span>
			</div>
			<button onClick={onBackClick}>Back</button>
		</>
	)
}
