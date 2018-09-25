import React, { Component } from 'react';
import { Container} from 'reactstrap';
import { get_characters } from './api.js'
import './App.css'
import BottomScrollListener from 'react-bottom-scroll-listener'
import SearchBar from '@opuscapita/react-searchbar'
import HeroList from './HeroList.js'

class GridList extends Component {
    constructor() {
        super();
        this.state = {
            superheros: [],
            searchValue: '',
        }
        this.more_heroes()
    }

    more_heroes() {
        let params = this.state.searchValue === '' ? {} : {nameStartsWith: this.state.searchValue}
        get_characters(this.state.superheros.length, params).then(superheros =>
            this.setState({superheros: this.state.superheros.concat(superheros)})
        )
    }

    handleSearch(name) {
        this.setState({superheros: [], searchValue: name}, () =>
            this.more_heroes()
        )
    }

    render() {
        return (
            <div className="GridList">
                <Container style={{margin: "2%"}}>
                    <SearchBar 
                        value={this.state.searchValue}
                        onSearch={this.handleSearch.bind(this)}
                        dynamicSearchStartsFrom={3}
                    />
                    <HeroList heros={this.state.superheros}/>
                    <BottomScrollListener onBottom={this.more_heroes.bind(this)}/>
                </Container>
            </div>
        );
    }
}

export default GridList;