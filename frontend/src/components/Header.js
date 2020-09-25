import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import '../styles/Header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return <Container>
            <Row>
                <Col className={"header"}>
                    <span id={"site-name"}><b>Online-Service</b></span>
                    <a href={"empty"}>
                        <div id={"profile-button"}>
                            Кеков Кек Кекович
                        </div>
                    </a>
                </Col>
            </Row>
        </Container>
    }
}

export default Header;
