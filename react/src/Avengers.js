import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, Row, Col , Container} from 'reactstrap';
import { api_get} from './api.js'
import './App.css'
import BottomScrollListener from 'react-bottom-scroll-listener'

class GridList extends Component {
    constructor() {
        super();
        this.state = {
            superheros: []
        }
    }

    componentDidMount() {
        api_get('https://gateway.marvel.com/v1/public/characters').then(data => {
            console.log(data)
            let superheros = data.data.results
            this.setState({superheros: superheros})
        })
    }

    more_heroes() {
        api_get(
            'https://gateway.marvel.com/v1/public/characters', 
            {offset: this.state.superheros.length}
        ).then(data => {
            console.log(data)
            let superheros = data.data.results
            this.setState({superheros: this.state.superheros.concat(superheros)})
        })
    }

    render() {
        return (
            <div className="GridList">
                <Container>

                <Row>
                    {this.state.superheros.map((hero) => {
                        return <Col sm="4">
                            <Link to={`/superhero/${hero.id}`}>
                                <Card>
                                    <CardImg top width="100px" src={hero.thumbnail.path + '.' + hero.thumbnail.extension} alt={hero.name}/>
                                    <CardBody>
                                        <CardTitle>
                                            {hero.name}
                                        </CardTitle>
                                    </CardBody>
                                </Card>
                            </Link>
                        </Col>
                    })}
                </Row>
                </Container>
                <BottomScrollListener onBottom={this.more_heroes.bind(this)}/>
            </div>
        );
    }
}

export default GridList;