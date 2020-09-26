import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Header from "../../components/Header";

import '../../styles/View_Application.css';

class View_Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {title: "Просмотр заявления"}
    }

    render () {
        return (
            <Container>
                <Header />
                <Row className={"row-auto"} id={"client-info"}>
                    <Col className={"col-auto"}>
                        <h3>Заявление №</h3>
                        <span>Описание заявлеения</span>
                    </Col>
                    <div id={"changelog"}>
                        <Dropdown>
                            <Dropdown.Toggle variant="default" id="dropdown-basic">
                                Changelog
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item><date>01-01-1971</date> Action</Dropdown.Item>
                                <Dropdown.Item><date>01-01-1971</date> Another action</Dropdown.Item>
                                <Dropdown.Item><date>01-01-1971</date> Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Row>
                <Form>
                    <h3>Требуемые документы</h3>
                    <Row className={"doc"}>
                        <Col>
                            <span className={"doc_name"}>НДФЛ</span>
                        </Col>
                        <Col>
                            <span className={"doc_status"}>Прикреплено</span>
                        </Col>
                        <Col>
                            <Button>Посмотреть</Button>
                        </Col>
                    </Row>
                    <Row className={"doc"}>
                        <Col>
                            <span className={"doc_name"}>Трудовая книга</span>
                        </Col>
                        <Col>
                            <span className={"doc_status"}>Прикреплено</span>
                        </Col>
                        <Col>
                            <Button>Посмотреть</Button>
                        </Col>
                    </Row>
                    <Row className={"doc"}>
                        <Col>
                            <span className={"doc_name"}>Выписка из морга</span>
                        </Col>
                        <Col>
                            <span className={"doc_status"}>Отсутствует</span>
                        </Col>
                        <Col>
                            <Button>Прикрепить</Button>
                        </Col>
                    </Row>
                </Form>
                <Container>
                </Container>
            </Container>
        )
    }
}

export default View_Application;
