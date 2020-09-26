import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Header from "../../components/Header";

import '../../styles/NewApplication.css';

class NewApplication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {title: "Новое заявление"}
    }

    render () {
        return (
            <Container>
                <Header />
                <Row className={"row-auto"} id={"client-info"}>
                    <Col className={"col-auto"}>
                        <h3>Новое заяление</h3>
                    </Col>
                </Row>
                <Form>
                    <Row>
                        <Col>
                            <span>Выберите нужное заявление</span>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Заявление
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item>Кредит</Dropdown.Item>
                                    <Dropdown.Item>Ссуда</Dropdown.Item>
                                    <Dropdown.Item>Посуда</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Прикрепите нужные документы
                            <div>
                                <span className={"doc_name"}>НДФЛ</span>
                                <Button>Прикрепить</Button>
                            </div>
                            <div>
                                <span className={"doc_name"}>Трудовая книга</span>
                                <Button>Прикрепить</Button>
                            </div>
                            <div>
                                <span className={"doc_name"}>Выписка из морга</span>
                                <Button>Прикрепить</Button>
                            </div>
                        </Col>
                    </Row>
                    <Button>Отправить заявление</Button>
                </Form>
            </Container>
        )
    }
}

export default NewApplication;
