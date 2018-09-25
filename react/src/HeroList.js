import React, { Component } from 'react';
import { Row, Col} from 'reactstrap';
import AvengerCard from './AvengerCard.js'
import Modal from 'react-modal'
import HeroPage from './Heropage.js'


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
                        <Modal 
                            isOpen={this.props.isModalOpen(hero.id)}
                            onRequestClose={this.props.onRequestClose}
                        >
                            <HeroPage
                                heroId={hero.id}
                                handleAdd={this.props.handleAdd}
                                isMyAvenger={this.props.isMyAvenger}
                                modalHero={this.props.modalHero}
                            >
                            </HeroPage>
                        </Modal>
                    </Col>
                })}
            </Row>
        )
    }
}

export default HeroList;
