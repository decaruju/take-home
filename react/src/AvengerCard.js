import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';
  
class AvengerCard extends Component {
    render() {
        return (
                <Card style={{margin: "5%"}} onClick={() => this.props.openModal(this.props.id)}>
                    <CardImg top 
                    src={this.props.img_src} 
                    alt={this.props.name}/>
                    <CardBody>
                        <CardTitle>
                            {this.props.name}
                        </CardTitle>
                    </CardBody>
                </Card>
        )
    }
}

export default AvengerCard;