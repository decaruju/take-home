import React, { Component } from 'react';
import { Container} from 'reactstrap';
import './App.css'
import HeroList from './HeroList.js'

class GridList extends Component {

    render() {
        return (
            <Container className="GridList" style={{margin: "auto"}}>
                <HeroList 
                    heros={this.props.superheros}
                    openModal={this.props.openModal}
                    handleAdd={this.props.handleAdd}
                    modalHero={this.props.modalHero}
                />
            </Container>
        );
    }
}

export default GridList;