import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Header from "../../components/Header";
import Application from "../../components/Application";

import '../../styles/Applications.css';

class Applications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {title: "Мои заявки"}
    }

    render () {
        return (
            <Container>
                <Header />
                <Row className={"row-auto"} id={"client-info"}>
                    <Col className={"col-auto"}>
                        <h3>Кеков Кек Кекович</h3>
                        <h4>Мои заявки</h4>
                    </Col>
                    <div className={"app-add-button"}>
                        <Button>Написать заявление</Button>
                    </div>
                </Row>
                <Col>
                    <Application />
                    <Application />
                    <Application />
                    <Application />
                    <Application />
                    <Application />

                </Col>
            </Container>
        )
    }
}

export default Applications;
