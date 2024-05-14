import React, { useEffect, useState } from 'react'
import { MovieCard } from '../movie-card/movie-card'
import { MovieView } from '../movie-view/movie-view'
import { LoginView } from '../login-view/login-view'
import { SignupView } from '../signup/signup-view'
import { Col, Row, Button } from 'react-bootstrap'

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

	return (
		<>
			{!user ? (
				<LoginView onLoggedIn={(user) => setUser(user)} />
			) : selectedMovie ? (
				<Col md={8}>
					<MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
				</Col>
			) : movies.length === 0 ? (
				<div>The list is empty!</div>
			) : (
				<>
					{movies.map((movie) => (
						<Col className='mb-5' md={3} key={movie.id}>
							<MovieCard
								movie={movie}
								onMovieClick={(newSelectedMovie) => {
									setSelectedMovie(newSelectedMovie)
								}}
							/>
						</Col>
					))}
					<Button
						variant='primary'
						onClick={() => {
							setUser(null)
							setToken(null)
							localStorage.clear()
						}}>
						Logout
					</Button>
				</>
			)}
		</>
	)
}
