import React, { useEffect, useState } from 'react'
import { MovieCard } from '../movie-card/movie-card'
import { MovieView } from '../movie-view/movie-view'
import { LoginView } from '../login-view/login-view'
import { SignupView } from '../signup/signup-view'

export const MainView = () => {
	const storedUser = JSON.parse(localStorage.getItem('user'))
	const storedToken = localStorage.getItem('token')
	const [movies, setMovies] = useState([])
	const [selectedMovie, setSelectedMovie] = useState(null)
	const [user, setUser] = useState(storedUser ? storedUser : null)
	const [token, setToken] = useState(storedToken ? storedToken : null)

	useEffect(() => {
		if (!token) {
			return
		}
		fetch('https://movie-api-o5p9.onrender.com/movies', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => response.json())
			.then((movies) => {
				const moviesApi = movies.map((movie) => {
					return {
						id: movie._id,
						title: movie.title,
						year: movie.year,
						genre: movie.genre,
						director: movie.director.name,
						//how do I get the actors to display?
						actors: movie.actors,
						image: movie.image,
					}
				})
				setMovies(moviesApi)
			})
	}, [token])

	if (!user) {
		return (
			<>
				<LoginView
					onLoggedIn={(user, token) => {
						setUser(user)
						setToken(token)
					}}
				/>
				or
				<SignupView />
			</>
		)
	}

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
			<button
				onClick={() => {
					setUser(null)
					setToken(null)
					localStorage.clear()
				}}>
				Logout
			</button>
		</div>
	)
}
