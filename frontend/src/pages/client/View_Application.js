import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
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
                <Row id={"comments"}>
                    <Col className={"col-12"}>
                        <Form>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Комментарий</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="textarea" aria-label="With textarea" />
                            </InputGroup>
                            <Button>Отправить</Button>
                        </Form>
                    </Col>
                    <Col id={"comments col-12"}>
                        <Row className={"comment"}>
                            <Col className={"col-3"}>
                                <div className={"author"}>
                                    <span>Вы</span>
                                    <span>ФИО сотрудника</span>
                                </div>
                            </Col>
                            <Col className={"col-9"}>
                                <div className={"text"}>
                                    Текст комментария
                                    <time>01-01-1971</time>
                                </div>
                            </Col>
                        </Row>
                        <Row className={"comment"}>
                            <Col className={"col-3"}>
                                <div className={"author"}>
                                    <span>Вы</span>
                                    <span>ФИО сотрудника</span>
                                </div>
                            </Col>
                            <Col className={"col-9"}>
                                <div className={"text"}>
                                    Текст комментария
                                    <time>01-01-1971</time>
                                </div>
                            </Col>
                        </Row>
                        <Row className={"comment"}>
                            <Col className={"col-3"}>
                                <div className={"author"}>
                                    <span>Вы</span>
                                    <span>ФИО сотрудника</span>
                                </div>
                            </Col>
                            <Col className={"col-9"}>
                                <div className={"text"}>
                                    Текст комментария
                                    <time>01-01-1971</time>
                                </div>
                            </Col>
                        </Row>
                        <Row className={"comment"}>
                            <Col className={"col-3"}>
                                <div className={"author"}>
                                    <span>Вы</span>
                                    <span>ФИО сотрудника</span>
                                </div>
                            </Col>
                            <Col className={"col-9"}>
                                <div className={"text"}>
                                    Текст комментарияТекст комментарияТекст комментарияТекст комментарияТекст комментарияТекст комментарияТекст комментарияТекст комментарияТекст комментарияТекст комментарияТекст комментарияТекст комментарияТекст комментарияТекст комментарияТекст комментария
                                    <time>01-01-1971</time>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default View_Application;
