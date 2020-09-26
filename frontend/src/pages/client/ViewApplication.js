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
            application: null,
            documents: []
        };

        this.handleFileChange.bind(this);
        this.handleFileUpload.bind(this);
    }

    preprocessDocuments = () => {
        let documents = [];
        for (let dt of this.state.application.ServiceType.DocumentTypes) {
            let found = false;
            for (let d of this.state.application.Documents) {
                if (d.DocumentTypeID == dt.ID) {
                    documents.push({"DT": dt, "D": d});
                    found = true;
                    break
                }
            } if (!found) {
                documents.push({"DT": dt, "D": null})
            }
        }

        this.setState({documents: documents});
    }

    componentDidMount = async () => {
        let applicationID = window.location.pathname.split('/')[2];
        await clientAPI.GetApplicationByID(applicationID)
            .then((res) => this.setState({application: res}));
        console.log(this.state.application);
        this.preprocessDocuments();
    }

    handleFileChange = event => {
        // Update the state
        this.setState({selectedFile: event.target.files[0]});
    };

    handleFileUpload = async (dt) => {
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "File",
            this.state.selectedFile,
        );

        // Request made to the backend api
        // Send formData object
        await clientAPI.UploadDocument(this.state.application.ID, formData, dt.ID)
            .then((r) => window.location.reload());
    };

    render () {
        if (!this.state.application) return '';
        else return (
            <Container>
                <Header />
                <Row className={"row-auto"} id={"client-info"}>
                    <Col className={"col-auto"}>
                        <h3>Заявление №{this.state.application.ID}</h3>
                        <span id={"app_description"}>{this.state.application.ServiceType.Description}</span>
                    </Col>
                    <div id={"changelog"}>
                        <Dropdown>
                            <Dropdown.Toggle variant="default" id="dropdown-basic">
                                Changelog
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {this.state.application.ChangeLogs.map((cl) => {
                                    return <Dropdown.Item>{(new Date(cl.CreatedAt)).toLocaleString('ru', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',})}}: {cl.Message}</Dropdown.Item>
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Row>
                <Form>
                    <h3 className={"mb-2"}>Требуемые документы</h3>
                    {this.state.documents.map((d) => {
                            if (d["D"] === null) {
                                return <div><Row className={"doc"}>
                                    <Col>
                                        <span className={"doc_name"}>{d["DT"].Name}</span>
                                    </Col>
                                    <Col>
                                        <span className={"doc_status"}>Отсутствует</span>
                                    </Col>
                                    <Col>
                                        <input type="file" name="File" onChange={this.handleFileChange} />
                                        <Button onClick={() => this.handleFileUpload(d["DT"])}>
                                            Загрузить
                                        </Button>
                                    </Col>
                                </Row><hr /></div>
                            } else {
                                return <div><Row className={"doc"}>
                                    <Col>
                                        <span className={"doc_name"}>{d["DT"].Name}</span>
                                    </Col>
                                    <Col>
                                        <span className={"doc_status"}>Прикреплено</span>
                                    </Col>
                                    <Col>
                                        <Button>Посмотреть</Button>
                                    </Col>
                                </Row><hr /></div>
                            }
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
                        {this.state.application.Comments.map((c) => {
                            return <Row className={"comment"}>
                                <Col className={"col-3"}>
                                    <div className={"author"}>
                                        {c.EmployeeID === null ?
                                            <span>Вы:</span>
                                            :
                                            <span>Сотрудник банка:</span>
                                        }
                                    </div>
                                </Col>
                                <Col className={"col-9"}>
                                    <div className={"text"}>
                                        {c.Text} ({c.CreatedAt})
                                    </div>
                                </Col>
                            </Row>
                        })}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ViewApplication;
