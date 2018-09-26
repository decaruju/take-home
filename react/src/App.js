import React, {Component} from 'react';
import './App.css';
import {get_characters, get_character} from './api.js'
import BottomScrollListener from 'react-bottom-scroll-listener'
import MyNavbar from './Navbar.js'
import GridList from './GridList.js'
import Sidebar from 'react-sidebar'
import Avengers from './Avengers.js'
import SearchBar from '@opuscapita/react-searchbar'
import Modal from 'react-modal'
import HeroPage from './Heropage.js'
import {get_colors} from './ImageProcessing.js'


class App extends Component {
    constructor() {
        super()
        this.state = {
            sidebarOpen: false,
            superheros: [],
            myAvengers: [],
            searchValue: '',
            openModal: false,
            modalHero: false,
            colors: [],
        }
    }

    componentDidMount() {
        this.more_heroes()
    }

    closeModal() {
        this.setState({...this.state, openModal: false, modalHero: false})
    }

    openModal(id) {
        this.onSetSidebarOpen(false)
        get_character(id).then(hero => {
            this.setState({...this.state, openModal: id, modalHero: hero})
            get_colors(
                hero.thumbnail.path + "/standard_small." + hero.thumbnail.extension
            ).then(colors => {
                console.log(colors)
                this.setState({...this.state, colors: colors})
            }
            )
        })
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
        return this.state.myAvengers.map(avenger => avenger.id).includes(id)
    }

    addAvenger(id) {
        var currentAvengers = this.state.myAvengers 
        if (this.isMyAvenger(id)) {
            let index = currentAvengers.map(avenger => avenger.id).indexOf(id)
            currentAvengers.splice(index, 1)
            this.setState({...this.state, myAvengers: currentAvengers})
        } else {
            get_character(id).then((hero) => {
                currentAvengers.push({...hero, colors: this.state.colors})
                this.setState({...this.state, myAvengers: currentAvengers})
            })
        }
    }

    render() {
        return (
            <div className="App">
            <Sidebar
                open={this.state.sidebarOpen}
                onSetOpen={this.onSetSidebarOpen.bind(this)}
                styles={{ sidebar: { background: "#222222", color: "white", padding: "20px",} }}
                sidebar={<Avengers superheros={this.state.myAvengers} 
                showModal={this.openModal.bind(this)}
                handleRemove={this.addAvenger.bind(this)}/>}
                pullRight="true"
            />
            <MyNavbar openSidebar={this.openSidebar.bind(this)} >
                <SearchBar 
                    value={this.state.searchValue}
                    onSearch={this.handleSearch.bind(this)}
                    searchPlaceHolder="Rechercher"
                    dynamicSearchStartsFrom={3}
                />
            </MyNavbar> 
            <GridList
                superheros={this.state.superheros}
                openModal={this.openModal.bind(this)}
                modalHero={this.state.modalHero}
                handleAdd={this.addAvenger.bind(this)}
            >
            </GridList>
            <Modal 
                isOpen={this.state.openModal}
                onRequestClose={this.closeModal.bind(this)}
                style={{
                  content: {
                    backgroundColor: this.state.colors[0],
                    color: this.state.colors[1]
                  }
                }}
            >
                <HeroPage
                    handleAdd={this.addAvenger.bind(this)}
                    isMyAvenger={this.isMyAvenger.bind(this)}
                    modalHero={this.state.modalHero}
                />
            </Modal>
            <BottomScrollListener onBottom={this.more_heroes.bind(this)}/>
            <footer>
                Data provided by Marvel. © 2014 Marvel
            </footer>
            </div>
        )
    }
}

export default App