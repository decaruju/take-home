import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, Row, Col , Container} from 'reactstrap';
import { get_characters } from './api.js'
import './App.css'
import BottomScrollListener from 'react-bottom-scroll-listener'
import SearchBar from '@opuscapita/react-searchbar'

class GridList extends Component {
    constructor() {
        super();
        this.state = {
            superheros: [],
            searchValue: '',
        }
    }

    componentDidMount() {
        this.more_heroes()
    }

    clearHeroes() {
        this.setState({...this.state, superheros: []})
    }

    more_heroes() {
        let params = this.state.searchValue === '' ? {} : {nameStartsWith: this.state.searchValue}
        get_characters(this.state.superheros.length, params).then(superheros =>
            this.setState({superheros: this.state.superheros.concat(superheros)})
        )
    }

    handleSearch(name) {
        console.log(name)
        this.setState({superheros: [], searchValue: name}, () =>
            this.more_heroes()
        )
    }

    render() {

        return (
            <div className="GridList">
                <Container>
                <SearchBar 
                    value={this.state.searchValue}
                    onSearch={this.handleSearch.bind(this)}
                    dynamicSearchStartsFrom={1}
                ></SearchBar>
                <Row noGutter>
                    {this.state.superheros.map((hero) => {
                        return <Col sm="4">
                            <Link to={`/superhero/${hero.id}`}>
                                <Card style={{margin: "32px"}}>
                                    <CardImg top width="100px" src={hero.thumbnail.path + '/standard_xlarge.' + hero.thumbnail.extension} alt={hero.name}/>
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