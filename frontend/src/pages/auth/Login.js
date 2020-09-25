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

        this.state = {title: "Вход"}
    }

    render () {
        return <div id={"main"}>
                <div className={"wrapper"}>
                    <div className={"content"}>
                        <h5>Я клиент Газпромбанка</h5>
                        <Form id={"client-form"}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="E-Mail" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Пароль" />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Войти
                            </Button>
                            <div id={"registration-button"}>
                                <a href={"idite_nahuy"}>Зарегистрироваться</a>
                            </div>
                        </Form>

                    </div>
                </div>
                <div className={"wrapper"}>
                    <div className={"content"}>
                        <h5>Я сотрудник Газпромбанка</h5>
                        <Form id={"employee-form"}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="E-Mail" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Пароль" />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Войти
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
    }
}

export default Login;
