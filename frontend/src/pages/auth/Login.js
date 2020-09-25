import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import '../../styles/Login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container className="h-100" style={containerStyle}>
                {/* TODO: add style */}
                <Row className="justify-content-center align-items-center p-3" style={formStyle}>
                    <Col className="col-auto text-center p-4 align-self-center">
                        <h5>Я клиент Газпромбанка</h5>
                        <Form id={"client-form"}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="E-Mail"/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Пароль"/>
                            </Form.Group>

                            <Button variant="primary" type="submit" className={"mb-2"}>
                                Войти
                            </Button>
                            <div id={"registration-button"} className={"link-style-2"}>
                                <span>Зарегистрироваться</span>
                            </div>
                        </Form>
                    </Col>

                    <Col className="col-auto text-center p-4 align-self-center mb-4">
                        <h5>Я сотрудник Газпромбанка</h5>
                        <Form id={"employee-form"}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="E-Mail"/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Пароль"/>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Войти
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Login;

let formStyle = {
    height: "100vh !important"
}

let containerStyle = {
    margin: "8% auto"
}
