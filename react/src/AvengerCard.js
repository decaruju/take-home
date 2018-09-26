import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import './App.css'
  
class AvengerCard extends Component {
    constructor() {
        super()
        this.state = {
            hover: false
        }
    }
    hoverOn() {
        this.setState({hover: true})
    }
    hoverOff() {
        this.setState({hover: false})
    }
    render() {
        return (
                <Card 
                    onMouseEnter={this.hoverOn.bind(this)} 
                    onMouseLeave={this.hoverOff.bind(this)}
                    style={{
                        margin: "5%", 
                        backgroundColor: this.state.hover ? "#FF0000" : "#222222", 
                        borderColor: this.state.hover ? "#FF0000" : "#222222", 
                        borderWidth: this.state.hover ? "10px" : "0px",
                        color: "#FFFFFF", 
                        borderRadius: "0px",
                        cursor: "pointer",
                        transition: "all 0.2s ease-in",
                    }} 
                    onClick={() => this.props.openModal(this.props.id)}>
                    <CardImg top 
                    src={this.props.img_src} 
                    alt={this.props.name}/>
                    <CardBody>
                        <CardTitle
                            style={{
                                fontSize: "32px",
                            }}
                        >
                            {this.props.name}
                        </CardTitle>
                    </CardBody>
                </Card>
        )
    }
}

export default AvengerCard;