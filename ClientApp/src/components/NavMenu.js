import React, { Component } from 'react';
import { Button, Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

import toast, { Toaster } from 'react-hot-toast';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    const user = this.props.user;

    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">Buy-House</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/addAd">Add Ad</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/myAds">My ads</NavLink>
                </NavItem>
                {!user &&
                <>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/signUp">Sign up</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/signIn">Sign in</NavLink>
                  </NavItem>
                </>}
                {user && <NavItem>
                  <Button onClick={this.logOut} className="text-dark">Log out</Button>
                </NavItem>}
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }

  logOut = () => {
    this.props.setUser(false);
    toast.success('You are logged out succefull! Bye... 😢');    
  }
}
