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
                    <span onClick={() => window.location.href = '/'}
                          id={"site-name"} className={"link-style"}>
                        <b>Газпром</b> Документы
                    </span>
                    <div id={"out-button"} onClick={() => window.location.href = '/logout'}>
                        <b className={"link-style"}>Выход</b>
                    </div>
                    <a href={"/applications"}>
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
