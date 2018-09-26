import React, {Component} from 'react';
import './App.css';
import {get_characters, get_character} from './api.js'
import BottomScrollListener from 'react-bottom-scroll-listener'
import MyNavbar from './Navbar.js'
import HeroList from './HeroList.js'
import Sidebar from 'react-sidebar'
import Avengers from './Avengers.js'
import SearchBar from '@opuscapita/react-searchbar'
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
        this.getLocalStorageAvengers()
        document.title = "Mes Avengers"
    }

    closeModal() {
        this.setState({...this.state, openModal: false, modalHero: false, moreInfo: {}})
    }

    openModal(id) {
        this.onSetSidebarOpen(false)
        get_character(id).then(hero => {
            this.setState({...this.state, openModal: id, modalHero: hero})
            get_colors(
                hero.thumbnail.path + "/standard_small." + hero.thumbnail.extension
            ).then(colors => {
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
        if (this.state.superheros.length % 20 !== 0) {
            return
        } 
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
            this.setState({...this.state, myAvengers: currentAvengers}, () =>
                localStorage.setItem('myAvengers', JSON.stringify({'myAvengers': this.state.myAvengers}))
            )
        } else {
            get_character(id).then((hero) => {
                currentAvengers.push({...hero, colors: this.state.colors})
                this.setState({...this.state, myAvengers: currentAvengers}, () =>
                    localStorage.setItem('myAvengers', JSON.stringify({'myAvengers': this.state.myAvengers}))
                )
            })
        }
    }

    getLocalStorageAvengers() {
        var avengers = JSON.parse(localStorage.getItem('myAvengers'))
        if (avengers) {
            this.setState({...this.state, myAvengers: avengers.myAvengers})
        }
    }

    render() {
        return (
            <div className="App" id="Main">
            <Sidebar
                open={this.state.sidebarOpen}
                onSetOpen={this.onSetSidebarOpen.bind(this)}
                styles={{ sidebar: { background: "#222222", color: "white", padding: "20px", width: "800px"} }}
                sidebar={<Avengers superheros={this.state.myAvengers} 
                showModal={this.openModal.bind(this)}
                handleRemove={this.addAvenger.bind(this)}/>}
                pullRight={true}
            >
            Sidebar 
            </Sidebar>
            <MyNavbar openSidebar={this.openSidebar.bind(this)} >
                <SearchBar 
                    value={this.state.searchValue}
                    onSearch={this.handleSearch.bind(this)}
                    searchPlaceHolder="Rechercher"
                    dynamicSearchStartsFrom={3}
                />
            </MyNavbar> 
            <HeroList
                heros={this.state.superheros}
                openModal={this.openModal.bind(this)}
                isOpen={Boolean(this.state.openModal)}
                closeModal={this.closeModal.bind(this)}
                modalHero={this.state.modalHero}
                addAvenger={this.addAvenger.bind(this)}
                isMyAvenger={this.isMyAvenger.bind(this)}
                colors={this.state.colors}
            >
            </HeroList>
            <BottomScrollListener onBottom={this.more_heroes.bind(this)}/>
            </div>
        )
    }
}

export default App