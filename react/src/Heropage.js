import React, { Component } from 'react';
import api_get from './api.js'

class Heropage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.heroId,
        }
        api_get(`https://gateway.marvel.com/v1/public/characters/${this.state.id}`).then(data => {
            var superhero = data.data.results[0]
            console.log(superhero)
            this.setState({id: superhero.id, hero:superhero})
        })
    }

    render() {
        if (this.state.hero) {
            console.log(this.state.hero.thumbnail)
            return (
                <div className="Heropage">
                    <h1>
                        {this.state.hero.name}
                    </h1>
                <img width="200px" alt="" src={this.state.hero.thumbnail.path + '.' + this.state.hero.thumbnail.extension}></img>
                
                <div>
                    {this.state.hero.description}
                </div>
                <h2>
                    Comics
                </h2>
                {this.state.hero.comics.items.map(comic => {
                    return <div>{comic.name}</div>
                })}
                </div>
            );
        }
        return <div className="Heropage"></div>
    }
}

export default Heropage;