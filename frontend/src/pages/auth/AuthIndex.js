import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import '../../styles/Autorization.css';

class AuthIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {title: "Index page"}
    }

    render () {
        return <Container>
            <Row>
                <Col className={"title"}>{this.state.title}</Col>
            </Row>
        </Container>
    }
}

export default AuthIndex;
