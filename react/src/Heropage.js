import React, { Component } from 'react';
import {get_character} from './api.js'
import { Row, Col , Container, Button} from 'reactstrap';
import { get_colors } from './ImageProcessing.js'

class Heropage extends Component {
    render() {
        let hero = this.props.modalHero
        if (!hero) {
            return <div className="Heropage"></div>
        }
        let img_path = hero.thumbnail.path + '.' + hero.thumbnail.extension
        let colors = get_colors(img_path)
        let bgcolor = '#' + colors[0]
        let textcolor = '#' + colors[1]
        return (
            <div 
                className="Heropage" 
                style={{backgroundColor: bgcolor, color: textcolor}}>
                <Container>
                    <Row>
                        <Col sm="6">
                            <img width="100%" alt="" src={img_path}></img>
                        </Col>
                        <Col sm="6">
                            <h1>
                                {hero.name}
                            </h1>
                            <div>
                                {hero.description}
                            </div>
                            <Button 
                                onClick={() => this.props.handleAdd(hero.id)} >
                                {this.props.isMyAvenger(hero.id) ? "Retirer" : "Ajouter"}
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="3">
                            <h2>
                                Comics
                            </h2>
                            {hero.comics.items.map(comic => <div key={comic.id}>{comic.name}</div>)}
                        </Col>
                        <Col sm="3">
                            <h2>
                                Évènements
                            </h2>
                            {hero.events.items.map(comic => <div key={comic.id}>{comic.name}</div>)}
                        </Col>
                        <Col sm="3">
                            <h2>
                                Séries
                            </h2>
                            {hero.series.items.map(comic => <div key={comic.id}>{comic.name}</div>)}
                        </Col>
                        <Col sm="3">
                            <h2>
                                Histoires
                            </h2>
                            {hero.stories.items.map(comic => <div key={comic.id}>{comic.name}</div>)}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Heropage;