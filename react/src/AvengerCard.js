import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom'
  
class AvengerCard extends Component {
    render() {
        return (
            <Link to={this.props.url}>
                <Card style={{margin: "5%"}}>
                    <CardImg top 
                    src={this.props.img_src} 
                    alt={this.props.name}/>
                    <CardBody>
                        <CardTitle>
                            {this.props.name}
                        </CardTitle>
                    </CardBody>
                </Card>
            </Link>
        )
    }
}

export default AvengerCard;