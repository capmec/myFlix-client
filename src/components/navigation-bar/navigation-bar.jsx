import PropTypes from 'prop-types'
import { Navbar, Col, Container, NavDropdown, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import logo from '../../../public/b.png'
import { FaUserAstronaut } from 'react-icons/fa'

import './navigation-bar.scss'

export const NavigationBar = ({ user, onLoggedOut }) => {
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
						<FaUserAstronaut size={36} />
					</Row>
					<Row>
						<NavDropdown title='Username' id='basic-nav-dropdown'>
							<NavDropdown.Item href='/profile'>Profile</NavDropdown.Item>
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
