import React, { Component } from 'react';
import { Row, Col , Container} from 'reactstrap';
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
                    <Row key="image-row">
                        <Col sm="6">
                            <img width="100%" alt="" src={img_path}></img>
                        </Col>
                        <Col sm="6">
                            <h1>
                                {hero.name}
                            </h1>
                            <hr></hr>
                            <div>
                                {hero.description || "Aucune description n'est disponible"}
                                <br/>
                                <b>Nom :</b> {hero.name}
                                <br/>
                                <b>Âge :</b> {Math.floor(Math.random()*20+20)}
                            </div>
                            <div>
                                <div style={{
                                    display: "inline-block",
                                    fontSize: "24px",
                                    position: "absolute",
                                    bottom: "64px",
                                    left: 0,
                                    width: "100%",
                                    textAlign: "center",
                                }}>
                                    <a href={hero.urls[0].url} target="_blank">
                                        <button
                                        style={{
                                            backgroundColor: this.props.colors[1],
                                            color: this.props.colors[0],
                                            border: "none",
                                            cursor: "pointer",
                                        }}
                                        >
                                            Plus d'information sur le site officiel de Marvel
                                        </button>
                                    </a>
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
                                        display: "inline-block",
                                        position: "absolute",
                                        bottom: 0,
                                        right: 0,
                                    }}
                                    onClick={() => this.props.handleAdd(hero.id)} >
                                    {this.props.isMyAvenger(hero.id) ? "Retirer" : <svg height="36px" width="150px">
                                        <image href="/avengers_logo.png" atl="A" height="32px" width="28px" x="0px" y="0px"/>
                                        <text height="50px" x="24px" y="26px" fill="white">jouter</text>
                                    </svg>
                                    }
                                </button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="3" key="comics">
                            <h2>
                                Comics
                            </h2>
                            {hero.comics.items.map(comic => <div key={comic.id}>{comic.name}</div>)}
                        </Col>
                        <Col sm="3" key="events">
                            <h2>
                                Évènements
                            </h2>
                            {hero.events.items.map(comic => <div key={comic.id}>{comic.name}</div>)}
                        </Col>
                        <Col sm="3" key="series">
                            <h2>
                                Séries
                            </h2>
                            {hero.series.items.map(comic => <div key={comic.id}>{comic.name}</div>)}
                        </Col>
                        <Col sm="3" key="stories">
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