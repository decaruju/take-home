import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavItem } from 'reactstrap';
  
import './Navbar.css'

class MyNavbar extends Component {
    render() {
        return (
            <Navbar style={{"backgroundColor": "#FFFFFF"}}>
                <NavbarBrand>
                    <img src="/logo.png" alt="Marvel logo" height="64px"></img>
                </NavbarBrand>
                <NavbarBrand onClick={this.props.openSidebar}>
                    <img src="/avengers_logo.png" alt="Avengers logo" height="64px"></img>
                </NavbarBrand>
            </Navbar>
        )
    }
}

export default MyNavbar;