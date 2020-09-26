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

import '../../styles/ViewApplication.css';
import {clientAPI} from "../../http/ClientAPI";

class ViewApplication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Просмотр заявления",
            selectedService: "Выберите тип",
            documents: []
        }
    }

    componentDidMount = async () => {
        await clientAPI.GetApplicationByID(1)
            .then((res) => this.setState({application:res, documents: res.ServiceType.DocumentTypes}))
        for (let s of this.state.application.ServiceType.DocumentTypes)
            console.log(s)
    }

    render () {
        return (
            <Container>
                <Header />
                <Row className={"row-auto"} id={"client-info"}>
                    <Col className={"col-auto"}>
                        <h3>Заявление №</h3>
                        <span id={"app_description"}>Описание заявлеения</span>
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
                    <h3>Требуемые документы:</h3>
                    {this.state.documents.map((d) => {
                        return <Row className={"doc"}>
                            <Col>
                                <span className={"doc_name"}>{d.Name}</span>
                            </Col>
                            <Col>
                                <Button>Прикрепить</Button>
                            </Col>
                        </Row>
                    })}
                </Form>

                <Row id={"comments"}>
                    <Col className={"col-12"}>
                        <Form id={"comment-form"}>
                            <InputGroup>
                                <FormControl as="textarea" aria-label="With textarea" />
                            </InputGroup>
                            <Button>Отправить комментарий</Button>
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

export default ViewApplication;
