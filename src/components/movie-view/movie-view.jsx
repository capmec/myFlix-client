import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { MovieCard } from '../movie-card/movie-card'

import './movie-view.scss'

export const MovieView = ({ movies }) => {
	const { movieId } = useParams()

	const movie = movies.find((movie) => movie.id === movieId)

	// Find similar movies based on genre
	const similarMovies = movies.filter((m) => {
		return m.id !== movie.id && m.genre.some((genre) => movie.genre.includes(genre))
	})

	return (
		<>
			<div className='header' style={{ backgroundImage: `url(${movie.image})` }}>
				<div className='header-content'>
					<Container className='custom-container'>
						<Row>
							<Col md={3} className='d-flex justify-content-center align-items-center'>
								<Image src={movie.image} alt={movie.title} fluid className='img-fluid' />
							</Col>
							<Col md={9}>
								<h1 className='font-weight-bold'>
									{movie.title} <small>({movie.year})</small>
								</h1>
								<div className='d-flex align-items-center mb-2'>
									<span>{movie.genre}</span>
								</div>
								<h5>Overview</h5>
								<p>{movie.description}</p>
								<p>
									<strong>Director:</strong> {movie.director}
								</p>
								<p>
									<strong>Actors:</strong> {movie.actors.join(', ')}
								</p>
								<Link to={`/`}>
									<button className='back-button'>Back</button>
								</Link>
							</Col>
						</Row>
					</Container>
				</div>
			</div>

			<Container className='similar_movies'>
				<h6>Similar Movies</h6>
				<Row>
					{similarMovies.map((movie) => (
						<Col key={movie.id} md={2} sm={6}>
							<MovieCard className='movie-thumbnail' movie={movie} />
						</Col>
					))}
				</Row>
			</Container>
		</>
	)
}
