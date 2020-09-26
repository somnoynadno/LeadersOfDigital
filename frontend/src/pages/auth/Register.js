import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import '../../styles/Register.css';

class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Container>
                <Row className={"justify-content-center align-items-center p-4"}>
                    <Col className={"col-auto"}>
                        <Form>
                            <Form.Text className={"registration-title mb-4"}>
                                Регистрация
                            </Form.Text>
                            <Form.Group>
                                <Form.Control type="text" placeholder="Фамилия" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="text" placeholder="Имя" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="text" placeholder="Отчество" />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="E-Mail" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Пароль" />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Зарегистрироваться
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            )
    }
}

export default Register;
