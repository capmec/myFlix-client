import React, { useEffect, useState } from 'react'
import { MovieCard } from '../movie-card/movie-card'
import { MovieView } from '../movie-view/movie-view'

export const MainView = () => {
	const [movies, setMovies] = useState([])
	const [selectedMovie, setSelectedMovie] = useState(null)

	useEffect(() => {
		fetch('https://movie-api-o5p9.onrender.com/movies')
			.then((response) => response.json())
			.then((movies) => {
				const moviesApi = movies.map((movie) => {
					return {
						id: movie._id,
						title: movie.title,
						year: movie.year,
						genre: movie.genre.name,
						director: movie.director.name,
						//how do I get the actors to display?
						actors: movie.actors.map((actor) => actor.name).join(', '),

						image: movie.image,
					}
				})
				setMovies(moviesApi)
				console.log('object', moviesApi)
			})
	}, [])

	if (selectedMovie) {
		let similarMovies = movies.filter((movie) => movie.genre === selectedMovie.genre)
		return (
			<>
				<MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
				<hr />
				<h2>Similar Movies</h2>
				<div>
					{similarMovies.map((movie) => (
						<MovieCard
							key={movie.id}
							movie={movie}
							onMovieClick={(newSelectedMovie) => {
								setSelectedMovie(newSelectedMovie)
							}}
						/>
					))}
				</div>
			</>
		)
	}

	if (movies.length === 0) {
		return <div>No MovieFound!</div>
	}

	return (
		<div>
			{movies.map((movie) => (
				<MovieCard
					key={movie.id}
					movie={movie}
					onMovieClick={(newSelectedMovie) => {
						setSelectedMovie(newSelectedMovie)
					}}
				/>
			))}
		</div>
	)
}
