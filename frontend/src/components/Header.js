import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import '../styles/Header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Row className={"mb-4"}>
                <Col className={"header"}>
                    <span id={"site-name"}><b>ГазПром</b> Документы</span>
                    <a href={"empty"}>
                        <div id={"profile-button"}>
                            Личный кабинет
                        </div>
                    </a>
                </Col>
            </Row>
        )
    }
}

export default Header;
