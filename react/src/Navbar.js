import React, { Component } from 'react';
import { Navbar, NavbarBrand, } from 'reactstrap';
  
import './Navbar.css'

class MyNavbar extends Component {
    render() {
        return <Navbar style={{"background-color": "#FFFFFF"}}>
            <NavbarBrand href="/">
                <img src="/logo.png" alt="Marvel logo" height="64px"></img>
            </NavbarBrand>
        </Navbar>
    }
}

export default MyNavbar;