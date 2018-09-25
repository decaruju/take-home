import React, { Component } from 'react';
import { Container} from 'reactstrap';
import { get_character } from './api.js'
import HeroList from './HeroList.js'
import './App.css'

class GridList extends Component {
    constructor() {
        super();
        this.state = {
            superheros: [],
        }
    }

    componentDidMount() {
        this.getAvengers()
    }

    getAvengers() {
        var myAvengers = JSON.parse(localStorage.getItem('avengers')).mesAvengers
        myAvengers.map(id => 
            get_character(id).then(avenger => {
                var currentAvengers = this.state.superheros
                currentAvengers.push(avenger)
                this.setState({superheros: currentAvengers})
            })
        )
    }

    render() {
        return (
            <div className="GridList">
                <Container>
                    <HeroList heros={this.state.superheros}/>
                </Container>
            </div>
        );
    }
}

export default GridList;