import PropTypes from 'prop-types'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import logo from '../../../public/b.png'
import './navigation-bar.scss'

export const NavigationBar = ({ user, onLoggedOut }) => {
	return (
		<Navbar className='navbar-custom'>
			<Container>
				<Navbar.Brand as={NavLink} to='/'>
					<img src={logo} className='logo' alt='logo' />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='nav-links'>
						{!user ? (
							<>
								<Nav.Link as={NavLink} to='/login' />
							</>
						) : (
							<>
								<Nav.Link as={NavLink} to='/'>
									Home
								</Nav.Link>
								<Nav.Link as={NavLink} to='/profile'>
									Profile
								</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
			<Navbar.Collapse className='justify-content-end'>
				<Nav>
					<Button onClick={onLoggedOut}>Logout</Button>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}
NavigationBar.propTypes = {
	user: PropTypes.object.isRequired,
	onLoggedOut: PropTypes.func.isRequired,
}
