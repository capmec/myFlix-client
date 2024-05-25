import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Navbar, Col, Container, NavDropdown, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import logo from '../../../public/b.png'
import { FaUserAstronaut } from 'react-icons/fa'

import './navigation-bar.scss'

export const NavigationBar = ({ user, onLoggedOut }) => {
	const storedToken = localStorage.getItem('token')
	const [username, setUsername] = useState([])
	const [token, setToken] = useState(storedToken ? storedToken : null)

	useEffect(() => {
		if (!token) {
			return
		}
		fetch('https://movie-api-o5p9.onrender.com/users', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => response.json())
			.then((users) => {
				const usersApi = users.map((user) => {
					return {
						id: user._id,
						username: user.username,
					}
				})
				localStorage.setItem('users', JSON.stringify(usersApi))
				setUsername(usersApi)
			})
	}, [token])

	return (
		<Navbar className='navbar-custom'>
			<Container>
				<Navbar.Brand as={NavLink} to='/'>
					<img src={logo} className='logo' alt='logo' />
				</Navbar.Brand>
			</Container>

			<div className='options'>
				<Col xs='auto'>
					<Row>
						<FaUserAstronaut size={32} />
					</Row>
					<Row>
						<NavDropdown title={user.username} id='basic-nav-dropdown'>
							{/* when click go to the profile.userId */}
							<NavDropdown.Item as={NavLink} to={`/users/${user._id}`}>
								Profile
							</NavDropdown.Item>

							<NavDropdown.Item href='/login' onClick={onLoggedOut}>
								Sign Out
							</NavDropdown.Item>
						</NavDropdown>
					</Row>
				</Col>
			</div>
		</Navbar>
	)
}
NavigationBar.propTypes = {
	user: PropTypes.object.isRequired,
	onLoggedOut: PropTypes.func.isRequired,
}
