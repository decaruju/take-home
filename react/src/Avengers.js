import React, { Component } from 'react';
import { Container} from 'reactstrap';
import AvengerListItem from './AvengerListItem.js'
import './App.css'

class GridList extends Component {
    render() {
        return (
            <div className="Avengers">
                <div >
                <h1>
                    <img src="/avengers_logo.png" height="64px" alt="Avengers logo"/>
                    Mes&nbsp;Avengers
                </h1>
                </div>
                <Container>
                    {this.props.superheros.map((hero) => 
                        <AvengerListItem 
                            key={hero.id}
                            showModal={this.props.showModal}
                            handleRemove={this.props.handleRemove}
                            hero={hero}
                        />
                    )}
                </Container>
            </div>
        );
    }
}

export default GridList;