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
        return <Row>
                <Col className={"header"}>
                    <span id={"site-name"}><b>ГазПром</b> Документы</span>
                    <a href={"empty"}>
                        <div id={"profile-button"}>
                            Кеков Кек Кекович
                        </div>
                    </a>
                </Col>
            </Row>
    }
}

export default Header;
