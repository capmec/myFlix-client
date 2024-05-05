import { useState } from 'react'

export const SignupView = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [birthday, setBirthday] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault()

		const data = {
			username: username,
			password: password,
			email: email,
			birthday: birthday,
		}
		fetch('https://movie-api-o5p9.onrender.com/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Signup response: ', data)
				alert('You have successfully signed up! Please log in.')
			})
			.catch((error) => {
				console.error('Error:', error)
			})
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Username:
				<input type='text' value={username} onChange={(e) => setUsername(e.target.value)} required minLength='3' />
			</label>
			<label>
				Password:
				<input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
			</label>
			<label>
				Email:
				<input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
			</label>
			<label>
				Birthday:
				<input type='date' value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
			</label>
			<button type='submit'>Register</button>
		</form>
	)
}
