import React, { Component } from 'react';
import {get_character} from './api.js'
import Jimp from 'jimp'
import skmeans from 'skmeans'
import rgbHex from 'rgb-hex'
import { Card, CardImg, CardBody, CardTitle, Row, Col , Container, Button} from 'reactstrap';

class Heropage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.heroId,
            monAvenger: false,
        }
    }

    componentDidMount() {
        get_character(this.state.id).then(character => {
            this.setState({...this.state, hero: character})
            this.get_colors()
        }).then(() => {
            this.setState({...this.state, monAvenger: this.isMyAvenger()})
        })
    }

    isMyAvenger() {
        try {
            return JSON.parse(localStorage.getItem('avengers')).mesAvengers.includes(this.state.hero.id)
        } catch (error) {
            return false
        }
    }

    get_colors() {
        let img_path = this.state.hero.thumbnail.path + '.' + this.state.hero.thumbnail.extension
        Jimp.read(img_path).then(image => {
            var pixels = []
            image.resize(100, 100)
            image.scan(0, 0, 100, 100, function(x, y, idx) {
                    pixels.push(
                        [
                            this.bitmap.data[idx + 0],
                            this.bitmap.data[idx + 1],
                            this.bitmap.data[idx + 2],
                        ]
                    )
                })
            var result = skmeans(pixels, 5)
            var colors = result.centroids
            this.setState({...this.state, colors: colors})
            }
        )
    }

    handleClick() {
        var currentAvengers = JSON.parse(localStorage.getItem('avengers'))
        if (currentAvengers === null) {
            currentAvengers = {mesAvengers: []}
        }
        if (this.isMyAvenger()) {
            currentAvengers.mesAvengers.splice(currentAvengers.mesAvengers.indexOf(this.state.hero.id), 1)
            this.setState({...this.state, monAvenger: false})
        } else {
            currentAvengers.mesAvengers.push(this.state.hero.id)
            this.setState({...this.state, monAvenger: true})
        }
        localStorage.setItem('avengers', JSON.stringify(currentAvengers))
    }

    render() {
        if (this.state.hero && this.state.colors) {
            let img_path = this.state.hero.thumbnail.path + '.' + this.state.hero.thumbnail.extension
            let bgcolor = '#' + rgbHex(this.state.colors[0][0], this.state.colors[0][1], this.state.colors[0][2])
            let textcolor = '#' + rgbHex(this.state.colors[1][0], this.state.colors[1][1], this.state.colors[1][2])
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
                                <Button onClick={this.handleClick.bind(this)}>{this.state.monAvenger ? "Retirer" : "Ajouter"}</Button>
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