import React, { Component } from 'react';
import { Row, Col, Container} from 'reactstrap';
import AvengerCard from './AvengerCard.js'
import HeroPage from './Heropage.js'
import Modal from 'react-modal'


Modal.setAppElement('#root');

class HeroList extends Component {
    render() {
        return (
            <div>
                <Container className="GridList" style={{margin: "auto"}}>
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
                </Container>
                <Modal 
                    isOpen={this.props.isOpen}
                    onRequestClose={this.props.closeModal}
                    style={{
                    content: {
                        backgroundColor: this.props.colors[0],
                        color: this.props.colors[1]
                    }
                    }}
                >
                    <HeroPage
                        handleAdd={this.props.addAvenger}
                        isMyAvenger={this.props.isMyAvenger}
                        modalHero={this.props.modalHero}
                        colors={this.props.colors}
                    />
                </Modal>
            </div>
        )
    }
}

export default HeroList;
