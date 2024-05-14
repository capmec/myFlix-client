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
				<span>Year: </span>
				<span>{movie.year}</span>
			</div>
			<div>
				<div>
					<span>Director: </span>
					<span>{movie.director}</span>
				</div>

				<span>Actors: </span>
				{/* //how do I get the actors to display? */}
				<span>{movie.actors}</span>
			</div>
			<div>
				<span>Genre: </span>
				<span>{movie.genre}</span>
			</div>

			<button onClick={onBackClick} className='back-button' style={{ cursor: 'pointer' }}>
				Back
			</button>
		</>
	)
}
