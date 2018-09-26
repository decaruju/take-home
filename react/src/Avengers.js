import React, { Component } from 'react';
import { Container} from 'reactstrap';
import './App.css'

class GridList extends Component {
    render() {
        return (
            <div className="Avengers">
                <div >
                <h1>
                    <img src="/avengers_logo.png" height="64px" alt="Avengers logo"/>
                    Mes&nbsp;Avengers
                </h1>
                </div>
                <Container>
                    {this.props.superheros.map((hero) => 
                        <div key={hero.id} 
                        style={{
                            backgroundColor:hero.colors[1],
                            color: hero.colors[0],
                            margin:"10px",
                            cursor: "pointer",
                        }}
                        >
                        <div
                        onClick={() => this.props.showModal(hero.id)}
                        >

                            <img src={hero.thumbnail.path + "/standard_small." + hero.thumbnail.extension} alt={hero.name}></img>
                            <div style={{
                            display:"inline-block",
                            marginLeft: "10px",
                            marginRight: "10px",
                            fontSize: "24px"
                            }}>
                                {hero.name}
                            </div>
                        </div>
                            <button
                                onClick={() => this.props.handleRemove(hero.id)}
                                height="32px"
                                style={{
                                float: "right",
                            }}
                            > Retirer</button>
                        </div>)}
                </Container>
            </div>
        );
    }
}

export default GridList;