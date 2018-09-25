import React, { Component } from 'react';
import { Container} from 'reactstrap';
import { get_character } from './api.js'
import './App.css'

class GridList extends Component {
    render() {
        return (
            <div className="Avengers">
                <h1>Mes&nbsp;Avengers</h1>
                <Container>
                    {this.props.superheros.map((hero) => 
                        <div key={hero.id}>
                            {hero.name}
                        </div>)}
                </Container>
            </div>
        );
    }
}

export default GridList;