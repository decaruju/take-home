import React, { Component } from 'react';
import {get_character} from './api.js'
import Jimp from 'jimp'
import skmeans from 'skmeans'
import rgbHex from 'rgb-hex'

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
            this.get_colors()
        })
    }

    get_colors() {
        let img_path = this.state.hero.thumbnail.path + '.' + this.state.hero.thumbnail.extension
        Jimp.read(img_path).then(image => {
            var pixels = []
            console.log(image)
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
            console.log(colors)
            this.setState({...this.state, colors: colors})
            }
        )
    }

    render() {
        if (this.state.hero && this.state.colors) {
            let img_path = this.state.hero.thumbnail.path + '.' + this.state.hero.thumbnail.extension
            let bgcolor = '#' + rgbHex(this.state.colors[0][0], this.state.colors[0][1], this.state.colors[0][2])
            let textcolor = '#' + rgbHex(this.state.colors[1][0], this.state.colors[1][1], this.state.colors[1][2])
            console.log(bgcolor)
            return (
                <div className="Heropage" style={{backgroundColor: bgcolor, color: textcolor}}>
                    <h1>
                        {this.state.hero.name}
                    </h1>
                <img width="200px" alt="" src={img_path}></img>
                
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