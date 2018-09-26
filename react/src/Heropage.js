import React, { Component } from 'react';
import { Row, Col , Container, Button} from 'reactstrap';
import './App.css'

class Heropage extends Component {
    render() {
        let hero = this.props.modalHero
        if (!hero) {
            return <div className="Heropage"></div>
        }
        let img_path = hero.thumbnail.path + '.' + hero.thumbnail.extension
        return (
            <div className="Heropage" >
                <Container >
                    <Row>
                        <Col sm="6">
                            <img width="100%" alt="" src={img_path}></img>
                        </Col>
                        <Col sm="6">
                            <h1>
                                {hero.name}
                            </h1>
                            <hr></hr>
                            <div>
                                {hero.description}
                            </div>
                            <button 
                                style={{
                                    backgroundColor: "#FF0000",
                                    fontWeight: "bold",
                                    color: "white",
                                    padding: "0px 0px 0px 0px",
                                    fontSize: "32px",
                                    textTransform: "uppercase",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                                onClick={() => this.props.handleAdd(hero.id)} >
                                {this.props.isMyAvenger(hero.id) ? "Retirer" : <svg height="36px" width="150px">
                                    <image href="/avengers_logo.png" atl="A" height="32px" width="28px" x="0px" y="0px"/>
                                    <text height="50px" x="24px" y="26px" fill="white">jouter</text>
                                </svg>
                                }
                            </button>
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