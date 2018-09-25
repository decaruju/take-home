import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, Row, Col , Container} from 'reactstrap';
import { get_character } from './api.js'
import './App.css'

class GridList extends Component {
    constructor() {
        super();
        this.state = {
            superheros: [],
        }
    }

    componentDidMount() {
        var myAvengers = JSON.parse(localStorage.getItem('avengers')).mesAvengers
        myAvengers.map((id) => {
            get_character(id).then(avenger => {
                var currentAvengers = this.state.superheros
                currentAvengers.push(avenger)
                this.setState({superheros: currentAvengers})
            })
        })
    }

    render() {
        return (
            <div className="GridList">
                <Container>
                <Row>
                    {this.state.superheros.map((hero) => {
                        return <Col sm="4" key={hero.id}>
                            <Link to={`/superhero/${hero.id}`}>
                                <Card>
                                    <CardImg top width="100px" src={hero.thumbnail.path + '/standard_medium.' + hero.thumbnail.extension} alt={hero.name}/>
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
            </div>
        );
    }
}

export default GridList;