import React, { Component } from 'react';
import { Row, Col} from 'reactstrap';
import AvengerCard from './AvengerCard.js'


class HeroList extends Component {
    render() {
        return (
            <Row >
                {this.props.heros.map((hero) => {
                    return <Col sm="4" key={hero.name}>
                        <AvengerCard 
                            img_src={hero.thumbnail.path + '/standard_xlarge.' + hero.thumbnail.extension}
                            name={hero.name}
                            id={hero.id}
                            openModal={this.props.openModal}
                        />
                    </Col>
                })}
            </Row>
        )
    }
}

export default HeroList;
