import React, { Component } from 'react'

class AvengerListItem extends Component {
    constructor() {
        super()
        this.state = {
            hover: false,
            hoverButton: false,
        }
    }

    hoverOnButton() {
        this.setState({...this.state, hoverButton: true})
    }

    hoverOffButton() {
        this.setState({...this.state, hoverButton: false})
    }

    hoverOn() {
        this.setState({...this.state, hover: true})
    }

    hoverOff() {
        this.setState({...this.state, hover: false})
    }


    render() {
        return (
            <div 
                style={{
                    width: "auto",
                    margin:"10px",
                }}
            >
                <div
                    onMouseEnter={this.hoverOn.bind(this)} 
                    onMouseLeave={this.hoverOff.bind(this)}
                    onClick={() => this.props.showModal(this.props.hero.id)}
                    style={{
                        backgroundColor: this.props.hero.colors[1],
                        color: this.props.hero.colors[0],
                        cursor: "pointer",
                        display: "inline-block",
                        width: "80%",
                        filter: this.state.hover ? "brightness(150%)" : "brightness(100%)",
                        transition: "all 0.2s ease-in",
                    }}
                >
                    <img src={this.props.hero.thumbnail.path + "/standard_medium." + this.props.hero.thumbnail.extension} alt={this.props.hero.name}/>
                    <p 
                        style={{
                            marginLeft: "10px",
                            marginRight: "10px",
                            fontSize: "24px",
                            display: "inline-block",
                            width: "auto"
                        }}
                    >
                        {this.props.hero.name}
                    </p>
                </div>
                <button
                    onClick={() => this.props.handleRemove(this.props.hero.id)}
                    onMouseEnter={this.hoverOnButton.bind(this)} 
                    onMouseLeave={this.hoverOffButton.bind(this)}
                    style={{
                        backgroundColor: this.props.hero.colors[0],
                        color: this.props.hero.colors[1],
                        display: "inline-block",
                        border: "none",
                        width: "15%",
                        height: "100px",
                        position: "absolute",
                        cursor: "pointer",
                        fontSize: "32px",
                        filter: this.state.hoverButton ? "brightness(150%)" : "brightness(100%)"
                    }}
                > 
                    Retirer
                </button>
            </div>
        )
    }
    

}

export default AvengerListItem