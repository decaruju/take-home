import React, { Component } from 'react';
import {get_character} from './api.js'
import { Row, Col , Container, Button} from 'reactstrap';
import { get_colors } from './ImageProcessing.js'

class Heropage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.heroId,
        }
    }

    componentDidMount() {
        get_character(this.state.id).then(character => {
            this.setState({...this.state, hero: character})
            get_colors(
                this.state.hero.thumbnail.path + '.' + this.state.hero.thumbnail.extension
            ).then(colors => this.setState({...this.state, colors: colors}))
        })    }

    isMyAvenger() {
        try {
            return JSON.parse(localStorage.getItem('avengers')).mesAvengers.includes(this.state.hero.id)
        } catch (error) {
            return false
        }
    }

    handleClick() {
        var currentAvengers = JSON.parse(localStorage.getItem('avengers'))
        if (currentAvengers === null) {
            currentAvengers = {mesAvengers: []}
        }
        if (this.isMyAvenger()) {
            currentAvengers.mesAvengers.splice(currentAvengers.mesAvengers.indexOf(this.state.hero.id), 1)
        } else {
            currentAvengers.mesAvengers.push(this.state.hero.id)
        }
        localStorage.setItem('avengers', JSON.stringify(currentAvengers))
    }

    render() {
        if (this.state.hero && this.state.colors) {
            let img_path = this.state.hero.thumbnail.path + '.' + this.state.hero.thumbnail.extension
            let bgcolor = '#' + this.state.colors[0]
            let textcolor = '#' + this.state.colors[1]
            return (
                <div className="Heropage" style={{backgroundColor: bgcolor, color: textcolor}}>
                    <Container>
                        <Row>
                            <Col sm="6">
                                <img width="100%" alt="" src={img_path}></img>
                            </Col>
                            <Col sm="6">
                                <h1>
                                    {this.state.hero.name}
                                </h1>
                                <div>
                                    {this.state.hero.description}
                                </div>
                                <Button 
                                    className="align-self-baseline" 
                                    onClick={this.handleClick.bind(this)} >
                                    {this.isMyAvenger() ? "Retirer" : "Ajouter"}
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="3">
                                <h2>
                                    Comics
                                </h2>
                                {this.state.hero.comics.items.map(comic => <div key={comic.id}>{comic.name}</div>)}
                            </Col>
                            <Col sm="3">
                                <h2>
                                    Évènements
                                </h2>
                                {this.state.hero.events.items.map(comic => <div key={comic.id}>{comic.name}</div>)}
                            </Col>
                            <Col sm="3">
                                <h2>
                                    Séries
                                </h2>
                                {this.state.hero.series.items.map(comic => <div key={comic.id}>{comic.name}</div>)}
                            </Col>
                            <Col sm="3">
                                <h2>
                                    Histoires
                                </h2>
                                {this.state.hero.stories.items.map(comic => <div key={comic.id}>{comic.name}</div>)}
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        }
        return <div className="Heropage"></div>
    }
}

export default Heropage;