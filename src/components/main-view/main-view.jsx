import { useState } from 'react'
import { MovieCard } from '../movie-card/movie-card'
import { MovieView } from '../movie-view/movie-view'

const MainView = () => {
	const [movies, setMovies] = useState([
		{
			id: 1,
			title: 'Inception',
			image:
				'https://m.media-amazon.com/images/M/MV5BZGUxNzRjZmUtNGFmOC00YzM5LTk5M2EtM2E4NzhiMDdjZmNiXkEyXkFqcGdeQXVyODQwMzQ2MDk@._V1_.jpg',
			director: 'Christopher Nolan',
		},
		{
			id: 2,
			title: 'The Shawshank Redemption',
			image: 'https://m.media-amazon.com/images/M/MV5BMTQ1ODM2MjY3OV5BMl5BanBnXkFtZTgwMTU2MjEyMDE@._V1_.jpg',
			director: 'Frank Darabont',
		},
		{
			id: 3,
			title: 'Pulp Fiction',
			image: 'https://table9mutant.wordpress.com/wp-content/uploads/2014/09/img_6674.jpg',
			director: 'Quentin Tarantino',
		},
		{
			id: 4,
			title: 'The Godfather',
			image: 'https://www.listchallenges.com/f/items2020/ba64c95c-f135-40fd-8f90-8f587262df01.jpg',
			director: 'Francis Ford Coppola',
		},
	])

	const [selectedMovie, setSelectedMovie] = useState(null)

	if (selectedMovie) {
		return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
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

export default MainView
