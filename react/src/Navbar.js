import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';
  
import './Navbar.css'

class MyNavbar extends Component {
    render() {
        return (
            <Navbar style={{"backgroundColor": "#222222"}}>
                <NavbarBrand>
                    <img src="/logo.png" alt="Marvel logo" height="64px"></img>
                </NavbarBrand>
                <Nav navbar>
                    <NavItem>
                        {this.props.children}
                    </NavItem>
                </Nav>
                <NavbarBrand onClick={this.props.openSidebar}>
                    <img src="/avengers_logo.png" alt="Avengers logo" height="64px"
                    style={{cursor:"pointer"}}></img>
                </NavbarBrand>
            </Navbar>
        )
    }
}

export default MyNavbar;