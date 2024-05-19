import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

export const MovieView = ({ movies }) => {
	const { movieId } = useParams()

	const movie = movies.find((movie) => movie.id === movieId)

	return (
		<div>
			<div>
				<img className='w-100' src={movie.image} alt='movie-poster' />
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
				{movie.actors.map((actor, index) => (
					<span key={index}>
						{actor}
						{index < movie.actors.length - 1 ? ', ' : ''}
					</span>
				))}
			</div>
			<div>
				<span>Genre: </span>
				<span>{movie.genre}</span>
			</div>

			<Link to={`/`}>
				<button className='back-button'>Back</button>
			</Link>
		</div>
	)
}
