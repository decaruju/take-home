import React, { Component } from 'react';
import { Container} from 'reactstrap';
import { get_characters } from './api.js'
import './App.css'
import HeroList from './HeroList.js'

class GridList extends Component {

    render() {
        return (
            <div className="GridList">
                <Container style={{margin: "2%"}}>
                    <HeroList 
                        heros={this.props.superheros}
                        isModalOpen={this.props.isModalOpen}
                        onRequestClose={this.props.closeModal}
                        openModal={this.props.openModal}
                        handleAdd={this.props.handleAdd}
                        isMyAvenger={this.props.isMyAvenger}
                        modalHero={this.props.modalHero}
                        />
                </Container>
            </div>
        );
    }
}

export default GridList;