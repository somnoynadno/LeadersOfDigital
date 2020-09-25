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

        this.state = {title: "Регистрация"}
    }

    render () {
        return <Form>
            <Form.Text className={"registration-title"}>
                Регистрация
            </Form.Text>
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
    }
}

export default Register;
