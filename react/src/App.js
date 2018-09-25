import React, {Component} from 'react';
import './App.css';
import {get_characters, get_character} from './api.js'
import BottomScrollListener from 'react-bottom-scroll-listener'
import MyNavbar from './Navbar.js'
import GridList from './GridList.js'
import Sidebar from 'react-sidebar'
import Avengers from './Avengers.js'
import SearchBar from '@opuscapita/react-searchbar'


class App extends Component {
    constructor() {
        super()
        this.state = {
            sidebarOpen: false,
            superheros: [],
            myAvengersId: [],
            myAvengers: [],
            searchValue: '',
            openModal: false,
            modalHero: false,
        }
    }

    componentDidMount() {
        this.more_heroes()
    }

    closeModal() {
        this.setState({...this.state, openModal: false, modalHero: false})
    }

    openModal(id) {
        get_character(id).then(hero =>
            this.setState({...this.state, openModal: id, modalHero: hero})
        )
    }

    isModalOpen(id) {
        return this.state.openModal == id
    }
    onSetSidebarOpen(open) {
        this.setState({...this.state, sidebarOpen: open})
    }

    openSidebar() {
        this.onSetSidebarOpen(true)
    }
    
    handleSearch(name) {
        this.setState({superheros: [], searchValue: name}, () =>
            this.more_heroes()
        )
    }

    more_heroes() {
        console.log('more_heroes')
        let params = this.state.searchValue === '' ? {} : {nameStartsWith: this.state.searchValue}
        get_characters(this.state.superheros.length, params).then(superheros =>
            this.setState({superheros: this.state.superheros.concat(superheros)})
        )
    }

    isMyAvenger(id) {
        return this.state.myAvengersId.includes(id)
    }

    addAvenger(id) {
        var currentAvengersId = this.state.myAvengersId
        var currentAvengers = this.state.myAvengers 
        get_character(id)
        if (this.isMyAvenger(id)) {
            let index = currentAvengers.indexOf(id)
            currentAvengersId.splice(index, 1)
            currentAvengers.splice(index, 1)
            this.setState({...this.state, myAvengersId: currentAvengersId})
        } else {
            currentAvengersId.push(id)
            get_character(id).then((hero) => {
                currentAvengers.push(hero)
                this.setState({...this.state, myAvengersId: currentAvengersId})
            })
        }
    }

    render() {
        return (
            <div className="App">
            <Sidebar
                open={this.state.sidebarOpen}
                onSetOpen={this.onSetSidebarOpen.bind(this)}
                styles={{ sidebar: { background: "white" } }}
                sidebar={<Avengers superheros={this.state.myAvengers}/>}
                pullRight={true}>
                
            </Sidebar>
                <MyNavbar
                    openSidebar={this.openSidebar.bind(this)}
                /> 
                <SearchBar 
                    value={this.state.searchValue}
                    onSearch={this.handleSearch.bind(this)}
                    dynamicSearchStartsFrom={3}
                />
                <GridList
                    superheros={this.state.superheros}
                    isModalOpen={this.isModalOpen.bind(this)}
                    closeModal={this.closeModal.bind(this)}
                    openModal={this.openModal.bind(this)}
                    modalHero={this.state.modalHero}
                    isMyAvenger={this.isMyAvenger.bind(this)}
                    handleAdd={this.addAvenger.bind(this)}
                >
                </GridList>
                <BottomScrollListener onBottom={this.more_heroes.bind(this)}/>
            <footer>
                Data provided by Marvel. © 2014 Marvel
            </footer>
            </div>
        )
    }
}

export default App