import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import '../../styles/Login.css';
import {authAPI} from "../../http/AuthAPI";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clientEmail: '',
            clientPassword: '',
            employeeEmail: '',
            employeePassword: '',
            error1: '', error2: '',
        }

        this.handleClientPasswordChange.bind(this);
        this.handleEmployeePasswordChange.bind(this);
        this.handleClientEmailChange.bind(this);
        this.handleEmployeeEmailChange.bind(this);
    }

    handleClientLogin = async (event) => {
        event.preventDefault();
        console.log(this.state);
        await authAPI.LoginUser(this.state.clientEmail, this.state.clientPassword, false)
            .then(() => {
                this.props.history.push('/applications');
            })
            .catch(error => {
                this.setState({error1: error["message"].toString()});
            });
    }

    handleEmployeeLogin = async (event) => {
        event.preventDefault();
        await authAPI.LoginUser(this.state.employeeEmail, this.state.employeePassword, true)
            .then(() => {
                this.props.history.push('/applications');
            })
            .catch(error => {
                this.setState({error2: error["message"].toString()});
            });
        }

    handleEmployeePasswordChange = (event) => {
        this.setState({employeePassword: event.target.value});
    }

    handleClientPasswordChange = (event) => {
        this.setState({clientPassword: event.target.value});
    }

    handleEmployeeEmailChange = (event) => {
        this.setState({employeeEmail: event.target.value});
    }

    handleClientEmailChange = (event) => {
        this.setState({clientEmail: event.target.value});
    }

    render() {
        return (
            <Container className="h-100" style={containerStyle}>
                {/* TODO: add style */}
                <Row className="justify-content-center align-items-center p-3" style={formStyle}>
                    <Col className="col-auto text-center p-4 align-self-center">
                        <h5>Я клиент Газпромбанка</h5>
                        <Form id={"application-form"}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control onChange={this.handleClientEmailChange}
                                              type="email" value={this.state.clientEmail} placeholder="E-Mail"/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control onChange={this.handleClientPasswordChange}
                                              type="password" value={this.state.clientPassword} placeholder="Пароль"/>
                            </Form.Group>

                            <Button variant="primary" type="submit" className={"mb-2"}
                                    onClick={(event) => this.handleClientLogin(event)}>
                                Войти
                            </Button>
                            <div>{this.state.error1}</div>
                            <div id={"registration-button"} className={"link-style-2"}>
                                <a href={"/register"}><span>Зарегистрироваться</span></a>
                            </div>
                        </Form>
                    </Col>

                    <Col className="col-auto text-center p-4 align-self-center mb-4">
                        <h5>Я сотрудник Газпромбанка</h5>
                        <Form id={"employee-form"}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control onChange={this.handleEmployeeEmailChange}
                                              type="email" value={this.state.employeeEmail} placeholder="E-Mail"/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control onChange={this.handleEmployeePasswordChange}
                                              type="password" value={this.state.employeePassword} placeholder="Пароль"/>
                            </Form.Group>

                            <div>{this.state.error2}</div>
                            <Button variant="primary" type="submit"
                                    onClick={(event) => this.handleEmployeeLogin(event)}>
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
