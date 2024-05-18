import React, { useEffect, useState } from 'react'
import { MovieCard } from '../movie-card/movie-card'
import { MovieView } from '../movie-view/movie-view'
import { LoginView } from '../login-view/login-view'
import { SignupView } from '../signup/signup-view'
import { Col, Row, Button } from 'react-bootstrap'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

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
		<BrowserRouter>
			<Row className='justify-content-md-center'>
				<Routes>
					<Route
						path='/signup'
						element={
							<>
								{user ? (
									<Navigate to='/' />
								) : (
									<Col md={5}>
										<SignupView />
									</Col>
								)}
							</>
						}
					/>
					<Route
						path='/login'
						element={
							<>
								{user ? (
									<Navigate to='/' />
								) : (
									<Col md={5}>
										<LoginView onLoggedIn={(user) => setUser(user)} />
									</Col>
								)}
							</>
						}
					/>
					<Route
						path='/movies/:movieId'
						element={
							<>
								{!user ? (
									<Navigate to='/login' replace />
								) : movies.length === 0 ? (
									<Col>The list is empty!</Col>
								) : (
									<Col md={8}>
										<MovieView movies={movies} />
									</Col>
								)}
							</>
						}
					/>
					<Route
						path='/'
						element={
							<>
								{!user ? (
									<Navigate to='/login' replace />
								) : movies.length === 0 ? (
									<Col>The list is empty!</Col>
								) : (
									<>
										{movies.map((movie) => (
											<Col className='mb-4' key={movie.id} md={3}>
												<MovieCard movie={movie} />
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
						}
					/>
				</Routes>
			</Row>
		</BrowserRouter>
	)
}
