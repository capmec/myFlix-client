import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Navbar, Col, Container, NavDropdown, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import logo from './B.png'
import { FaUserAstronaut } from 'react-icons/fa'

import './navigation-bar.scss'

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar className="navbar-custom">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img src={logo} className="logo" alt="logo" />
        </Navbar.Brand>
        <div className="options">
          <Col xs="auto">
            <Row>
              <FaUserAstronaut size={32} />
            </Row>
            <Row>
              <NavDropdown title={user.username} id="basic-nav-dropdown">
                {/* Navigate to the profile using user._id */}
                <NavDropdown.Item as={NavLink} to={`/users/${user._id}`}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="/login" onClick={onLoggedOut}>
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            </Row>
          </Col>
        </div>
      </Container>
    </Navbar>
  )
}

NavigationBar.propTypes = {
  user: PropTypes.object.isRequired,
  onLoggedOut: PropTypes.func.isRequired,
}
